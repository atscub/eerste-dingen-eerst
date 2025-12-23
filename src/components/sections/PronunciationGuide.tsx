import AudioButton from '../common/AudioButton';
import type { PronunciationGuideData } from '../../types/lessons';

type PronunciationGuideProps = {
  data: PronunciationGuideData;
};

const PronunciationGuide = ({ data }: PronunciationGuideProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body space-y-5">
        <div>
          <h3 className="text-2xl font-bold text-base-content">{data.title}</h3>
          <p className="text-sm text-base-content/70">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.tips.map((tip, idx) => (
            <div
              key={idx}
              className="card bg-base-200 border border-base-300"
            >
              <div className="card-body gap-3">
                <div className="flex items-center justify-between">
                  <span className="badge badge-secondary badge-outline">
                    {tip.letter}
                  </span>
                </div>
                <p className="font-medium text-base-content">{tip.description}</p>
                <p className="text-xs text-base-content/70 italic">{tip.spanish}</p>
                <div className="flex flex-wrap gap-2">
                  {tip.examples.map((example, exIdx) => (
                    <div
                      key={exIdx}
                      className="flex items-center gap-2 rounded-box bg-base-100 border border-base-300 px-3 py-1"
                    >
                      <AudioButton text={example} size="btn-xs" />
                      <span className="text-sm font-medium text-base-content">
                        {example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PronunciationGuide;
