import AudioButton from '../common/AudioButton';
import LessonHeader from './LessonHeader';
import ExerciseSentence from './ExerciseSentence';
import type { PracticeLesson as PracticeLessonData } from '../../types/lessons';

type PracticeLessonProps = {
  lesson: PracticeLessonData;
};

const PracticeLesson = ({ lesson }: PracticeLessonProps) => {
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
                <AudioButton text={item.question} />
              </div>
              <p className="text-xl font-semibold text-base-content">{item.question}</p>
              <p className="text-sm text-base-content/70">{item.translation}</p>
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
                const sentenceText =
                  example.complete ?? example.dutch ?? example.incomplete;
                if (!sentenceText) return null;

                return (
                  <ExerciseSentence
                    key={idx}
                    sentence={{
                      dutch: sentenceText,
                      spanish: example.spanish ?? undefined,
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticeLesson;
