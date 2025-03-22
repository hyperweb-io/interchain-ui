import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface RevealProps extends BaseComponentProps {
  hideThresholdHeight?: number;
  showMoreLabel?: string;
  showLessLabel?: string;
  fadeBackground?: {
    light: Sprinkles["backgroundColor"];
    dark: Sprinkles["backgroundColor"];
  };
  children: BaseComponentProps["children"];
}
