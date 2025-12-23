import AudioButton from '../common/AudioButton';

const ExerciseSentence = ({ sentence }) => {
  return (
    <div className="flex items-start gap-3 rounded-box bg-base-200 p-3 border border-base-300">
      <AudioButton text={sentence.dutch} />
      <div>
        <p className="font-medium text-base-content">{sentence.dutch}</p>
        {sentence.spanish && (
          <p className="text-xs text-base-content/70">{sentence.spanish}</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseSentence;
