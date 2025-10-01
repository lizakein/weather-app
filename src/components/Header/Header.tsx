import type { Dispatch, SetStateAction } from "react";
import { UnitsDropdown } from "./UnitsDropdown";
import LogoIcon from "../../assets/images/logo.svg";
import type { UnitsState } from "../../types/unitsState";
import "./Header.css";

interface HeaderProps {
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function Header({ units, setUnits }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__top">
        <img src={LogoIcon} alt='Weather Now logo' className="header__logo-icon"/>

        <div className="header__actions">
          <UnitsDropdown units={units} setUnits={setUnits} />
        </div>
      </div>
    </header>
  );
}