import AudioButton from '../common/AudioButton';
import TranslationTooltip from '../common/TranslationTooltip';

const DialogueLine = ({ line }) => {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex-1">
        <p className="text-base-content">
          {line.speaker && (
            <span className="font-semibold">{line.speaker}: </span>
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
