import LogoIcon from "../../assets/images/logo.svg";
import UnitsIcon from "../../assets/images/icon-units.svg";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";

export function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <img src={LogoIcon} alt='' className="header__logo-icon"/>
        <span className="header__logo-text">Weather Now</span>
      </div>

      <div className="header__actions">
        <button
          className="header__units-button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="units-menu"
        >
          <img src={UnitsIcon} alt="" className="header__units-icon" />
          <span className="header__units-text">Units</span>
          <img src={DropDownIcon} alt="" className="header__dropdown-icon"/> 
        </button>
      </div>

      <div 
        id="units-menu"
        className="units-window"
        role="menu"
        aria-label="Units settings"
        hidden
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

      <h1 className="header__title">How's the sky looking today?</h1>
    </header>
  );
}