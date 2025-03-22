import type {
  BaseComponentProps,
  Children,
} from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface ChainSwapInputProps extends BaseComponentProps {
  size?: "sm" | "md";
  attributes?: any;
  sprinkles?: Sprinkles;
  containerRef?: any;
  inputAttributes?: any;
  inputClassName?: string;
  isOpen?: boolean;
  // ====
  value: string;
  placeholder?: string;
  label: string;
  iconUrl?: string;
  amount?: string;
  notionalValue?: string;
  onDropdownArrowClicked: (event?: any) => void;
  endAddon?: Children | undefined;
}
