import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface CenterProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  className?: string;
  children?: any;
  forwardedRef?: any;
  domAttributes?: any;
  attributes?: Sprinkles;
  axis?: "horizontal" | "vertical" | "both";
}

export const DEFAULT_VALUES = {
  as: "div",
};
