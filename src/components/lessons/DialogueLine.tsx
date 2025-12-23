import classNames from 'classnames';
import AudioButton from '../common/AudioButton';
import TranslationTooltip from '../common/TranslationTooltip';
import type { DialogueLine as DialogueLineData } from '../../types/lessons';

type DialogueLineProps = {
  line: DialogueLineData;
  speaker?: string | null;
  speakerColor?: string | null;
};

const DialogueLine = ({ line, speaker, speakerColor }: DialogueLineProps) => {
  const speakerLabel = speaker || line.speaker;
  const speakerClass = speakerColor
    ? `font-semibold ${speakerColor}`
    : 'font-semibold text-base-content';

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex-1">
        <p className="text-base-content">
          {speakerLabel && (
            <span className={classNames(speakerClass, 'mr-4')}>{speakerLabel}: </span>
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
};

export default DialogueLine;
