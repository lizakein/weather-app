import { type Dispatch, type SetStateAction } from "react";
import { UNITS_CONFIG } from "../../config/unitsConfig";
import type { MenuPosition } from "../../hooks/useContextMenu";
import { OptionsWindow } from "../../shared/OptionsWindow";
import { UnitsGroup } from "./UnitsGroup";
import "./UnitsMenu.css";
import type { UnitsState } from "../../types/unitsState";

interface UnitsMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function UnitsMenu({ menuPosition, closeMenu, units, setUnits }: UnitsMenuProps) {
  const handleSelect = (groupId: string, value: string) => {
    setUnits(prev => ({ ...prev, [groupId]: value }))
  };

  return (
    <OptionsWindow position={menuPosition!} onClose={closeMenu}>
      <div 
        id="units-menu"
        className="units-window"
        role="menu"
        aria-label="Units settings"
      >
        <button 
          className="units-window__switch" 
          role="menuitem"
          onClick={() => {
            setUnits(
              units.temperature === 'celsius' ?
              { temperature: 'fahrenheit', wind: 'mph', precipitation: 'inch'} :
              { temperature: 'celsius', wind: 'kmh', precipitation: 'mm'}
            );
          }}
        >
          Switch to {units.temperature === 'celsius' ? 'Imperial' : 'Metric'}
        </button>

        {UNITS_CONFIG.map(group => (
          <UnitsGroup 
            key={group.id}
            id={group.id}
            section={group.section}
            ariaLabel={group.ariaLabel}
            options={group.options}
            selected={units[group.id as keyof UnitsState]}
            onSelect={handleSelect}
          />
        ))}
      </div>  
    </OptionsWindow>
  );
}