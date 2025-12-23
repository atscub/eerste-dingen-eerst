import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Lesson } from '../../types/lessons';
import AppHeader from './AppHeader';

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Intro',
    type: 'dialogue',
    dialogue: {
      lines: [],
      images: [],
    },
  },
  {
    id: 2,
    title: 'Saludos',
    subtitle: 'Basico',
    type: 'dialogue',
    dialogue: {
      lines: [],
      images: [],
    },
  },
];

describe('AppHeader', () => {
  it('calls onLessonChange when selecting a lesson', async () => {
    const user = userEvent.setup();
    const onLessonChange = vi.fn();

    render(
      <AppHeader
        courseTitle="Curso"
        courseSubtitle="Subtitulo"
        lessons={lessons}
        currentLessonId={1}
        showPronunciation={false}
        onLessonChange={onLessonChange}
        onTogglePronunciation={vi.fn()}
      />
    );

    const lessonSelect = screen.getByRole('combobox');
    await user.selectOptions(lessonSelect, '2');

    expect(onLessonChange).toHaveBeenCalledWith(2);
  });

  it('calls onTogglePronunciation and reflects label state', async () => {
    const user = userEvent.setup();
    const onTogglePronunciation = vi.fn();

    const { rerender } = render(
      <AppHeader
        courseTitle="Curso"
        courseSubtitle="Subtitulo"
        lessons={lessons}
        currentLessonId={1}
        showPronunciation={false}
        onLessonChange={vi.fn()}
        onTogglePronunciation={onTogglePronunciation}
      />
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveTextContent('Ver');
    await user.click(toggleButton);

    expect(onTogglePronunciation).toHaveBeenCalledTimes(1);

    rerender(
      <AppHeader
        courseTitle="Curso"
        courseSubtitle="Subtitulo"
        lessons={lessons}
        currentLessonId={1}
        showPronunciation={true}
        onLessonChange={vi.fn()}
        onTogglePronunciation={onTogglePronunciation}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Ocultar');
  });
});
