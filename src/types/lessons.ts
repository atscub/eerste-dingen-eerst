// =============================================================================
// BASE TYPES
// =============================================================================

export interface Image {
  src: string;
  alt: string;
}

// =============================================================================
// SECTION TYPES
// =============================================================================

export type SectionType =
  | 'dialogue'
  | 'reading'
  | 'vocabulary'
  | 'vocabularyGroup'
  | 'vocabularyTable'
  | 'practice'
  | 'grammarTable'
  | 'patternDrill'
  | 'exercise';

// =============================================================================
// DIALOGUE SECTION
// =============================================================================

export interface DialogueLine {
  text: string;
  speaker?: string;
  translation?: string;
}

export interface DialogueSection {
  type: 'dialogue';
  title?: string;
  lines: DialogueLine[];
  images: Image[];
}

// =============================================================================
// READING SECTION
// =============================================================================

export interface ReadingParagraph {
  text: string;
  translation?: string;
}

export interface ReadingSection {
  type: 'reading';
  title?: string;
  headerImage?: Image;
  paragraphs: ReadingParagraph[];
}

// =============================================================================
// VOCABULARY SECTION
// =============================================================================

export interface VocabularyItem {
  number?: number;
  dutch: string;
  english?: string;
  spanish?: string;
  description?: string;
  illustration?: string;
}

export interface VocabularySection {
  type: 'vocabulary';
  title?: string;
  prompt?: string;
  items: VocabularyItem[];
}

// =============================================================================
// VOCABULARY GROUP SECTION
// =============================================================================

export interface VocabularyGroupItem {
  number?: number;
  dutch: string;
  english?: string;
  spanish?: string;
  illustration?: string;
}

export interface VocabularyGroup {
  prompt: string;
  items: VocabularyGroupItem[];
}

export interface VocabularyGroupSection {
  type: 'vocabularyGroup';
  title?: string;
  groups: VocabularyGroup[];
}

// =============================================================================
// VOCABULARY TABLE SECTION
// =============================================================================

export interface VocabularyTableItem {
  number?: number;
  label: string;
  dutch?: string;
  english?: string;
  spanish?: string;
  illustration?: string;
}

export interface VocabularyTableRow {
  category?: string;
  items: VocabularyTableItem[];
}

export interface VocabularyTableSection {
  type: 'vocabularyTable';
  title?: string;
  rows: VocabularyTableRow[];
}

// =============================================================================
// PRACTICE SECTION
// =============================================================================

export interface PracticeItem {
  number?: number;
  label?: string;
  question?: string;
  answer?: string;
  dutch?: string;
  english?: string;
  spanish?: string;
  illustration?: string;
}

export interface PracticeSection {
  type: 'practice';
  title?: string;
  prompt?: string;
  items: PracticeItem[];
}

// =============================================================================
// GRAMMAR TABLE SECTION
// =============================================================================

export interface GrammarTableSection {
  type: 'grammarTable';
  title?: string;
  columns: string[];
  rows: string[][];
}

// =============================================================================
// PATTERN DRILL SECTION
// =============================================================================

export interface PatternDrillItem {
  number?: number;
  input?: string;
  output?: string;
  dutch?: string;
  english?: string;
  spanish?: string;
  illustration?: string;
}

export interface PatternDrillSection {
  type: 'patternDrill';
  title?: string;
  pattern?: string;
  inputPrompt?: string;
  items: PatternDrillItem[];
}

// =============================================================================
// EXERCISE SECTION
// =============================================================================

export type ExerciseType = 'copy' | 'fillIn' | 'transform' | 'rewrite' | 'comprehension' | 'general';

export interface ExerciseExample {
  input?: string;
  output?: string;
  dutch?: string;
  spanish?: string;
  handwritten?: boolean;
}

export interface ExerciseItem {
  text: string;
  answer?: string;
  spanish?: string;
}

export interface ExerciseSection {
  type: 'exercise';
  title?: string;
  exerciseType: ExerciseType;
  instruction: string;
  instruction2?: string;
  wordsToUse?: string[];
  example?: ExerciseExample[];
  items?: ExerciseItem[];
}

// =============================================================================
// SECTION UNION
// =============================================================================

export type Section =
  | DialogueSection
  | ReadingSection
  | VocabularySection
  | VocabularyGroupSection
  | VocabularyTableSection
  | PracticeSection
  | GrammarTableSection
  | PatternDrillSection
  | ExerciseSection;

// =============================================================================
// LESSON
// =============================================================================

export interface Lesson {
  id: number;
  title: string;
  subtitle?: string;
  sections: Section[];
}

// =============================================================================
// PRONUNCIATION & COURSE
// =============================================================================

export interface PronunciationTip {
  letter: string;
  description: string;
  examples: string[];
  spanish: string;
}

export interface PronunciationGuideData {
  title: string;
  subtitle: string;
  tips: PronunciationTip[];
}

export interface CourseData {
  courseTitle: string;
  courseSubtitle: string;
  pronunciation: PronunciationGuideData;
}
