import React from "react";
import type { UsePopoverReturnValue } from "./popover.types";

export type PopoverContextType = UsePopoverReturnValue | null;

export const PopoverContext = React.createContext<PopoverContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }
  return context;
};
