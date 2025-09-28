import { OptionsWindow } from "../../shared/OptionsWindow";
import type { MenuPosition } from "../../hooks/useContextMenu";
import "./DaysMenu.css";

interface DaysMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
  days: Date[];
  onSelectDay: (day: Date) => void;
};

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export function DaysMenu({ menuPosition, closeMenu, days, onSelectDay }: DaysMenuProps) {

  return (
    <OptionsWindow position={menuPosition!} onClose={closeMenu}>
      <ul 
        id="days-menu" 
        className="hourly-forecast__menu"
        role="menu"
      >
        {days.map((date, i) => (
          <li key={i}>
            <button
              className="hourly-forecast__menu-item"
              role="menuitem"
              onClick={() => {
                onSelectDay(date);
                closeMenu();
              }}
            >
              {daysOfWeek[date.getDay()]}
            </button>
          </li>
        ))}
      </ul>
    </OptionsWindow>
  );
}