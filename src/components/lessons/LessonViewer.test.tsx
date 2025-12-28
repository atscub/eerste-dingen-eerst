import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Lesson } from '../../types/lessons';
import LessonViewer from './LessonViewer';

const dialogueLesson: Lesson = {
  id: 1,
  title: 'Intro',
  sections: [
    {
      type: 'dialogue',
      lines: [
        {
          text: 'Hallo',
          speaker: 'Ana',
        },
      ],
      images: [
        {
          src: '/img/scene-1.png',
          alt: 'Scene 1',
        },
      ],
    },
  ],
};

const vocabularyLesson: Lesson = {
  id: 2,
  title: 'Words',
  sections: [
    {
      type: 'vocabulary',
      items: [
        {
          number: 1,
          dutch: 'Hoi',
          english: 'Hi',
          illustration: '/wave.png',
        },
      ],
    },
  ],
};

const practiceLesson: Lesson = {
  id: 3,
  title: 'Practice',
  sections: [
    {
      type: 'practice',
      items: [
        {
          number: 1,
          question: 'Hoe gaat het?',
          spanish: 'How are you?',
          illustration: '/greeting.png',
        },
      ],
    },
  ],
};

const readingLesson: Lesson = {
  id: 4,
  title: 'Reading',
  sections: [
    {
      type: 'reading',
      title: 'Grammar',
      paragraphs: [
        { text: 'Basic grammar rules' },
        { text: 'Example one' },
      ],
    },
    {
      type: 'exercise',
      exerciseType: 'general',
      instruction: 'Complete the sentence',
      example: [
        {
          dutch: 'Ik ben student.',
          spanish: 'Soy estudiante.',
        },
      ],
    },
  ],
};

describe('LessonViewer', () => {
  it('renders dialogue lessons', () => {
    render(<LessonViewer lesson={dialogueLesson} />);

    expect(screen.getByText('Hallo')).toBeInTheDocument();
    expect(screen.getByAltText('Scene 1')).toBeInTheDocument();
  });

  it('renders vocabulary lessons', () => {
    render(<LessonViewer lesson={vocabularyLesson} />);

    expect(screen.getByText('Hoi')).toBeInTheDocument();
  });

  it('renders practice lessons', () => {
    render(<LessonViewer lesson={practiceLesson} />);

    expect(screen.getByText('Hoe gaat het?')).toBeInTheDocument();
  });

  it('renders reading lessons with exercise', () => {
    render(<LessonViewer lesson={readingLesson} />);

    expect(screen.getByText('Basic grammar rules')).toBeInTheDocument();
    expect(screen.getByText('Ik ben student.')).toBeInTheDocument();
  });

  it('renders nothing when lesson is missing', () => {
    const { container } = render(<LessonViewer lesson={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
