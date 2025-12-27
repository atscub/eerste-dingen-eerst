import ExerciseSentence from './ExerciseSentence';
import LessonHeader from './LessonHeader';
import type { GrammarLesson as GrammarLessonData } from '../../types/lessons';

type GrammarLessonProps = {
  lesson: GrammarLessonData;
};

const GrammarLesson = ({ lesson }: GrammarLessonProps) => {
  const { grammar, exercise } = lesson;

  return (
    <section className="space-y-6">
      <LessonHeader lesson={lesson} />

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-base-content">Gramática</h3>
            <p className="text-sm text-base-content/70 whitespace-pre-wrap">
              {grammar.explanation}
            </p>
          </div>

          {grammar.examples.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-base-content/60">
                Ejemplos
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-base-content/80">
                {grammar.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {exercise && (
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body space-y-4">
            <div className="flex items-center gap-2">
              <div className="badge badge-accent badge-outline">
                Oefening / Ejercicio
              </div>
              <h3 className="text-lg font-bold text-base-content">
                Oefening / Ejercicio
              </h3>
            </div>
            <p className="font-semibold text-base-content">
              {exercise.instruction}
            </p>
            {exercise.example &&
              exercise.example.map((example, idx) =>
                example.dutch ? (
                  <ExerciseSentence
                    key={idx}
                    sentence={{
                      dutch: example.dutch,
                      spanish: example.spanish ?? undefined,
                    }}
                  />
                ) : null
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GrammarLesson;
