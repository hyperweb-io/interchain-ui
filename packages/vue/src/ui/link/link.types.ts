import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface LinkProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  href: string;
  target?: string;
  rel?: string;
  underline?: boolean;
  background?: boolean;
  color?: Sprinkles["color"];
  className?: string;
  children?: any;
  attributes?: Sprinkles;
}
