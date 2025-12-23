import { useState } from 'react';
import { Volume2 } from 'lucide-react';

const AudioButton = ({ text, className = '', size = 'btn-sm' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.85;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <button
      type="button"
      onClick={speak}
      className={`btn btn-circle ${size} ${isPlaying ? 'btn-primary' : 'btn-ghost'} ${className}`}
      title="Escuchar pronunciación"
      aria-label="Escuchar pronunciación"
    >
      <Volume2 size={16} className={isPlaying ? 'animate-pulse' : ''} />
    </button>
  );
};

export default AudioButton;
