import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/themes.css";

export const radioCircleDefault = style({
  stroke: themeVars.colors.textSecondary,
});

export const radioCircleSelected = style({
  stroke: themeVars.colors.text,
});

export const radioCircleDisabled = style({
  stroke: themeVars.colors.inputDisabledText,
});
