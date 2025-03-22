import { BaseComponentProps } from "../../models/components.model";
import { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface ListItemProps extends BaseComponentProps {
  isSelected?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md";
  attributes?: any;
  sprinkles?: Sprinkles;
  itemRef?: any;
}
