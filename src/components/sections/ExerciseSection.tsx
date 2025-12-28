import AudioButton from '../common/AudioButton';
import type { ExerciseSection as ExerciseSectionData } from '../../types/lessons';

type ExerciseSectionProps = {
  section: ExerciseSectionData;
};

const ExerciseSection = ({ section }: ExerciseSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6">
        <div className="flex items-center gap-2">
          <div className="badge badge-accent badge-outline">Oefening / Ejercicio</div>
          {section.title && (
            <h3 className="text-lg font-bold text-base-content">{section.title}</h3>
          )}
        </div>

        <p className="font-semibold text-base-content">{section.instruction}</p>

        {section.wordsToUse && section.wordsToUse.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-base-content/70">Gebruik / Use:</span>
            {section.wordsToUse.map((word, idx) => (
              <span key={idx} className="badge badge-primary">
                {word}
              </span>
            ))}
          </div>
        )}

        {section.example && section.example.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wide text-base-content/60">
              Voorbeeld / Ejemplo
            </div>
            {section.example.map((example, idx) => {
              const answerText = example.output || example.dutch;
              return (
                <div key={idx} className="card bg-base-200 border border-base-300">
                  <div className="card-body gap-3 p-4">
                    {example.input && (
                      <p className="text-sm text-base-content/70">{example.input}</p>
                    )}
                    {answerText && (
                      <div
                        className={`flex items-start gap-3 rounded-box bg-base-100 p-3 border border-base-300 ${
                          example.handwritten ? 'font-handwriting italic' : ''
                        }`}
                      >
                        <AudioButton text={answerText} size="btn-xs" />
                        <div>
                          <p className="font-medium text-base-content">{answerText}</p>
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
          </div>
        )}

        {section.instruction2 && (
          <p className="font-semibold text-base-content">{section.instruction2}</p>
        )}

        {section.items && section.items.length > 0 && (
          <div className="space-y-3">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="collapse collapse-arrow bg-base-200 border border-base-300"
              >
                <input type="checkbox" />
                <div className="collapse-title text-sm font-semibold">{item.text}</div>
                {item.answer && (
                  <div className="collapse-content">
                    <div className="flex items-start gap-3 rounded-box bg-base-100 p-3 border border-base-300">
                      <AudioButton text={item.answer} size="btn-xs" />
                      <div>
                        <p className="font-medium text-base-content">{item.answer}</p>
                        {item.spanish && (
                          <p className="text-xs text-base-content/70">{item.spanish}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseSection;
