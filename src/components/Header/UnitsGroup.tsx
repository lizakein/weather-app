import type { UnitOption } from "../../config/unitsConfig";
import CheckmarkIcon from "../../assets/images/icon-checkmark.svg";
import type { UnitsState } from "../../types/unitsState";
import React, { useRef } from "react";

interface UnitsGroupProps {
  id: keyof UnitsState;
  section: string;
  ariaLabel: string;
  options: UnitOption[];
  selected: string;
  onSelect: (groupId: keyof UnitsState, value: string) => void;
};

export function UnitsGroup({ id, section, ariaLabel, options, selected, onSelect }: UnitsGroupProps) {
  const optionRefs = useRef<HTMLDivElement[]>([]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    const curDiv = optionRefs.current[index];
    const button = curDiv?.querySelector<HTMLButtonElement>("button");

    if (e.key === "Enter" && button) {
      button.click();
      e.preventDefault();
    }
  }
  return (
    <>
      <p className="units-window__section">{section}</p>
      <div 
        className="units-window__group" 
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {options.map((opt, index) => {
          const isSelected = selected === opt.value;

          return (
            <div 
              key={opt.value} 
              className={`units-window__option ${isSelected ? "units-window__option--selected" : ""}`}
              tabIndex={0}
              ref={el => { optionRefs.current[index] = el!; }}
              onKeyDown={e => handleKeyDown(index, e)}
            >
              <button       
                className="units-window__button" 
                role="radio" 
                aria-checked={isSelected}
                onClick={() => onSelect(id, opt.value)}
                tabIndex={-1}
              >
                {opt.label}
              </button>

              { isSelected && <img src={CheckmarkIcon} alt=""  /> }
            </div>
          );
        })}
      </div>
    </>   
  );
}