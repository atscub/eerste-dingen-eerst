# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Eerste Dingen Eerst" is an interactive Dutch language course for Spanish speakers, built with React Router v7 (framework mode) and TypeScript. It follows L.G. Alexander's methodology with lessons containing dialogues, vocabulary, grammar, and practice exercises.

## Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Generate React Router types and run TypeScript type checking
- `npm run test` - Run tests with Vitest
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run checks` - Run all checks (typecheck + test + lint:fix)
- `npm run validate-course` - Validate course and lesson JSON files against Zod schemas

## Architecture

### Routing (React Router v7 Framework Mode)

Routes are defined in `app/routes.ts` using React Router's file-based routing:
- `app/root.tsx` - Root layout with HTML structure, error boundary
- `app/routes/index.tsx` - Redirects to first lesson
- `app/routes/lesson.tsx` - Main lesson page (`/lesson/:lessonId`)
- `app/routes/catchall.tsx` - 404 fallback

### Data Layer

Lesson content is stored as JSON files validated with Zod schemas:
- `src/data/course.json` - Course metadata and pronunciation guide
- `src/data/lessons/lesson_*.json` - Individual lesson files (70+ lessons)
- `src/data/lessonSchemas.ts` - Zod schemas for validation
- `src/data/lessonData.ts` - Loads and validates all lesson data at build time using `import.meta.glob`
- `src/types/lessons.ts` - TypeScript types matching the Zod schemas

### Lesson Types

Four lesson types, each with its own component:
- `dialogue` - Conversational scenes with speaker, text, translation
- `vocabulary` - Numbered vocabulary items with illustrations
- `practice` - Question/answer practice items
- `grammar` - Grammar explanations with examples

The `LessonViewer` component (`src/components/lessons/LessonViewer.tsx`) dispatches to the appropriate lesson type component.

### Component Structure

- `src/components/layout/` - AppHeader, AppFooter
- `src/components/lessons/` - Lesson type components (DialogueLesson, VocabularyLesson, etc.)
- `src/components/sections/` - LessonPagination, PronunciationGuide
- `src/components/common/` - AudioButton (text-to-speech), TranslationTooltip
- `src/pages/lesson.tsx` - Legacy page component (used by src/layout.tsx)

### Styling

- Tailwind CSS v4 with DaisyUI components
- Theme: "silk" (set in `app/root.tsx`)
- CSS entry: `src/index.css`

## Testing

Tests use Vitest with React Testing Library. Test files are co-located with components (`.test.tsx` suffix).

Run a single test file:
```bash
npx vitest run src/components/common/AudioButton.test.tsx
```

Run tests in watch mode:
```bash
npx vitest
```

## Adding New Lessons

1. Create `src/data/lessons/lesson_XXX.json` following existing patterns
2. Use one of the four lesson types: `dialogue`, `vocabulary`, `practice`, `grammar`
3. Run `npm run validate-course` to verify schema compliance
4. Lessons are automatically picked up via `import.meta.glob` pattern
