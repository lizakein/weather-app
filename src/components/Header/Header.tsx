import type { Dispatch, SetStateAction } from "react";
import { useContextMenu } from "../../hooks/useContextMenu";
import { UnitsMenu } from "./UnitsMenu";
import LogoIcon from "../../assets/images/logo.svg";
import UnitsIcon from "../../assets/images/icon-units.svg";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";
import type { UnitsState } from "../../types/unitsState";
import "./Header.css";

interface HeaderProps {
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function Header({ units, setUnits }: HeaderProps) {
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

        { openId === "units" && menuPosition && (
          <UnitsMenu 
            menuPosition={menuPosition} 
            closeMenu={closeMenu} 
            units={units}
            setUnits={setUnits}
          />
        )} 
      </div>
    </header>
  );
}