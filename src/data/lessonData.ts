import courseDataRaw from './course.json';
import { courseSchema, lessonSchema } from './lessonSchemas';
import type { CourseData } from '../types/lessons';

export const lessonsData = courseSchema.parse(courseDataRaw) as CourseData;

const lessonModules = import.meta.glob<{ default: unknown }>(
  './lessons/lesson_*.json',
  { eager: true }
);

export const lessons = Object.entries(lessonModules)
  .map(([path, module]) => {
    const rawLesson = module.default ?? module;
    const parsed = lessonSchema.safeParse(rawLesson);

    if (!parsed.success) {
      throw new Error(
        `Invalid lesson data in ${path}: ${parsed.error.message}`
      );
    }

    return parsed.data;
  })
  .sort((a, b) => a.id - b.id);

export const defaultLessonId = lessons[0]?.id ?? 1;
