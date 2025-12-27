import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Lesson, LessonType } from '../../types/lessons';
import LessonHeader from './LessonHeader';

const buildLesson = (type: LessonType): Lesson => {
  if (type === 'dialogue') {
    return {
      id: 1,
      title: 'Lesson One',
      type,
      dialogue: {
        lines: [],
        images: [],
      },
    };
  }

  if (type === 'vocabulary') {
    return {
      id: 2,
      title: 'Lesson Two',
      type,
      items: [
        {
          number: 1,
          dutch: 'Hallo',
          illustration: 'wave',
        },
      ],
    };
  }

  if (type === 'practice') {
    return {
      id: 3,
      title: 'Lesson Three',
      type,
      items: [
        {
          number: 1,
          question: 'Hoe gaat het?',
          translation: 'How are you?',
          illustration: 'greeting',
        },
      ],
    };
  }

  return {
    id: 4,
    title: 'Lesson Four',
    type,
    grammar: {
      explanation: 'Basic grammar',
      examples: ['Example one'],
    },
  };
};

describe('LessonHeader', () => {
  it('renders labels for lesson types', () => {
    const { rerender } = render(<LessonHeader lesson={buildLesson('dialogue')} />);
    expect(screen.getByText(/Di.logo/)).toBeInTheDocument();

    rerender(<LessonHeader lesson={buildLesson('vocabulary')} />);
    expect(screen.getByText('Vocabulario')).toBeInTheDocument();

    rerender(<LessonHeader lesson={buildLesson('practice')} />);
    expect(screen.getByText(/Pr.ctica/)).toBeInTheDocument();

    rerender(<LessonHeader lesson={buildLesson('grammar')} />);
    expect(screen.getByText(/Gram.tica/)).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    const lesson = {
      ...buildLesson('dialogue'),
      subtitle: 'Short subtitle',
    };

    render(<LessonHeader lesson={lesson} />);

    expect(screen.getByText('Short subtitle')).toBeInTheDocument();
  });
});
