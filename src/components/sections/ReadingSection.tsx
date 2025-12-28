import AudioButton from '../common/AudioButton';
import TranslationTooltip from '../common/TranslationTooltip';
import type { ReadingSection as ReadingSectionData } from '../../types/lessons';

type ReadingSectionProps = {
  section: ReadingSectionData;
};

const ReadingSection = ({ section }: ReadingSectionProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6 lg:p-12">
        {section.title && (
          <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
        )}

        {section.headerImage && (
          <div className="w-full">
            <img
              src={section.headerImage.src}
              alt={section.headerImage.alt}
              loading="lazy"
              className="w-full max-h-[360px] object-cover rounded-lg border border-base-300"
            />
          </div>
        )}

        <div className="space-y-4">
          {section.paragraphs.map((paragraph, idx) => (
            <div key={idx} className="flex items-start gap-3 py-2">
              <div className="flex-1">
                <p className="text-base-content leading-relaxed">{paragraph.text}</p>
              </div>
              <div className="flex items-center gap-1">
                <AudioButton text={paragraph.text} size="btn-xs" />
                <TranslationTooltip translation={paragraph.translation} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
