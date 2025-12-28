import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const lessonsDir = path.join(rootDir, 'src', 'data', 'lessons');

interface OldDialogueLesson {
  id: number;
  title: string;
  subtitle?: string;
  type: 'dialogue';
  dialogue: {
    lines: Array<{
      text: string;
      speaker?: string;
      translation?: string;
    }>;
    headerImage?: {
      src: string;
      alt: string;
    };
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
}

interface OldVocabularyLesson {
  id: number;
  title: string;
  subtitle?: string;
  type: 'vocabulary';
  items: Array<{
    number: number;
    dutch: string;
    english?: string;
    spanish?: string;
    description?: string;
    illustration: string;
  }>;
  exercise?: {
    instruction: string;
    example?: Array<{
      incomplete?: string;
      complete?: string;
      dutch?: string;
      spanish?: string;
    }>;
    instruction2?: string;
    exercises?: Array<{
      text: string;
      answer: string;
      spanish?: string;
    }>;
    sentences?: Array<{
      dutch: string;
      spanish?: string;
    }>;
  };
}

interface OldPracticeLesson {
  id: number;
  title: string;
  subtitle?: string;
  type: 'practice';
  items?: Array<{
    number: number;
    question: string;
    translation: string;
    illustration: string;
  }>;
  exercise?: {
    instruction: string;
    example?: Array<{
      incomplete?: string;
      complete?: string;
      dutch?: string;
      spanish?: string;
    }>;
  };
}

interface OldGrammarLesson {
  id: number;
  title: string;
  subtitle?: string;
  type: 'grammar';
  grammar: {
    explanation: string;
    examples: string[];
  };
  exercise?: {
    instruction: string;
    example?: Array<{
      incomplete?: string;
      complete?: string;
      dutch?: string;
      spanish?: string;
    }>;
  };
}

type OldLesson = OldDialogueLesson | OldVocabularyLesson | OldPracticeLesson | OldGrammarLesson;

interface NewSection {
  type: string;
  [key: string]: unknown;
}

interface NewLesson {
  id: number;
  title: string;
  subtitle?: string;
  sections: NewSection[];
}

function convertDialogueLesson(lesson: OldDialogueLesson): NewLesson {
  const sections: NewSection[] = [];

  // Check if it's a reading (no speakers) or dialogue (has speakers)
  const hasAnySpeaker = lesson.dialogue.lines.some(line => line.speaker);

  if (hasAnySpeaker) {
    // It's a dialogue
    sections.push({
      type: 'dialogue',
      lines: lesson.dialogue.lines,
      images: lesson.dialogue.images,
    });
  } else {
    // It's a reading (narrative text without speakers)
    sections.push({
      type: 'reading',
      headerImage: lesson.dialogue.headerImage,
      paragraphs: lesson.dialogue.lines.map(line => ({
        text: line.text,
        translation: line.translation,
      })),
    });
  }

  return {
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    sections,
  };
}

function convertVocabularyLesson(lesson: OldVocabularyLesson): NewLesson {
  const sections: NewSection[] = [];

  // Add vocabulary section
  sections.push({
    type: 'vocabulary',
    prompt: lesson.subtitle,
    items: lesson.items.map(item => ({
      number: item.number,
      dutch: item.dutch,
      english: item.english,
      spanish: item.spanish,
      description: item.description,
      illustration: item.illustration,
    })),
  });

  // Add exercise section if present
  if (lesson.exercise) {
    const exerciseSection: NewSection = {
      type: 'exercise',
      exerciseType: 'copy',
      instruction: lesson.exercise.instruction,
      instruction2: lesson.exercise.instruction2,
    };

    if (lesson.exercise.example) {
      exerciseSection.example = lesson.exercise.example.map(ex => ({
        input: ex.incomplete,
        output: ex.complete,
        dutch: ex.dutch,
        spanish: ex.spanish,
      }));
    }

    if (lesson.exercise.exercises) {
      exerciseSection.items = lesson.exercise.exercises.map(ex => ({
        text: ex.text,
        answer: ex.answer,
        spanish: ex.spanish,
      }));
    }

    if (lesson.exercise.sentences) {
      exerciseSection.items = lesson.exercise.sentences.map(s => ({
        text: s.dutch,
        spanish: s.spanish,
      }));
    }

    sections.push(exerciseSection);
  }

  return {
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    sections,
  };
}

function convertPracticeLesson(lesson: OldPracticeLesson): NewLesson {
  const sections: NewSection[] = [];

  // Add practice section if items exist
  if (lesson.items && lesson.items.length > 0) {
    sections.push({
      type: 'practice',
      prompt: lesson.subtitle,
      items: lesson.items.map(item => ({
        number: item.number,
        question: item.question,
        spanish: item.translation,
        illustration: item.illustration,
      })),
    });
  }

  // Add exercise section if present
  if (lesson.exercise) {
    const exerciseSection: NewSection = {
      type: 'exercise',
      exerciseType: 'copy',
      instruction: lesson.exercise.instruction,
    };

    if (lesson.exercise.example) {
      exerciseSection.example = lesson.exercise.example.map(ex => ({
        input: ex.incomplete,
        output: ex.complete,
        dutch: ex.dutch,
        spanish: ex.spanish,
      }));
    }

    sections.push(exerciseSection);
  }

  return {
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    sections,
  };
}

function convertGrammarLesson(lesson: OldGrammarLesson): NewLesson {
  const sections: NewSection[] = [];

  // Add reading section for grammar explanation
  sections.push({
    type: 'reading',
    title: 'Grammatica / Gramática',
    paragraphs: [
      { text: lesson.grammar.explanation },
      ...lesson.grammar.examples.map(ex => ({ text: ex })),
    ],
  });

  // Add exercise section if present
  if (lesson.exercise) {
    const exerciseSection: NewSection = {
      type: 'exercise',
      exerciseType: 'general',
      instruction: lesson.exercise.instruction,
    };

    if (lesson.exercise.example) {
      exerciseSection.example = lesson.exercise.example.map(ex => ({
        input: ex.incomplete,
        output: ex.complete,
        dutch: ex.dutch,
        spanish: ex.spanish,
      }));
    }

    sections.push(exerciseSection);
  }

  return {
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    sections,
  };
}

function convertLesson(lesson: OldLesson): NewLesson {
  switch (lesson.type) {
    case 'dialogue':
      return convertDialogueLesson(lesson);
    case 'vocabulary':
      return convertVocabularyLesson(lesson);
    case 'practice':
      return convertPracticeLesson(lesson);
    case 'grammar':
      return convertGrammarLesson(lesson);
    default:
      throw new Error(`Unknown lesson type: ${(lesson as { type: string }).type}`);
  }
}

async function main() {
  const lessonFiles = (await readdir(lessonsDir))
    .filter((filename) => filename.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b));

  console.log(`Converting ${lessonFiles.length} lesson files...`);

  for (const filename of lessonFiles) {
    const filePath = path.join(lessonsDir, filename);
    const raw = await readFile(filePath, 'utf-8');
    const oldLesson = JSON.parse(raw) as OldLesson;

    // Skip if already converted (has sections array)
    if ('sections' in oldLesson) {
      console.log(`Skipping ${filename} (already converted)`);
      continue;
    }

    try {
      const newLesson = convertLesson(oldLesson);
      await writeFile(filePath, JSON.stringify(newLesson, null, 2) + '\n');
      console.log(`Converted ${filename}`);
    } catch (error) {
      console.error(`Error converting ${filename}:`, error);
    }
  }

  console.log('Done!');
}

main().catch(console.error);
