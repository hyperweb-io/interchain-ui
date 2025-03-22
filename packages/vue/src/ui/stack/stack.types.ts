import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface StackProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  className?: string;
  boxRef?: any;
  children?: any;
  forwardedRef?: any;
  domAttributes?: any;
  attributes?: Sprinkles;
  direction?: "vertical" | "horizontal";
  space?: Sprinkles["gap"];
  flexWrap?: Sprinkles["flexWrap"];
  justify?: Sprinkles["justifyContent"];
  align?: Sprinkles["alignItems"];
  flex?: Sprinkles["flex"];
}

export const DEFAULT_VALUES = {
  as: "div",
};
