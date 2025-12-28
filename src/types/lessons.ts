export type LessonType = 'dialogue' | 'vocabulary' | 'practice' | 'grammar';

export interface DialogueLine {
  text: string;
  speaker?: string;
  translation?: string;
}

export interface DialogueImage {
  src: string;
  alt: string;
}

export interface DialogueContent {
  lines: DialogueLine[];
  headerImage?: DialogueImage;
  images: DialogueImage[];
}

export interface LessonBase {
  id: number;
  title: string;
  subtitle?: string;
  type: LessonType;
}

export interface DialogueLesson extends LessonBase {
  type: 'dialogue';
  dialogue: DialogueContent;
}

export interface VocabularyItem {
  number: number;
  dutch: string;
  english?: string;
  spanish?: string;
  description?: string;
  illustration: string;
}

export interface PracticeItem {
  number: number;
  question: string;
  translation: string;
  illustration: string;
}

export interface ExerciseSentence {
  dutch: string;
  spanish?: string;
}

export interface ExerciseExample {
  incomplete?: string;
  complete?: string;
  dutch?: string;
  spanish?: string;
}

export interface ExerciseItem {
  text: string;
  answer: string;
  spanish?: string;
}

export interface ExerciseBlock {
  instruction: string;
  example?: ExerciseExample[];
  instruction2?: string;
  exercises?: ExerciseItem[];
  sentences?: ExerciseSentence[];
}

export interface VocabularyLesson extends LessonBase {
  type: 'vocabulary';
  items: VocabularyItem[];
  exercise?: ExerciseBlock;
}

export interface PracticeLesson extends LessonBase {
  type: 'practice';
  items: PracticeItem[];
  exercise?: {
    instruction: string;
    example?: ExerciseExample[];
  };
}

export interface GrammarLesson extends LessonBase {
  type: 'grammar';
  grammar: {
    explanation: string;
    examples: string[];
  };
  exercise?: {
    instruction: string;
    example?: ExerciseExample[];
  };
}

export type Lesson =
  | DialogueLesson
  | VocabularyLesson
  | PracticeLesson
  | GrammarLesson;

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
