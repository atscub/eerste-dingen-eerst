import LessonHeader from './LessonHeader';
import DialogueLine from './DialogueLine';
import type { DialogueLesson as DialogueLessonData } from '../../types/lessons';

type DialogueLessonProps = {
  lesson: DialogueLessonData;
};

const DialogueLesson = ({ lesson }: DialogueLessonProps) => {
  const dialogue = lesson.dialogue;
  const headerImage = dialogue.headerImage;

  if (!dialogue) return null;

  const speakerPalette = [
    'text-rose-400',
    'text-sky-400',
    'text-amber-400',
    'text-emerald-400',
    'text-violet-400',
    'text-teal-400',
  ];
  const speakerColorMap = new Map<string, string>();

  const getSpeakerMeta = (
    speaker?: string
  ): { label: string | null; color: string | null } => {
    if (!speaker) return { label: null, color: null };
    if (!speakerColorMap.has(speaker)) {
      const color =
        speakerPalette[speakerColorMap.size % speakerPalette.length];
      speakerColorMap.set(speaker, color);
    }
    return { label: speaker, color: speakerColorMap.get(speaker) ?? null };
  };

  return (
    <section className="space-y-6">
      <LessonHeader lesson={lesson} />

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body gap-6 lg:p-12">
          {headerImage && (
            <div className="w-full">
              <img
                src={headerImage.src}
                alt={headerImage.alt}
                loading="lazy"
                className="w-full max-h-[360px] object-cover rounded-lg border border-base-300"
              />
            </div>
          )}
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="space-y-6 flex-1">
              <h2 className="text-2xl font-semibold mb-8">Dialogues</h2>
              {dialogue.lines.map((line, idx) => {
                const { label, color } = getSpeakerMeta(line.speaker);
                return (
                  <DialogueLine
                    key={idx}
                    line={line}
                    speaker={label}
                    speakerColor={color}
                  />
                );
              })}
            </div>
            {dialogue.images.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wide text-base-content/60">
                  Ilustraciones
                </div>
                <div className="grid grid-cols-2 gap-2 divide-x divide-y divide-base-content/30 w-fit bg-base-100">
                  {dialogue.images.map((image, idx) => (
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
    </section>
  );
};

export default DialogueLesson;
