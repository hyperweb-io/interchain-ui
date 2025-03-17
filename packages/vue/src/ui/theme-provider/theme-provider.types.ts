import type { BaseComponentProps } from "../../models/components.model";
import type { UIState } from "../../models/store";
import type { ThemeDef } from "../../styles/override/override.types";
import type { ComponentOverrideMap } from "../../styles/override/override.types";
import type { Accent } from "../../styles/tokens";

export const DEFAULT_VALUES = {
  defaultTheme: "dark",
  customTheme: null,
  accent: "blue",
} as const;

export interface ThemeProviderProps extends BaseComponentProps {
  accent?: Accent;
  // TODO: rename all ThemeVariant related public API to use colorMode
  defaultTheme?: UIState["theme"];
  // Controlled prop themeMode, this will override the themeMode in the store
  // and will not be persisted in localstorage
  themeMode?: UIState["themeMode"];
  overrides?: ComponentOverrideMap;
  children?: any;
  themeDefs?: Array<ThemeDef>;
  customTheme?: UIState["customTheme"];
}
