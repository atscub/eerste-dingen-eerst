import type { Lesson } from '../../types/lessons';

type LessonHeaderProps = {
  lesson: Lesson;
};

const LessonHeader = ({ lesson }: LessonHeaderProps) => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-base-content">{lesson.title}</h2>
        </div>
        {lesson.subtitle && (
          <p className="text-lg text-base-content/80">{lesson.subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default LessonHeader;
