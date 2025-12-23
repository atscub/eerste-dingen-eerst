import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PronunciationGuideData } from '../../types/lessons';
import PronunciationGuide from './PronunciationGuide';

const guideData: PronunciationGuideData = {
  title: 'Sound Guide',
  subtitle: 'Practice the hard G',
  tips: [
    {
      letter: 'G',
      description: 'G as a guttural sound',
      examples: ['gato', 'gente'],
      spanish: 'similar al sonido fuerte',
    },
  ],
};

describe('PronunciationGuide', () => {
  it('renders title, tips, and examples', () => {
    render(<PronunciationGuide data={guideData} />);

    expect(screen.getByText('Sound Guide')).toBeInTheDocument();
    expect(screen.getByText('Practice the hard G')).toBeInTheDocument();
    expect(screen.getByText('G as a guttural sound')).toBeInTheDocument();
    expect(screen.getByText('gato')).toBeInTheDocument();
    expect(screen.getByText('gente')).toBeInTheDocument();
  });
});
