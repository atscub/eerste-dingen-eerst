import { z } from 'zod';

// =============================================================================
// BASE SCHEMAS
// =============================================================================

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

// =============================================================================
// DIALOGUE SECTION
// =============================================================================

const dialogueLineSchema = z.object({
  text: z.string(),
  speaker: z.string().optional(),
  translation: z.string().optional(),
});

const dialogueSectionSchema = z.object({
  type: z.literal('dialogue'),
  title: z.string().optional(),
  lines: z.array(dialogueLineSchema),
  images: z.array(imageSchema).default([]),
});

// =============================================================================
// READING SECTION (narrative text without speakers)
// =============================================================================

const readingSectionSchema = z.object({
  type: z.literal('reading'),
  title: z.string().optional(),
  headerImage: imageSchema.optional(),
  paragraphs: z.array(
    z.object({
      text: z.string(),
      translation: z.string().optional(),
    })
  ),
});

// =============================================================================
// VOCABULARY SECTION (simple numbered items)
// =============================================================================

const vocabularyItemSchema = z.object({
  number: z.number().optional(),
  dutch: z.string(),
  english: z.string().optional(),
  spanish: z.string().optional(),
  description: z.string().optional(),
  illustration: z.string().optional(),
});

const vocabularySectionSchema = z.object({
  type: z.literal('vocabulary'),
  title: z.string().optional(),
  prompt: z.string().optional(), // e.g., "Is this your...?"
  items: z.array(vocabularyItemSchema),
});

// =============================================================================
// VOCABULARY GROUP SECTION (grouped items with shared prompts)
// e.g., Lesson 30: "Open/Shut your" -> [mouth, bag, window, box]
// =============================================================================

const vocabularyGroupSchema = z.object({
  prompt: z.string(), // e.g., "Open/Shut your"
  items: z.array(
    z.object({
      number: z.number().optional(),
      dutch: z.string(),
      english: z.string().optional(),
      spanish: z.string().optional(),
      illustration: z.string().optional(),
    })
  ),
});

const vocabularyGroupSectionSchema = z.object({
  type: z.literal('vocabularyGroup'),
  title: z.string().optional(),
  groups: z.array(vocabularyGroupSchema),
});

// =============================================================================
// VOCABULARY TABLE SECTION (tabular layout with categories)
// e.g., Lesson 70: days of week with shops, months with dates, etc.
// =============================================================================

const vocabularyTableRowSchema = z.object({
  category: z.string().optional(), // e.g., "ON", "IN", "AT"
  items: z.array(
    z.object({
      number: z.number().optional(),
      label: z.string(), // e.g., "Monday", "January"
      dutch: z.string().optional(),
      english: z.string().optional(),
      spanish: z.string().optional(),
      illustration: z.string().optional(),
    })
  ),
});

const vocabularyTableSectionSchema = z.object({
  type: z.literal('vocabularyTable'),
  title: z.string().optional(),
  rows: z.array(vocabularyTableRowSchema),
});

// =============================================================================
// PRACTICE SECTION (items with patterns/questions)
// e.g., Lesson 20: "They're clean" with illustrations
// =============================================================================

const practiceItemSchema = z.object({
  number: z.number().optional(),
  label: z.string().optional(), // e.g., "105", "106"
  question: z.string().optional(),
  answer: z.string().optional(),
  dutch: z.string().optional(),
  english: z.string().optional(),
  spanish: z.string().optional(),
  illustration: z.string().optional(),
});

const practiceSectionSchema = z.object({
  type: z.literal('practice'),
  title: z.string().optional(),
  prompt: z.string().optional(), // e.g., "They're..."
  items: z.array(practiceItemSchema),
});

// =============================================================================
// GRAMMAR TABLE SECTION (verb conjugations, etc.)
// =============================================================================

const grammarTableSectionSchema = z.object({
  type: z.literal('grammarTable'),
  title: z.string().optional(),
  columns: z.array(z.string()), // e.g., ["Base", "Past", "Past Participle"]
  rows: z.array(z.array(z.string())), // e.g., [["cut", "cut", "cut"], ["do", "did", "done"]]
});

// =============================================================================
// PATTERN DRILL SECTION (sentence patterns with transformations)
// e.g., "He says that..." patterns
// =============================================================================

const patternDrillItemSchema = z.object({
  number: z.number().optional(),
  input: z.string().optional(),
  output: z.string().optional(),
  dutch: z.string().optional(),
  english: z.string().optional(),
  spanish: z.string().optional(),
  illustration: z.string().optional(),
});

const patternDrillSectionSchema = z.object({
  type: z.literal('patternDrill'),
  title: z.string().optional(),
  pattern: z.string().optional(), // e.g., "He says that he..."
  inputPrompt: z.string().optional(), // e.g., "is/are feel(s)"
  items: z.array(patternDrillItemSchema),
});

// =============================================================================
// EXERCISE SECTION (various exercise types)
// =============================================================================

const exerciseExampleSchema = z.object({
  input: z.string().optional(),
  output: z.string().optional(),
  dutch: z.string().optional(),
  spanish: z.string().optional(),
  handwritten: z.boolean().optional(), // Display in handwriting style
});

const exerciseItemSchema = z.object({
  text: z.string(),
  answer: z.string().optional(),
  spanish: z.string().optional(),
});

const exerciseSectionSchema = z.object({
  type: z.literal('exercise'),
  title: z.string().optional(),
  exerciseType: z.enum(['copy', 'fillIn', 'transform', 'rewrite', 'comprehension', 'general']).default('general'),
  instruction: z.string(),
  instruction2: z.string().optional(), // Secondary instruction
  wordsToUse: z.array(z.string()).optional(), // e.g., ["He's", "She's", "It's"]
  example: z.array(exerciseExampleSchema).optional(),
  items: z.array(exerciseItemSchema).optional(),
});

// =============================================================================
// SECTION UNION
// =============================================================================

const sectionSchema = z.discriminatedUnion('type', [
  dialogueSectionSchema,
  readingSectionSchema,
  vocabularySectionSchema,
  vocabularyGroupSectionSchema,
  vocabularyTableSectionSchema,
  practiceSectionSchema,
  grammarTableSectionSchema,
  patternDrillSectionSchema,
  exerciseSectionSchema,
]);

// =============================================================================
// LESSON SCHEMA (flexible container for sections)
// =============================================================================

const lessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  sections: z.array(sectionSchema).min(1),
});

// =============================================================================
// COURSE & PRONUNCIATION SCHEMAS (unchanged)
// =============================================================================

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

// =============================================================================
// EXPORTS
// =============================================================================

export {
  courseSchema,
  lessonSchema,
  pronunciationGuideSchema,
  // Section schemas for individual use
  dialogueSectionSchema,
  readingSectionSchema,
  vocabularySectionSchema,
  vocabularyGroupSectionSchema,
  vocabularyTableSectionSchema,
  practiceSectionSchema,
  grammarTableSectionSchema,
  patternDrillSectionSchema,
  exerciseSectionSchema,
  sectionSchema,
  // Item schemas
  imageSchema,
  dialogueLineSchema,
  vocabularyItemSchema,
  practiceItemSchema,
  exerciseExampleSchema,
  exerciseItemSchema,
};
