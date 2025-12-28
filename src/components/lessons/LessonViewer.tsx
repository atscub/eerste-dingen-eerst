import LessonHeader from './LessonHeader';
import {
  DialogueSection,
  ReadingSection,
  VocabularySection,
  VocabularyGroupSection,
  VocabularyTableSection,
  PracticeSection,
  GrammarTableSection,
  PatternDrillSection,
  ExerciseSection,
} from '../sections';
import type { Lesson, Section } from '../../types/lessons';

type LessonViewerProps = {
  lesson?: Lesson | null;
};

const renderSection = (section: Section, index: number) => {
  switch (section.type) {
    case 'dialogue':
      return <DialogueSection key={index} section={section} />;
    case 'reading':
      return <ReadingSection key={index} section={section} />;
    case 'vocabulary':
      return <VocabularySection key={index} section={section} />;
    case 'vocabularyGroup':
      return <VocabularyGroupSection key={index} section={section} />;
    case 'vocabularyTable':
      return <VocabularyTableSection key={index} section={section} />;
    case 'practice':
      return <PracticeSection key={index} section={section} />;
    case 'grammarTable':
      return <GrammarTableSection key={index} section={section} />;
    case 'patternDrill':
      return <PatternDrillSection key={index} section={section} />;
    case 'exercise':
      return <ExerciseSection key={index} section={section} />;
    default:
      return null;
  }
};

const LessonViewer = ({ lesson }: LessonViewerProps) => {
  if (!lesson) return null;

  return (
    <section className="space-y-6">
      <LessonHeader lesson={lesson} />
      {lesson.sections.map((section, index) => renderSection(section, index))}
    </section>
  );
};

export default LessonViewer;
