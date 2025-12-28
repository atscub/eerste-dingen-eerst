import AudioButton from '../common/AudioButton';
import type { GrammarTableSection as GrammarTableSectionData } from '../../types/lessons';

type GrammarTableSectionProps = {
  section: GrammarTableSectionData;
};

const GrammarTableSection = ({ section }: GrammarTableSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6">
        {section.title && (
          <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
        )}

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {section.columns.map((column, idx) => (
                  <th key={idx} className="text-base-content font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="text-base-content">
                      <div className="flex items-center gap-2">
                        <span>{cell}</span>
                        <AudioButton text={cell} size="btn-xs" />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GrammarTableSection;
