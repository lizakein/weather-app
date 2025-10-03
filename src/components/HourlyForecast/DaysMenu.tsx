import { OptionsWindow } from "../../shared/OptionsWindow";
import type { MenuPosition } from "../../hooks/useContextMenu";
import "./DaysMenu.css";
import { useEffect, useRef } from "react";

interface DaysMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
  days: Date[];
  onSelectDay: (day: Date) => void;
};

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export function DaysMenu({ menuPosition, closeMenu, days, onSelectDay }: DaysMenuProps) {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  return (
    <OptionsWindow position={menuPosition} onClose={closeMenu}>
      <ul 
        id="days-menu" 
        className="hourly-forecast__menu"
        role="menu"
      >
        {days.map((date, index) => (
          <li key={date.toISOString()}>
            <button
              ref={ index === 0 ? firstButtonRef : null }
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