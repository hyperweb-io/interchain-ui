import { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { IconProps } from "../icon/icon.types";

export interface ConnectModalInstallButtonProps extends BaseComponentProps {
  disabled?: boolean;
  fluidWidth?: boolean;
  iconSize?: IconProps["size"];
  icon?: BaseComponentProps["children"];
  onClick?: (event: any) => void;
  onHoverStart?: (event: any) => void;
  onHoverEnd?: (event: any) => void;
  attributes?: Sprinkles;
  domAttributes?: any;
}
