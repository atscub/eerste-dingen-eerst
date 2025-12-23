import { Languages } from 'lucide-react';

type TranslationTooltipProps = {
  translation?: string | null;
};

const TranslationTooltip = ({ translation }: TranslationTooltipProps) => {
  if (!translation) return null;

  return (
    <div className="tooltip tooltip-left" data-tip={translation}>
      <button type="button" className="btn btn-ghost btn-xs" aria-label="Ver traducción">
        <Languages size={14} />
      </button>
    </div>
  );
};

export default TranslationTooltip;
