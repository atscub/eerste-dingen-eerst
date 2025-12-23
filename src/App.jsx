import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import lessonsData from './data/lessons.json';

// Audio button component with Dutch text-to-speech
const AudioButton = ({ text, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL'; // Dutch language
      utterance.rate = 0.85; // Slightly slower for learning
      
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
      onClick={speak}
      className={`inline-flex items-center justify-center p-1.5 rounded-full transition-all duration-200 hover:bg-blue-100 ${
        isPlaying ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-600 hover:text-blue-600'
      } ${className}`}
      title="Escuchar pronunciación"
    >
      <Volume2 size={16} className={isPlaying ? 'animate-pulse' : ''} />
    </button>
  );
};

// Lesson selector component
const LessonSelector = ({ lessons, currentLessonId, onSelectLesson }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Lecciones</h3>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            className={`p-2 rounded-lg font-medium transition-all duration-200 ${
              currentLessonId === lesson.id
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lesson.id}
          </button>
        ))}
      </div>
    </div>
  );
};

// Dialogue lesson component
const DialogueLesson = ({ lesson }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
        {lesson.subtitle && (
          <p className="text-blue-100 text-lg">{lesson.subtitle}</p>
        )}
      </div>

      <div className="space-y-4">
        {lesson.scenes.map((scene) => (
          <div key={scene.sceneNumber} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                {scene.sceneNumber}
              </span>
              <p className="text-sm text-gray-600 italic flex-1">{scene.illustration}</p>
            </div>

            {scene.text && (
              <div className="ml-11 space-y-2">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <AudioButton text={scene.text} />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{scene.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{scene.translation}</p>
                  </div>
                </div>
              </div>
            )}

            {scene.lines && scene.lines.map((line, idx) => (
              <div key={idx} className="ml-11 mb-2">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <AudioButton text={line.text} />
                  <div className="flex-1">
                    {line.speaker && (
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                        {line.speaker}
                      </p>
                    )}
                    <p className="text-lg font-medium text-gray-900">{line.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{line.translation}</p>
                  </div>
                </div>
              </div>
            ))}

            {scene.response && (
              <div className="ml-11 mt-2">
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <AudioButton text={scene.response.text} />
                  <div className="flex-1">
                    {scene.response.speaker && (
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                        {scene.response.speaker}
                      </p>
                    )}
                    <p className="text-lg font-medium text-gray-900">{scene.response.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{scene.response.translation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Vocabulary lesson component
const VocabularyLesson = ({ lesson }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
        {lesson.subtitle && (
          <p className="text-green-100 text-lg">{lesson.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lesson.items.map((item) => (
          <div key={item.number} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500">#{item.number}</span>
              <AudioButton text={item.dutch} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{item.dutch}</p>
            {item.description && (
              <p className="text-sm text-gray-700 mb-1">{item.description}</p>
            )}
            <div className="flex gap-2 text-sm text-gray-600">
              {item.english && <span>🇬🇧 {item.english}</span>}
              {item.spanish && <span>🇪🇸 {item.spanish}</span>}
            </div>
            <p className="text-xs text-gray-500 italic mt-2">{item.illustration}</p>
          </div>
        ))}
      </div>

      {lesson.exercise && (
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Oefening / Ejercicio</h3>
          <p className="font-semibold text-gray-800 mb-3">{lesson.exercise.instruction}</p>
          
          {lesson.exercise.example && lesson.exercise.example.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 mb-4">
              {ex.incomplete && (
                <p className="text-gray-600 mb-2">{ex.incomplete}</p>
              )}
              <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                <AudioButton text={ex.complete || ex.dutch} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{ex.complete || ex.dutch}</p>
                  <p className="text-sm text-gray-600 mt-1">{ex.spanish}</p>
                </div>
              </div>
            </div>
          ))}

          {lesson.exercise.instruction2 && (
            <p className="font-semibold text-gray-800 mt-6 mb-3">{lesson.exercise.instruction2}</p>
          )}

          {lesson.exercise.exercises && lesson.exercise.exercises.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 mb-3">
              <p className="text-gray-700 mb-2">{ex.text}</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600 font-medium hover:text-blue-700">
                  Ver respuesta / Show answer
                </summary>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded mt-2">
                  <AudioButton text={ex.answer} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ex.answer}</p>
                    <p className="text-sm text-gray-600 mt-1">{ex.spanish}</p>
                  </div>
                </div>
              </details>
            </div>
          ))}

          {lesson.exercise.sentences && lesson.exercise.sentences.map((sentence, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 mb-2">
              <div className="flex items-center gap-3">
                <AudioButton text={sentence.dutch} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{sentence.dutch}</p>
                  <p className="text-sm text-gray-600 mt-1">{sentence.spanish}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Practice lesson component  
const PracticeLesson = ({ lesson }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
        {lesson.subtitle && (
          <p className="text-purple-100 text-lg">{lesson.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lesson.items.map((item) => (
          <div key={item.number} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500">#{item.number}</span>
              <AudioButton text={item.question} />
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">{item.question}</p>
            <p className="text-sm text-gray-600">{item.translation}</p>
            <p className="text-xs text-gray-500 italic mt-2">{item.illustration}</p>
          </div>
        ))}
      </div>

      {lesson.exercise && (
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Oefening / Ejercicio</h3>
          <p className="font-semibold text-gray-800 mb-3">{lesson.exercise.instruction}</p>
          
          {lesson.exercise.sentences && lesson.exercise.sentences.map((sentence, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 mb-2">
              <div className="flex items-center gap-3">
                <AudioButton text={sentence.dutch} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{sentence.dutch}</p>
                  <p className="text-sm text-gray-600 mt-1">{sentence.spanish}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main lesson viewer component
const LessonViewer = ({ lesson }) => {
  if (lesson.type === 'dialogue') {
    return <DialogueLesson lesson={lesson} />;
  } else if (lesson.type === 'vocabulary') {
    return <VocabularyLesson lesson={lesson} />;
  } else if (lesson.type === 'practice') {
    return <PracticeLesson lesson={lesson} />;
  }
  return null;
};

// Pronunciation guide component
const PronunciationGuide = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h3>
      <p className="text-gray-600 mb-4">{data.subtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.tips.map((tip, idx) => (
          <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-lg text-blue-900 mb-2">{tip.letter}</h4>
            <p className="text-sm text-gray-700 mb-2">{tip.description}</p>
            <p className="text-xs text-gray-600 italic mb-2">{tip.spanish}</p>
            <div className="flex flex-wrap gap-2">
              {tip.examples.map((example, exIdx) => (
                <div key={exIdx} className="flex items-center gap-2 bg-white rounded px-3 py-1 shadow-sm">
                  <AudioButton text={example} className="scale-90" />
                  <span className="font-medium text-gray-900">{example}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [showPronunciation, setShowPronunciation] = useState(false);
  
  const currentLesson = lessonsData.lessons.find(l => l.id === currentLessonId);

  const nextLesson = () => {
    if (currentLessonId < lessonsData.lessons.length) {
      setCurrentLessonId(currentLessonId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevLesson = () => {
    if (currentLessonId > 1) {
      setCurrentLessonId(currentLessonId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{lessonsData.courseTitle}</h1>
              <p className="text-gray-600">{lessonsData.courseSubtitle}</p>
            </div>
            <button
              onClick={() => setShowPronunciation(!showPronunciation)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {showPronunciation ? 'Ocultar' : 'Ver'} Pronunciación
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {showPronunciation && (
          <PronunciationGuide data={lessonsData.pronunciation} />
        )}

        <LessonSelector
          lessons={lessonsData.lessons}
          currentLessonId={currentLessonId}
          onSelectLesson={setCurrentLessonId}
        />

        <div className="mb-8">
          <LessonViewer lesson={currentLesson} />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4">
          <button
            onClick={prevLesson}
            disabled={currentLessonId === 1}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Anterior
          </button>
          <span className="text-gray-600 font-medium">
            Lección {currentLessonId} de {lessonsData.lessons.length}
          </span>
          <button
            onClick={nextLesson}
            disabled={currentLessonId === lessonsData.lessons.length}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Siguiente →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Basado en el método de L.G. Alexander • Para hispanohablantes
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Haz clic en los iconos 🔊 para escuchar la pronunciación
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
