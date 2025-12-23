import AudioButton from '../common/AudioButton';
import LessonHeader from './LessonHeader';
import ExerciseSentence from './ExerciseSentence';

const VocabularyLesson = ({ lesson }) => {
  return (
    <section className="space-y-6">
      <LessonHeader lesson={lesson} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lesson.items.map((item) => (
          <div
            key={item.number}
            className="card bg-base-100 shadow-md border border-base-300"
          >
            <div className="card-body gap-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-outline">#{item.number}</span>
                <AudioButton text={item.dutch} />
              </div>
              <p className="text-2xl font-semibold text-base-content">{item.dutch}</p>
              {item.description && (
                <p className="text-sm text-base-content/70">{item.description}</p>
              )}
              <div className="flex flex-wrap gap-2 text-sm">
                {item.english && (
                  <span className="badge badge-ghost">🇬🇧 {item.english}</span>
                )}
                {item.spanish && (
                  <span className="badge badge-ghost">🇪🇸 {item.spanish}</span>
                )}
              </div>
              <p className="text-xs italic text-base-content/60">{item.illustration}</p>
            </div>
          </div>
        ))}
      </div>

      {lesson.exercise && (
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
              {lesson.exercise.instruction}
            </p>

            {lesson.exercise.example &&
              lesson.exercise.example.map((example, idx) => {
                const answerText = example.complete || example.dutch;

                return (
                  <div
                    key={idx}
                    className="card bg-base-200 border border-base-300"
                  >
                    <div className="card-body gap-3 p-4">
                      {example.incomplete && (
                        <p className="text-sm text-base-content/70">
                          {example.incomplete}
                        </p>
                      )}
                      {answerText && (
                        <div className="flex items-start gap-3 rounded-box bg-base-100 p-3 border border-base-300">
                          <AudioButton text={answerText} />
                          <div>
                            <p className="font-medium text-base-content">
                              {answerText}
                            </p>
                            {example.spanish && (
                              <p className="text-xs text-base-content/70">
                                {example.spanish}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {lesson.exercise.instruction2 && (
              <p className="font-semibold text-base-content">
                {lesson.exercise.instruction2}
              </p>
            )}

            {lesson.exercise.exercises &&
              lesson.exercise.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="collapse collapse-arrow bg-base-200 border border-base-300"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-semibold">
                    {ex.text}
                  </div>
                  <div className="collapse-content">
                    <div className="flex items-start gap-3 rounded-box bg-base-100 p-3 border border-base-300">
                      <AudioButton text={ex.answer} />
                      <div>
                        <p className="font-medium text-base-content">{ex.answer}</p>
                        {ex.spanish && (
                          <p className="text-xs text-base-content/70">
                            {ex.spanish}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {lesson.exercise.sentences &&
              lesson.exercise.sentences.map((sentence, idx) => (
                <ExerciseSentence key={idx} sentence={sentence} />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default VocabularyLesson;
