import AudioButton from '../common/AudioButton';
import TranslationTooltip from '../common/TranslationTooltip';
import type { PracticeSection as PracticeSectionData } from '../../types/lessons';

type PracticeSectionProps = {
  section: PracticeSectionData;
};

const PracticeSection = ({ section }: PracticeSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6">
        {(section.title || section.prompt) && (
          <div className="space-y-2">
            {section.title && (
              <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
            )}
            {section.prompt && (
              <p className="text-lg text-base-content/80 italic">{section.prompt}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.items.map((item, idx) => {
            const displayText = item.dutch || item.question || item.answer || '';
            const hasMultipleTexts = item.question && item.answer;

            return (
              <div
                key={item.number ?? item.label ?? idx}
                className="card bg-base-200 border border-base-300"
              >
                <div className="card-body gap-3 p-4">
                  <div className="flex items-center justify-between">
                    {(item.number || item.label) && (
                      <span className="badge badge-outline">
                        {item.label || `#${item.number}`}
                      </span>
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

                  {hasMultipleTexts ? (
                    <div className="space-y-2">
                      {item.question && (
                        <p className="text-base font-medium text-base-content">
                          {item.question}
                        </p>
                      )}
                      {item.answer && (
                        <p className="text-sm text-base-content/80">{item.answer}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg font-medium text-base-content">{displayText}</p>
                  )}

                  {item.dutch && item.dutch !== displayText && (
                    <p className="text-base text-base-content">{item.dutch}</p>
                  )}

                  <div className="flex flex-wrap gap-2 text-sm">
                    {item.english && (
                      <span className="badge badge-ghost">EN: {item.english}</span>
                    )}
                    {item.spanish && (
                      <TranslationTooltip translation={item.spanish} />
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

export default PracticeSection;
