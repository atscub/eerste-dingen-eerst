import DialogueLesson from './DialogueLesson';
import GrammarLesson from './GrammarLesson';
import VocabularyLesson from './VocabularyLesson';
import PracticeLesson from './PracticeLesson';
import type { Lesson } from '../../types/lessons';

type LessonViewerProps = {
  lesson?: Lesson | null;
};

const LessonViewer = ({ lesson }: LessonViewerProps) => {
  if (!lesson) return null;

  if (lesson.type === 'dialogue') {
    return <DialogueLesson lesson={lesson} />;
  }

  if (lesson.type === 'vocabulary') {
    return <VocabularyLesson lesson={lesson} />;
  }

  if (lesson.type === 'practice') {
    return <PracticeLesson lesson={lesson} />;
  }

  if (lesson.type === 'grammar') {
    return <GrammarLesson lesson={lesson} />;
  }

  return null;
};

export default LessonViewer;
