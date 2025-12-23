import { Navigate, Route, Routes } from 'react-router';
import { defaultLessonId } from './data/lessonData';
import LessonPage from './pages/lesson';

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
