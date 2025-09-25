import { useState } from "react";
import { UNITS_CONFIG } from "../../config/unitsConfig";
import type { MenuPosition } from "../../hooks/useContextMenu";
import { OptionsWindow } from "../../shared/OptionsWindow";
import { UnitsGroup } from "./UnitsGroup";

interface UnitsMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
};

export function UnitsMenu({ menuPosition, closeMenu }: UnitsMenuProps) {
  const [ selected, setSelected ] = useState({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm"
  });

  const handleSelect = (groupId: string, value: string) => {
    setSelected(prev => ({ ...prev, [groupId]: value }))
  };

  return (
    <OptionsWindow position={menuPosition!} onClose={closeMenu}>
      <div 
        id="units-menu"
        className="units-window"
        role="menu"
        aria-label="Units settings"
      >
        <button className="units-window__switch" role="menuitem">Switch to Imperial</button>

        {UNITS_CONFIG.map(group => (
          <UnitsGroup 
            key={group.id}
            id={group.id}
            section={group.section}
            ariaLabel={group.ariaLabel}
            options={group.options}
            selected={selected[group.id as keyof typeof selected]}
            onSelect={handleSelect}
          />
        ))}
      </div>  
    </OptionsWindow>
  );
}