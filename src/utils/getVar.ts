import type { RawVariable } from "../api/types";

export const getVar = (container: { variables: (idx: number) => RawVariable | undefined } | undefined, idx: number): number => {
  const v = container?.variables(idx);
  if (!v || typeof v.value != "function")
    throw new Error (`Missing variable at index ${idx}`);

  const raw = v.value();
  const num = Number(raw);
  if (Number.isNaN(num))
    throw new Error(`Variable at index ${idx} is not numeric: ${String(raw)}`);
    
  return num;
};