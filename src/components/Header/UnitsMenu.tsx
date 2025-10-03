import { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { UNITS_CONFIG } from "../../config/unitsConfig";
import type { MenuPosition } from "../../hooks/useContextMenu";
import { OptionsWindow } from "../../shared/OptionsWindow";
import type { UnitsState } from "../../types/unitsState";
import { UnitsGroup } from "./UnitsGroup";
import "./UnitsMenu.css";

interface UnitsMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function UnitsMenu({ menuPosition, closeMenu, units, setUnits }: UnitsMenuProps) {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);
  
  const handleSelect = useCallback(
    (groupId: keyof UnitsState, value: string) => {
      setUnits(prev => ({ ...prev, [groupId]: value }));
    },
    [setUnits]
  );

  const handleSwitch = useCallback(() => {
    setUnits(
      units.temperature === 'celsius' ?
      { temperature: 'fahrenheit', wind: 'mph', precipitation: 'inch'} :
      { temperature: 'celsius', wind: 'kmh', precipitation: 'mm'}
    );
  }, [setUnits, units.temperature]);

  return (
    <OptionsWindow position={menuPosition} onClose={closeMenu}>
      <div 
        id="units-menu"
        className="units-window"
        role="menu"
        aria-label="Units settings"
      >
        <button 
          ref={firstButtonRef}
          className="units-window__switch" 
          role="menuitem"
          onClick={handleSwitch}
        >
          Switch to {units.temperature === 'celsius' ? 'Imperial' : 'Metric'}
        </button>

        {UNITS_CONFIG.map(group => (
          <UnitsGroup 
            key={group.id}
            id={group.id as keyof UnitsState}
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