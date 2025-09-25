import type { MenuPosition } from "../../hooks/useContextMenu";
import { OptionsWindow } from "../../shared/OptionsWindow";

interface UnitsMenuProps {
  menuPosition: MenuPosition;
  closeMenu: () => void;
};

export function UnitsMenu({ menuPosition, closeMenu }: UnitsMenuProps) {
  return (
    <OptionsWindow position={menuPosition!} onClose={closeMenu}>
      <div 
        id="units-menu"
        className="units-window"
        role="menu"
        aria-label="Units settings"
      >
        <button className="units-window__switch" role="menuitem">Switch to Imperial</button>

        <p className="units-window__section">Temperature</p>
        <div 
          className="units-window__group" 
          role="radiogroup"
          aria-label="Temperature units"
        >
          <button 
            className="units-window__option" 
            role="radio" 
            aria-checked="true"
          >
            Celsius (°C)
          </button>
          <button 
            className="units-window__option" 
            role="radio" 
            aria-checked="false"
          >
            Fahrenheit (°F)
          </button>
        </div>
        
        <p className="units-window__section">Wind Speed</p>
        <div 
          className="units-window__group" 
          role="radiogroup"
          aria-label="Wind speed units"
        >
          <button 
            className="units-window__option" 
            role="radio" 
            aria-checked="true"
          >
            km/h
          </button>
          <button 
            className="units-window__option" 
            role="radio" 
            aria-checked="false"
          >
            mph
          </button>
        </div>
        
        <p className="units-window__section">Precipitation</p>
        <div 
          className="units-window__group" 
          role="radiogroup"
          aria-label="Precipitation units"
        >
          <button
            className="units-window__option" 
            role="radio" 
            aria-checked="true"
          >
            Millimeters (mm)
          </button>
          <button
            className="units-window__option" 
            role="radio" 
            aria-checked="false"
          >
            Inches (in)
          </button>
        </div>       
      </div>
    </OptionsWindow>
  );
}