import DialogueLesson from './DialogueLesson';
import VocabularyLesson from './VocabularyLesson';
import PracticeLesson from './PracticeLesson';

const LessonViewer = ({ lesson }) => {
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

  return null;
};

export default LessonViewer;
