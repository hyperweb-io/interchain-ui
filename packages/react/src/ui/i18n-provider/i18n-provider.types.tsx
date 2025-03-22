import { BaseComponentProps } from "../../models/components.model";
export interface I18nProviderProps extends Intl.NumberFormatOptions{
  locale?: string;
  children: BaseComponentProps["children"]
}
