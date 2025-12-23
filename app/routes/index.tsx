import { redirect } from 'react-router';
import { defaultLessonId } from '../../src/data/lessonData';

export function loader() {
  return redirect(`/lesson/${defaultLessonId}`);
}

export default function IndexRoute() {
  return null;
}
