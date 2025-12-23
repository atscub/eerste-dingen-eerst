import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AudioButton from './AudioButton';

describe('AudioButton', () => {
  it('uses speechSynthesis when available', async () => {
    const user = userEvent.setup();
    class FakeUtterance {
      text: string;
      lang = '';
      rate = 1;
      onstart?: () => void;
      onend?: () => void;
      onerror?: () => void;

      constructor(text: string) {
        this.text = text;
      }
    }

    const cancel = vi.fn();
    const speak = vi.fn((utterance: FakeUtterance) => {
      utterance.onstart?.();
      utterance.onend?.();
    });

    Object.defineProperty(window, 'speechSynthesis', {
      value: { cancel, speak },
      configurable: true,
    });
    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
      value: FakeUtterance,
      configurable: true,
    });

    render(<AudioButton text="Hallo" />);

    await user.click(screen.getByRole('button', { name: /escuchar/i }));

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(speak).toHaveBeenCalledTimes(1);
    const utterance = speak.mock.calls[0][0] as FakeUtterance;
    expect(utterance.text).toBe('Hallo');
    expect(utterance.lang).toBe('nl-NL');
    expect(utterance.rate).toBe(0.85);
  });

  it('alerts when speechSynthesis is unavailable', async () => {
    const user = userEvent.setup();
    const alert = vi.fn();

    const windowWithSpeech = window as unknown as Record<string, unknown>;
    delete windowWithSpeech.speechSynthesis;
    Object.defineProperty(window, 'alert', {
      value: alert,
      configurable: true,
    });

    render(<AudioButton text="Hallo" />);

    await user.click(screen.getByRole('button', { name: /escuchar/i }));

    expect(alert).toHaveBeenCalledTimes(1);
  });
});
