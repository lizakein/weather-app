import type { UnitOption } from "../../config/unitsConfig";
import CheckmarkIcon from "../../assets/images/icon-checkmark.svg";
import type { UnitsState } from "../../types/unitsState";

interface UnitsGroupProps {
  id: keyof UnitsState;
  section: string;
  ariaLabel: string;
  options: UnitOption[];
  selected: string;
  onSelect: (groupId: keyof UnitsState, value: string) => void;
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
        {options.map(opt => {
          const isSelected = selected === opt.value;

          return (
            <div 
              key={opt.value} 
              className={`units-window__option ${isSelected ? "units-window__option--selected" : ""}`}
            >
              <button       
                className="units-window__button" 
                role="radio" 
                aria-checked={isSelected}
                onClick={() => onSelect(id, opt.value)}
              >
                {opt.label}
              </button>

              { isSelected && <img src={CheckmarkIcon} alt="" /> }
            </div>
          );
        })}
      </div>
    </>   
  );
}