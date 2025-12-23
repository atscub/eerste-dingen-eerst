import { ChevronLeft, ChevronRight } from 'lucide-react';

type LessonPaginationProps = {
  currentLessonId: number;
  totalLessons: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const LessonPagination = ({
  currentLessonId,
  totalLessons,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: LessonPaginationProps) => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="join">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="btn btn-outline join-item gap-2"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="btn btn-outline join-item gap-2"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="badge badge-outline">
            Lección {currentLessonId} de {totalLessons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPagination;
