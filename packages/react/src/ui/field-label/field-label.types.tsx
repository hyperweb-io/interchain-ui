import { BaseComponentProps } from "../../models/components.model";

export interface FieldLabelProps extends BaseComponentProps {
  id?: string;
  htmlFor: string | false;
  label?: BaseComponentProps["children"];
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  description?: BaseComponentProps["children"];
  descriptionId?: string;
  attributes?: any;
  labelAttributes?: any;
}
