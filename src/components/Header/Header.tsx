import LogoIcon from "../../assets/images/logo.svg";
import UnitsIcon from "../../assets/images/icon-units.svg";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";
import "./Header.css";
import { OptionsWindow } from "../../shared/OptionsWindow";
import { useContextMenu } from "../../hooks/useContextMenu";

export function Header() {
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  
  return (
    <header className="header">
      <div className="header__top">
        <img src={LogoIcon} alt='Weather Now logo' className="header__logo-icon"/>

        <div className="header__actions">
          <button
            className="header__units-button"
            aria-haspopup="true"
            aria-expanded={ openId === "units" }
            aria-controls="units-menu"
            onClick={e => handleMoreClick(e, "units")}
          >
            <img src={UnitsIcon} alt="" className="header__units-icon" />
            <span className="header__units-text">Units</span>
            <img src={DropDownIcon} alt="" className="header__dropdown-icon"/> 
          </button>
        </div>

        { openId === "units" && menuPosition &&
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
        }
        
      </div>

      
      <h1 className="header__title">How's the sky looking today?</h1>
    </header>
  );
}