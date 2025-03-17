import React from "react";
import { useInteractions } from "@floating-ui/react";

export type Item = {
  key: string;
  label: string;
  index: number;
};

export interface SelectContextValue {
  activeIndex: number | null;
  selectedItem: Item | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (selectedItem: Item | null) => void;
}

export const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue
);
