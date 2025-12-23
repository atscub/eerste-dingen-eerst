import type { Lesson, LessonType } from '../../types/lessons';

const lessonTypeLabels: Record<LessonType, string> = {
  dialogue: 'Diálogo',
  vocabulary: 'Vocabulario',
  practice: 'Práctica',
};

type LessonHeaderProps = {
  lesson: Lesson;
};

const LessonHeader = ({ lesson }: LessonHeaderProps) => {
  const typeLabel = lessonTypeLabels[lesson.type] || 'Lección';

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="badge badge-secondary badge-outline">{typeLabel}</div>
          <h2 className="text-2xl font-bold text-base-content">{lesson.title}</h2>
        </div>
        {lesson.subtitle && (
          <p className="text-sm text-base-content/70">{lesson.subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default LessonHeader;
