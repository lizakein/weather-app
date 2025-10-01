import { useCallback, type Dispatch, type SetStateAction } from "react";
import { MemoizedUnitsMenu } from "./MemoizedUnitsMenu";
import type { UnitsState } from "../../types/unitsState";
import { useContextMenu } from "../../hooks/useContextMenu";
import UnitsIcon from "../../assets/images/icon-units.svg";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";

interface UnitsDropdownProps {
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
};

export function UnitsDropdown({ units, setUnits }: UnitsDropdownProps) {
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => handleMoreClick(e, "units"),
    [handleMoreClick]
  );

  return (
    <>
      <button
        className="header__units-button"
        aria-haspopup="true"
        aria-expanded={ openId === "units" }
        aria-controls="units-menu"
        onClick={onClick}
      >
        <img 
          src={UnitsIcon} 
          alt=""
          role="presentation"
          className="header__units-icon" 
        />
        <span className="header__units-text">Units</span>
        <img 
          src={DropDownIcon} 
          alt="" 
          role="presentation"
          className="header__dropdown-icon"
        /> 
      </button>

      { openId === "units" && menuPosition && (
        <MemoizedUnitsMenu 
          menuPosition={menuPosition} 
          closeMenu={closeMenu} 
          units={units}
          setUnits={setUnits}
        />
      )} 
    </>
  );
}