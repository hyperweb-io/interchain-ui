import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { current } from "immer";

import BigNumber from "bignumber.js";
import {
  ModePreference,
  ThemeVariant,
  NumberFormatter,
  NumberFormatProps,
} from "./system.model";
import { isPreferDarkMode, isPreferLightMode } from "../helpers/style";
import {
  getCurrencyFormatter,
  safelyFormatNumberWithFallback,
} from "../helpers/number";
import { darkThemeClass, lightThemeClass } from "../styles/themes.css";
import { Accent } from "../styles/tokens";
import {
  OverrideStyleManager,
  assignThemeVars,
} from "../styles/override/override";
import type { ThemeDef } from "../styles/override/override.types";

export const STORAGE_NAME = "interchain-ui-store";

export interface UIState {
  // This is the value persisted in localstorage
  themeMode: ModePreference;
  // This is the value that our theme system uses for styling .ie styleVariants
  // which is derived from themeMode
  theme: ThemeVariant;
  themeClass: string;
  themeClasses: [string, string];
  themeAccent: Accent;
  customTheme: string | null;
  themeDefs: Array<ThemeDef>;
  overrideStyleManager: OverrideStyleManager;
  // Useful for use in SSR frameworks to check if the store has hydrated
  // and merged state with localstorage yet
  _hasHydrated: boolean;
}

export interface UIAction {
  setThemeMode: (mode: ModePreference) => void;
  setTheme: (theme: ThemeVariant, themeClass: string) => void;
  setThemeDefs: (defs: Array<ThemeDef>, defaultTheme?: string) => void;
  setCustomTheme: (customTheme: string) => void;
  setThemeAccent: (accent: Accent) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export interface I18nState {
  formatNumber: NumberFormatter;
}

export interface I18nAction {
  setFormatNumberFn: (fn: NumberFormatter) => void;
}

export interface UIStore extends UIState, UIAction, I18nState, I18nAction {}

export const store = createStore(
  persist(
    immer<UIStore>((set) => ({
      themeMode: null,
      theme: null,
      themeClass: "",
      themeClasses: [lightThemeClass, darkThemeClass],
      themeAccent: "blue",
      // Custom theme contract
      themeDefs: [],
      customTheme: null,
      overrideStyleManager: new OverrideStyleManager("light"),
      _hasHydrated: false,
      setTheme: (newTheme: ThemeVariant, themeClass: string) =>
        set((state) => {
          state.theme = newTheme;
          state.themeClass = themeClass;
        }),
      setThemeMode: (newThemeMode: ModePreference) =>
        set((state) => {
          const resolveSystemMode = (
            themeMode: ModePreference,
          ): [ThemeVariant, string] => {
            if (themeMode === "system") {
              if (isPreferDarkMode()) {
                return ["dark", darkThemeClass];
              }
              if (isPreferLightMode()) {
                return ["light", lightThemeClass];
              }
            } else {
              const themeClass = {
                dark: darkThemeClass,
                light: lightThemeClass,
              }[themeMode];

              return [themeMode, themeClass];
            }
          };

          const [resolvedTheme, resolvedClass] =
            resolveSystemMode(newThemeMode);

          state.overrideStyleManager?.update(null, resolvedTheme);
          state.themeMode = newThemeMode;
          state.theme = resolvedTheme;
          state.themeClass = resolvedClass;
        }),
      setThemeDefs: (defs: Array<ThemeDef>) => {
        set((state) => {
          state.themeDefs = defs;
        });
      },
      setCustomTheme: (customTheme: string) =>
        set((state) => {
          state.customTheme = customTheme;
          const currentState = current(state);

          if (customTheme !== null) {
            const customThemeObj = currentState.themeDefs.find(
              (item) => item.name === customTheme,
            );

            if (customThemeObj) {
              assignThemeVars(customThemeObj.vars, state.theme);
            }
          }
        }),
      setThemeAccent: (accent: Accent) =>
        set((state) => {
          state.themeAccent = accent;
        }),
      formatNumber: (props: NumberFormatProps): string => {
        const formatter = getCurrencyFormatter("en-US", {
          currency: "USD",
          style: props.style,
        });
        return safelyFormatNumberWithFallback(
          formatter,
          new BigNumber(props.value),
        );
      },
      setFormatNumberFn: (fn: NumberFormatter) =>
        set((state) => {
          state.formatNumber = fn;
        }),
      setHasHydrated: (hasHydrated) => {
        set({
          _hasHydrated: hasHydrated,
        });
      },
    })),
    {
      name: STORAGE_NAME,
      onRehydrateStorage: (state) => {
        return (persistedState) => {
          state.setHasHydrated(true);
          state.setThemeMode(persistedState.themeMode);
        };
      },
      // Only choose to persist theme preference, ignore other state
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
    },
  ),
);
