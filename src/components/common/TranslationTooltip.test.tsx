import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TranslationTooltip from './TranslationTooltip';

describe('TranslationTooltip', () => {
  it('renders nothing without a translation', () => {
    const { container } = render(<TranslationTooltip />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a tooltip when translation is provided', () => {
    render(<TranslationTooltip translation="Hello" />);

    const button = screen.getByRole('button', { name: /ver tradu/i });
    const tooltip = button.parentElement;

    expect(tooltip).toHaveAttribute('data-tip', 'Hello');
  });
});
