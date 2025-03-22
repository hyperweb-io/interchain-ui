import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface ContainerProps extends Omit<BaseComponentProps, "className"> {
  as?: any;
  className?: string;
  children?: BaseComponentProps["children"];
  maxWidth?: Sprinkles["maxWidth"];
  attributes?: Sprinkles;
}
