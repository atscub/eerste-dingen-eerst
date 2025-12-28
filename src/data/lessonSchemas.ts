import { z } from 'zod';

const dialogueLineSchema = z.object({
  text: z.string(),
  speaker: z.string().optional(),
  translation: z.string().optional(),
});

const dialogueImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const dialogueLessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.literal('dialogue'),
  dialogue: z.object({
    lines: z.array(dialogueLineSchema),
    headerImage: dialogueImageSchema.optional(),
    images: z.array(dialogueImageSchema),
  }),
});

const vocabularyItemSchema = z.object({
  number: z.number(),
  dutch: z.string(),
  english: z.string().optional(),
  spanish: z.string().optional(),
  description: z.string().optional(),
  illustration: z.string(),
});

const exerciseExampleSchema = z.object({
  incomplete: z.string().optional(),
  complete: z.string().optional(),
  dutch: z.string().optional(),
  spanish: z.string().optional(),
});

const exerciseItemSchema = z.object({
  text: z.string(),
  answer: z.string(),
  spanish: z.string().optional(),
});

const exerciseSentenceSchema = z.object({
  dutch: z.string(),
  spanish: z.string().optional(),
});

const vocabularyLessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.literal('vocabulary'),
  items: z.array(vocabularyItemSchema),
  exercise: z
    .object({
      instruction: z.string(),
      example: z.array(exerciseExampleSchema).optional(),
      instruction2: z.string().optional(),
      exercises: z.array(exerciseItemSchema).optional(),
      sentences: z.array(exerciseSentenceSchema).optional(),
    })
    .optional(),
});

const practiceLessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.literal('practice'),
  items: z
    .array(
      z.object({
        number: z.number(),
        question: z.string(),
        translation: z.string(),
        illustration: z.string(),
      })
    )
    .default([]),
  exercise: z
    .object({
      instruction: z.string(),
      example: z.array(exerciseExampleSchema).optional(),
    })
    .optional(),
});

const grammarLessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.literal('grammar'),
  grammar: z.object({
    explanation: z.string(),
    examples: z.array(z.string()),
  }),
  exercise: z
    .object({
      instruction: z.string(),
      example: z.array(exerciseExampleSchema).optional(),
    })
    .optional(),
});

const pronunciationTipSchema = z.object({
  letter: z.string(),
  description: z.string(),
  examples: z.array(z.string()),
  spanish: z.string(),
});

const pronunciationGuideSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  tips: z.array(pronunciationTipSchema),
});

const courseSchema = z.object({
  courseTitle: z.string(),
  courseSubtitle: z.string(),
  pronunciation: pronunciationGuideSchema,
});

const lessonSchema = z.discriminatedUnion('type', [
  dialogueLessonSchema,
  vocabularyLessonSchema,
  practiceLessonSchema,
  grammarLessonSchema,
]);

export {
  courseSchema,
  dialogueLessonSchema,
  grammarLessonSchema,
  lessonSchema,
  practiceLessonSchema,
  pronunciationGuideSchema,
  vocabularyLessonSchema,
};
