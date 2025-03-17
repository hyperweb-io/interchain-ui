import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { TextFieldProps } from "../text-field/text-field.types";

export interface ChangeChainInputProps
  extends Omit<
    TextFieldProps,
    | "id"
    | "inputContainer"
    | "inputClassName"
    | "startAddon"
    | "endAddon"
    | "clearLabel"
    | "onChange"
  > {
  size?: TextFieldProps["size"];
  attributes?: any;
  sprinkles?: Sprinkles;
  containerRef?: any;
  inputAttributes?: any;
  // ====
  id?: string;
  iconUrl?: string;
  chainName?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  showSelectedItem?: boolean;
  onChange?: (e: any) => void;
  onClear?: (event?: any) => void;
  onDropdownArrowClicked?: (event?: any) => void;
}

export interface ChangeChainInputBoldProps extends ChangeChainInputProps {}
