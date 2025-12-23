import lessonsDataRaw from './lessons.json';
import type { CourseData, Lesson } from '../types/lessons';

export const lessonsData = lessonsDataRaw as CourseData;
export const lessons: Lesson[] = lessonsData.lessons;
export const defaultLessonId = lessons[0]?.id ?? 1;
