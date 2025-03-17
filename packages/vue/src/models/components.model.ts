import type { Sprinkles } from "../styles/rainbow-sprinkles.css";

export type ComponentRef<T = HTMLElement> = T & ((el: T) => void);
export type Children = any; // TODO

export interface BaseComponentProps {
  className?: string;
  class?: string; // Fallback className
  classList?: string; // Fallback class
  children?: Children;
  forwardedRef?: any;
}

export type BaseState = {
  loaded: boolean;
};

export type CSS = Partial<CSSStyleDeclaration> & {
  [key: string]: Partial<CSSStyleDeclaration> | string;
};

export type NumberFormatOptions = {
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};

export type GridColumn = {
  id: string;
  width?: Sprinkles["width"];
  label?: string;
  align?: "left" | "center" | "right";
  color?: Sprinkles["color"];
  textTransform?: Sprinkles["textTransform"];
  render?: (value: any, column: GridColumn, isPinned?: boolean) => Children;
};
