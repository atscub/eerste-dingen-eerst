import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import lessonsData from './data/lessons.json';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import LessonViewer from './components/lessons/LessonViewer';
import LessonPagination from './components/sections/LessonPagination';
import PronunciationGuide from './components/sections/PronunciationGuide';

const lessons = lessonsData.lessons;
const defaultLessonId = lessons[0]?.id ?? 1;

const LessonPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const showPronunciation = searchParams.get('pronunciation') === 'true';

  const numericLessonId = Number(lessonId);
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === numericLessonId
  );
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentLesson = lessons[safeIndex];
  const totalLessons = lessons.length;

  useEffect(() => {
    if (!lessonId || Number.isNaN(numericLessonId) || currentIndex === -1) {
      navigate(
        { pathname: `/lesson/${defaultLessonId}`, search: location.search },
        { replace: true }
      );
    }
  }, [lessonId, numericLessonId, currentIndex, navigate, location.search]);

  const goToLesson = (id) => {
    navigate({ pathname: `/lesson/${id}`, search: location.search });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextLesson = () => {
    if (safeIndex >= 0 && safeIndex < totalLessons - 1) {
      goToLesson(lessons[safeIndex + 1].id);
    }
  };

  const prevLesson = () => {
    if (safeIndex > 0) {
      goToLesson(lessons[safeIndex - 1].id);
    }
  };

  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex >= 0 && safeIndex < totalLessons - 1;
  const setPronunciationParam = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set('pronunciation', 'true');
    } else {
      nextParams.delete('pronunciation');
    }
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="min-h-screen">
      <AppHeader
        courseTitle={lessonsData.courseTitle}
        courseSubtitle={lessonsData.courseSubtitle}
        lessons={lessons}
        currentLessonId={currentLesson?.id ?? ''}
        showPronunciation={showPronunciation}
        onLessonChange={goToLesson}
        onTogglePronunciation={() =>
          setPronunciationParam(!showPronunciation)
        }
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
};

function AppLayout() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/lesson/${defaultLessonId}`} replace />}
      />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route
        path="*"
        element={<Navigate to={`/lesson/${defaultLessonId}`} replace />}
      />
    </Routes>
  );
}

export default AppLayout;
