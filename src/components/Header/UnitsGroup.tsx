import type { UnitOption } from "../../config/unitsConfig";
import CheckmarkIcon from "../../assets/images/icon-checkmark.svg";

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
          <div className="units-window__option">
            <button 
              key={opt.value}
              className="units-window__button" 
              role="radio" 
              aria-checked={selected === opt.value}
              onClick={() => onSelect(id, opt.value)}
            >
              {opt.label}
            </button>

            { selected === opt.value && <img src={CheckmarkIcon} alt="" /> }
          </div>         
        ))}
      </div>
    </>   
  );
}