import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import lessonsData from './data/lessons.json';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import LessonViewer from './components/lessons/LessonViewer';
import LessonPagination from './components/sections/LessonPagination';
import PronunciationGuide from './components/sections/PronunciationGuide';

function App() {
  const lessons = lessonsData.lessons;
  const [currentLessonId, setCurrentLessonId] = useLocalStorage(
    'last-lesson-id',
    lessons[0]?.id ?? 1
  );
  const [showPronunciation, setShowPronunciation] = useState(false);

  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentLesson = lessons[safeIndex];
  const totalLessons = lessons.length;

  useEffect(() => {
    if (currentIndex === -1 && lessons.length > 0) {
      setCurrentLessonId(lessons[0].id);
    }
  }, [currentIndex, lessons, setCurrentLessonId]);

  const goToLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextLesson = () => {
    if (currentIndex >= 0 && currentIndex < totalLessons - 1) {
      goToLesson(lessons[currentIndex + 1].id);
    }
  };

  const prevLesson = () => {
    if (currentIndex > 0) {
      goToLesson(lessons[currentIndex - 1].id);
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < totalLessons - 1;

  return (
    <div className="min-h-screen">
      <AppHeader
        courseTitle={lessonsData.courseTitle}
        courseSubtitle={lessonsData.courseSubtitle}
        lessons={lessons}
        currentLessonId={currentLesson?.id ?? ''}
        showPronunciation={showPronunciation}
        onLessonChange={goToLesson}
        onTogglePronunciation={() => setShowPronunciation((prev) => !prev)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {showPronunciation && (
          <PronunciationGuide data={lessonsData.pronunciation} />
        )}

        {currentLesson && (
          <LessonPagination
            currentLessonId={currentLesson.id}
            totalLessons={totalLessons}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={prevLesson}
            onNext={nextLesson}
          />
        )}

        <LessonViewer lesson={currentLesson} />

        {currentLesson && (
          <LessonPagination
            currentLessonId={currentLesson.id}
            totalLessons={totalLessons}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={prevLesson}
            onNext={nextLesson}
          />
        )}
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
