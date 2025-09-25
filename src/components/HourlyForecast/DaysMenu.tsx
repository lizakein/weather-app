import { OptionsWindow } from "../../shared/OptionsWindow";
import type { MenuPosition } from "../../hooks/useContextMenu";

interface DaysMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
  daysOfWeek: string[];
};

export function DaysMenu({ menuPosition, closeMenu, daysOfWeek }: DaysMenuProps) {
  return (
    <OptionsWindow position={menuPosition!} onClose={closeMenu}>
      <ul 
        id="days-menu" 
        className="hourly-forecast__menu"
        role="menu"
      >
        {daysOfWeek.map(day => (
          <li key={day}>
            <button
              className="hourly-forecast__menu-item"
              role="menuitem"
            >
              {day}
            </button>
          </li>
        ))}
      </ul>
    </OptionsWindow>
  );
}