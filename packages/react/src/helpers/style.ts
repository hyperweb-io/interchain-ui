import { globalStyle, GlobalStyleRule } from "@vanilla-extract/css";
import type { Writable } from "../helpers/types";
import { store } from "../models/store";
import {
  Accent,
  DEFAULT_ACCENTS,
  accents,
  accentsForeground,
} from "../styles/tokens";
import {
  ModePreference,
  ModePreferences,
  ThemeVariant,
} from "../models/system.model";
import { isSSR } from "./platform";

const hexToRgb = (hex: string) => {
  const channels = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
  return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
};

export const rgb = (color: string, alpha?: string) => {
  const rgbColor = color.includes("rgb") ? color : hexToRgb(color);
  // 'rgb(x, y, z)' -> 'x, y, z'
  const partial = rgbColor.replace("rgb(", "").replace(")", "");
  return alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`;
};

export const isDefaultAccent = (accent: Accent) => {
  return (DEFAULT_ACCENTS as unknown as Writable<Accent[]>).includes(accent);
};

// Get accent color, if not default provided then it's a color string
export const getAccent = (accent: Accent, colorMode: ThemeVariant | null) => {
  return isDefaultAccent(accent)
    ? accents[colorMode ?? "light"][accent]
    : accent;
};

export const getAccentText = (colorMode: ThemeVariant | null) => {
  return accentsForeground[colorMode ?? "light"];
};

export const getAccentHover = (color: string) => {
  return rgb(color, "0.075");
};

export const mediaQueryColorScheme = (mode: string) =>
  `(prefers-color-scheme: ${mode})`;

const isValidThemeMode = (mode: ModePreference) => {
  return ModePreferences.includes(mode);
};

// Resolve theme mode by priority:
// props.defaultProps > saved theme > system theme
export const resolveThemeMode = (
  defaultThemeMode?: ModePreference,
): ModePreference => {
  const hasHydrated = store.getState()._hasHydrated;

  // While in SSR, return a default theme
  if (isSSR() || !hasHydrated) {
    return "light";
  }

  const savedTheme = store.getState().themeMode;

  if (isValidThemeMode(defaultThemeMode)) {
    // Only set the theme if it's different from the saved theme
    if (defaultThemeMode !== savedTheme) {
      store.getState().setThemeMode(defaultThemeMode);
    }
    return defaultThemeMode;
  }

  // props.defaultThemeMode is not provided or invalid, rely on persisted theme
  if (isValidThemeMode(savedTheme)) {
    return savedTheme;
  }

  // persisted value not a valid theme mode, fallback to 'system'
  store.getState().setThemeMode("system");
  console.log("[resolveThemeMode] using system theme mode");
  return "system";
};

export const isPreferLightMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

export const isPreferDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function childSelectors(
  styleVariantsSelector: string,
  selector: string,
  rule: GlobalStyleRule,
) {
  const allSelectors = Array.from(new Set(styleVariantsSelector.split(" ")));
  const targetSelector = allSelectors[allSelectors.length - 1];
  globalStyle(`${targetSelector} ${selector}`, rule);
}
