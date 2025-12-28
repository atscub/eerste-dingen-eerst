import AudioButton from '../common/AudioButton';
import type { VocabularySection as VocabularySectionData } from '../../types/lessons';

type VocabularySectionProps = {
  section: VocabularySectionData;
};

const VocabularySection = ({ section }: VocabularySectionProps) => {
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
          {section.items.map((item, idx) => (
            <div
              key={item.number ?? idx}
              className="card bg-base-200 border border-base-300"
            >
              <div className="card-body gap-3 p-4">
                <div className="flex items-center justify-between">
                  {item.number && (
                    <span className="badge badge-outline">#{item.number}</span>
                  )}
                  <AudioButton text={item.dutch} size="btn-xs" />
                </div>

                {item.illustration && (
                  <div className="flex justify-center">
                    <img
                      src={item.illustration}
                      alt={item.dutch}
                      loading="lazy"
                      className="max-h-32 object-contain"
                    />
                  </div>
                )}

                <p className="text-xl font-semibold text-base-content">{item.dutch}</p>

                {item.description && (
                  <p className="text-sm text-base-content/70">{item.description}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularySection;
