import AudioButton from '../common/AudioButton';
import type { VocabularyTableSection as VocabularyTableSectionData } from '../../types/lessons';

type VocabularyTableSectionProps = {
  section: VocabularyTableSectionData;
};

const VocabularyTableSection = ({ section }: VocabularyTableSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6">
        {section.title && (
          <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
        )}

        <div className="space-y-6">
          {section.rows.map((row, rowIdx) => (
            <div key={rowIdx} className="space-y-3">
              {row.category && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-secondary badge-lg font-bold">
                    {row.category}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {row.items.map((item, itemIdx) => (
                  <div
                    key={item.number ?? itemIdx}
                    className="card bg-base-200 border border-base-300"
                  >
                    <div className="card-body gap-2 p-3 items-center text-center">
                      {item.number && (
                        <span className="badge badge-outline badge-sm">
                          {item.number}
                        </span>
                      )}

                      <p className="text-xs text-base-content/60 uppercase tracking-wide">
                        {item.label}
                      </p>

                      {item.illustration && (
                        <img
                          src={item.illustration}
                          alt={item.label}
                          loading="lazy"
                          className="max-h-20 object-contain"
                        />
                      )}

                      {item.dutch && (
                        <>
                          <p className="text-sm font-medium text-base-content">
                            {item.dutch}
                          </p>
                          <AudioButton text={item.dutch} size="btn-xs" />
                        </>
                      )}

                      {(item.english || item.spanish) && (
                        <p className="text-xs text-base-content/60">
                          {item.english || item.spanish}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyTableSection;
