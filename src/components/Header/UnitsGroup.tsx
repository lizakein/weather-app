import type { UnitOption } from "../../config/unitsConfig";

interface UnitsGroupProps {
  id: string;
  section: string;
  ariaLabel: string;
  options: UnitOption[];
  selected: string;
  onSelect: (groupId: string, value: string) => void;
};

export function UnitsGroup({ id, section, ariaLabel, options, selected, onSelect }: UnitsGroupProps) {
  return (
    <>
      <p className="units-window__section">{section}</p>
      <div 
        className="units-window__group" 
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {options.map(opt => (
          <button 
            key={opt.value}
            className="units-window__option" 
            role="radio" 
            aria-checked={selected === opt.value}
            onClick={() => onSelect(id, opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </>   
  );
}