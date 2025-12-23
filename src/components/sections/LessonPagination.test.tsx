import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LessonPagination from './LessonPagination';

describe('LessonPagination', () => {
  it('disables previous button and calls next', async () => {
    const user = userEvent.setup();
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <LessonPagination
        currentLessonId={1}
        totalLessons={10}
        hasPrev={false}
        hasNext={true}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Anterior' });
    const nextButton = screen.getByRole('button', { name: 'Siguiente' });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();

    await user.click(prevButton);
    await user.click(nextButton);

    expect(onPrev).not.toHaveBeenCalled();
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
