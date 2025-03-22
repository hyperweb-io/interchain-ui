import * as React from "react";

export interface ComboboxContextValue {
  size?: "sm" | "md";
}

export const ComboboxContext = React.createContext<ComboboxContextValue>(
  {} as ComboboxContextValue,
);
