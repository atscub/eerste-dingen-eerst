import AudioButton from '../common/AudioButton';
import TranslationTooltip from '../common/TranslationTooltip';
import type { DialogueSection as DialogueSectionData } from '../../types/lessons';

type DialogueSectionProps = {
  section: DialogueSectionData;
};

const speakerPalette = [
  'text-rose-400',
  'text-sky-400',
  'text-amber-400',
  'text-emerald-400',
  'text-violet-400',
  'text-teal-400',
];

const DialogueSection = ({ section }: DialogueSectionProps) => {
  const speakerColorMap = new Map<string, string>();

  const getSpeakerColor = (speaker?: string): string | null => {
    if (!speaker) return null;
    if (!speakerColorMap.has(speaker)) {
      const color = speakerPalette[speakerColorMap.size % speakerPalette.length];
      speakerColorMap.set(speaker, color);
    }
    return speakerColorMap.get(speaker) ?? null;
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-6 lg:p-12">
        {section.title && (
          <h3 className="text-xl font-semibold text-base-content">{section.title}</h3>
        )}

        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="space-y-4 flex-1">
            {section.lines.map((line, idx) => {
              const speakerColor = getSpeakerColor(line.speaker);
              return (
                <div key={idx} className="flex items-start gap-3 py-2">
                  <div className="flex-1">
                    <p className="text-base-content">
                      {line.speaker && (
                        <span
                          className={`font-semibold mr-4 ${speakerColor || 'text-base-content'}`}
                        >
                          {line.speaker}:{' '}
                        </span>
                      )}
                      {line.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <AudioButton text={line.text} size="btn-xs" />
                    <TranslationTooltip translation={line.translation} />
                  </div>
                </div>
              );
            })}
          </div>

          {section.images.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wide text-base-content/60">
                Ilustraciones
              </div>
              <div className="grid grid-cols-2 gap-2 divide-x divide-y divide-base-content/30 w-fit bg-base-100">
                {section.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="object-contain w-60"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogueSection;
