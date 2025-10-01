import React from "react";
import { UnitsMenu } from "./UnitsMenu";

export const MemoizedUnitsMenu = React.memo(UnitsMenu, (prev, next) => {
  return (
    prev.units === next.units &&
    prev.menuPosition?.top === next.menuPosition?.top &&
    prev.menuPosition?.left === next.menuPosition?.left
  );
});