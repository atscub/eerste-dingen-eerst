import type { Lesson } from '../../types/lessons';

type AppHeaderProps = {
  courseTitle: string;
  courseSubtitle: string;
  lessons: Lesson[];
  currentLessonId: number | '';
  showPronunciation: boolean;
  onLessonChange: (id: number) => void;
  onTogglePronunciation: () => void;
};

const AppHeader = ({
  courseTitle,
  courseSubtitle,
  lessons,
  currentLessonId,
  showPronunciation,
  onLessonChange,
  onTogglePronunciation,
}: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <div className="navbar max-w-6xl mx-auto px-4 py-3">
        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-base-content">{courseTitle}</h1>
          <p className="text-sm text-base-content/70">{courseSubtitle}</p>
        </div>
        <div className="flex-none">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <label className="form-control w-full sm:w-56">
              <div className="label py-0">
                <span className="label-text text-xs uppercase tracking-wide">
                  Lección
                </span>
              </div>
              <select
                className="select select-bordered"
                value={currentLessonId ?? ''}
                onChange={(event) => onLessonChange(Number(event.target.value))}
              >
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                    {lesson.subtitle ? ` — ${lesson.subtitle}` : ''}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={onTogglePronunciation}
              className="btn btn-primary"
            >
              {showPronunciation ? 'Ocultar' : 'Ver'} Pronunciación
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
