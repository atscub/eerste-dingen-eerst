import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Lesson } from '../../types/lessons';
import LessonViewer from './LessonViewer';

const dialogueLesson: Lesson = {
  id: 1,
  title: 'Intro',
  type: 'dialogue',
  dialogue: {
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
};

const vocabularyLesson: Lesson = {
  id: 2,
  title: 'Words',
  type: 'vocabulary',
  items: [
    {
      number: 1,
      dutch: 'Hoi',
      english: 'Hi',
      illustration: 'wave',
    },
  ],
};

const practiceLesson: Lesson = {
  id: 3,
  title: 'Practice',
  type: 'practice',
  items: [
    {
      number: 1,
      question: 'Hoe gaat het?',
      translation: 'How are you?',
      illustration: 'greeting',
    },
  ],
};

describe('LessonViewer', () => {
  it('renders dialogue lessons', () => {
    render(<LessonViewer lesson={dialogueLesson} />);

    expect(screen.getByText('Dialogues')).toBeInTheDocument();
    expect(screen.getByText('Hallo')).toBeInTheDocument();
    expect(screen.getByAltText('Scene 1')).toBeInTheDocument();
  });

  it('renders vocabulary lessons', () => {
    render(<LessonViewer lesson={vocabularyLesson} />);

    expect(screen.getByText('Vocabulario')).toBeInTheDocument();
    expect(screen.getByText('Hoi')).toBeInTheDocument();
  });

  it('renders practice lessons', () => {
    render(<LessonViewer lesson={practiceLesson} />);

    expect(screen.getByText('Hoe gaat het?')).toBeInTheDocument();
    expect(screen.getByText(/Pr.ctica/)).toBeInTheDocument();
  });

  it('renders nothing when lesson is missing', () => {
    const { container } = render(<LessonViewer lesson={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
