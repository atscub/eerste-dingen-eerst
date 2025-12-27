import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseSchema, lessonSchema } from '../src/data/lessonSchemas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const readJson = async (filePath: string) => {
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as unknown;
};

const formatIssues = (issues: { path: (string | number)[]; message: string }[]) =>
  issues
    .map((issue) => {
      const pathLabel = issue.path.length ? issue.path.join('.') : '(root)';
      return `${pathLabel}: ${issue.message}`;
    })
    .join('\n');

const validateCourse = async () => {
  const coursePath = path.join(rootDir, 'src', 'data', 'course.json');
  const lessonsDir = path.join(rootDir, 'src', 'data', 'lessons');

  const courseData = await readJson(coursePath);
  const courseResult = courseSchema.safeParse(courseData);
  if (!courseResult.success) {
    throw new Error(
      `Invalid course data in ${coursePath}\n${formatIssues(
        courseResult.error.issues
      )}`
    );
  }

  const lessonFiles = (await readdir(lessonsDir))
    .filter((filename) => filename.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b));

  if (lessonFiles.length === 0) {
    throw new Error(`No lesson files found in ${lessonsDir}`);
  }

  for (const filename of lessonFiles) {
    const filePath = path.join(lessonsDir, filename);
    const lessonData = await readJson(filePath);
    const lessonResult = lessonSchema.safeParse(lessonData);
    if (!lessonResult.success) {
      throw new Error(
        `Invalid lesson data in ${filePath}\n${formatIssues(
          lessonResult.error.issues
        )}`
      );
    }
  }
};

validateCourse().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
