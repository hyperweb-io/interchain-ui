import type { BaseComponentProps } from "../../models/components.model";
import { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface StarTextProps extends BaseComponentProps {
  size?: "md" | "lg";
  label?: string;
  value: string | number;
  tokenName?: string;
  showTokenIcon?: boolean;
  iconSrc?: string;
  onClick?: (event?: any) => void;
  attributes?: Sprinkles;
}
