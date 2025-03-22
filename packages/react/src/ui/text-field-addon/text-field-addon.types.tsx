import type { BaseComponentProps } from "../../models/components.model";
import type { TextFieldProps } from "../text-field/text-field.types";

export interface TextFieldAddonProps extends BaseComponentProps {
  divider?: boolean;
  position: "start" | "end";
  intent?: TextFieldProps["intent"];
  disabled?: TextFieldProps["disabled"];
  size?: TextFieldProps["size"];
}
