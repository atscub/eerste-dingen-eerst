import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Lesson } from '../../types/lessons';
import LessonHeader from './LessonHeader';

const buildLesson = (): Lesson => {
  return {
    id: 1,
    title: 'Lesson One',
    sections: [
      {
        type: 'dialogue',
        lines: [],
        images: [],
      },
    ],
  };
};

describe('LessonHeader', () => {
  it('renders the lesson title', () => {
    render(<LessonHeader lesson={buildLesson()} />);
    expect(screen.getByText('Lesson One')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    const lesson = {
      ...buildLesson(),
      subtitle: 'Short subtitle',
    };

    render(<LessonHeader lesson={lesson} />);

    expect(screen.getByText('Short subtitle')).toBeInTheDocument();
  });
});
