import AudioButton from '../common/AudioButton';
import type { PatternDrillSection as PatternDrillSectionData } from '../../types/lessons';

type PatternDrillSectionProps = {
  section: PatternDrillSectionData;
};

const PatternDrillSection = ({ section }: PatternDrillSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6">
        {section.title && (
          <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
        )}

        {section.pattern && (
          <div className="bg-base-200 p-4 rounded-lg border border-base-300">
            <p className="text-lg font-medium text-base-content">{section.pattern}</p>
          </div>
        )}

        {section.inputPrompt && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-base-content/70">Gebruik / Use:</span>
            <span className="badge badge-primary">{section.inputPrompt}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.items.map((item, idx) => {
            const displayText = item.output || item.dutch || item.input || '';

            return (
              <div
                key={item.number ?? idx}
                className="card bg-base-200 border border-base-300"
              >
                <div className="card-body gap-3 p-4">
                  <div className="flex items-center justify-between">
                    {item.number && (
                      <span className="badge badge-outline">#{item.number}</span>
                    )}
                    {displayText && <AudioButton text={displayText} size="btn-xs" />}
                  </div>

                  {item.illustration && (
                    <div className="flex justify-center">
                      <img
                        src={item.illustration}
                        alt={displayText}
                        loading="lazy"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}

                  {item.input && (
                    <p className="text-sm text-base-content/70">{item.input}</p>
                  )}

                  {item.output && (
                    <p className="text-base font-medium text-base-content">
                      {item.output}
                    </p>
                  )}

                  {item.dutch && item.dutch !== item.output && (
                    <p className="text-base text-base-content">{item.dutch}</p>
                  )}

                  <div className="flex flex-wrap gap-2 text-sm">
                    {item.english && (
                      <span className="badge badge-ghost">EN: {item.english}</span>
                    )}
                    {item.spanish && (
                      <span className="badge badge-ghost">ES: {item.spanish}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatternDrillSection;
