import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route('lesson/:lessonId', 'routes/lesson.tsx'),
  route('*', 'routes/catchall.tsx'),
] satisfies RouteConfig;
