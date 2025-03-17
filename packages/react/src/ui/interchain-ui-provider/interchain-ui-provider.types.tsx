import type { BaseComponentProps } from "../../models/components.model";
import type { ThemeProviderProps } from "../theme-provider/theme-provider.types";
import type { ToasterProps } from "../toast/toast.types";

export interface InterchainUIProviderProps {
  themeOptions?: ThemeProviderProps;
  toastOptions?: ToasterProps;
  children?: BaseComponentProps["children"];
}
