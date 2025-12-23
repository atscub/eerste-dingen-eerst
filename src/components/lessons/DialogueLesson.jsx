import LessonHeader from './LessonHeader';
import DialogueLine from './DialogueLine';

const DialogueLesson = ({ lesson }) => {
  const dialogue = lesson.dialogue;

  if (!dialogue) return null;

  return (
    <section className="space-y-6">
      <LessonHeader lesson={lesson} />

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="space-y-3">
              {dialogue.lines.map((line, idx) => (
                <DialogueLine key={idx} line={line} />
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wide text-base-content/60">
                Ilustraciones
              </div>
              <div className="grid grid-cols-2 gap-0 border border-base-content/30 divide-x divide-y divide-base-content/30 w-fit bg-base-100">
                {dialogue.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-[240px] h-[240px] object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DialogueLesson;
