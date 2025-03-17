import { style, styleVariants } from "@vanilla-extract/css";
import { baseTextStyles } from "../text/text.css";
import { themeVars } from "../../styles/themes.css";

export const fieldlabelStyle = style([
  baseTextStyles,
  style({
    lineHeight: "normal",
    fontWeight: themeVars.fontWeight.semibold,
    color: themeVars.colors.textSecondary,
  }),
]);

export const fieldLabelSizes = styleVariants({
  sm: [
    style({
      fontSize: themeVars.fontSize.sm,
    }),
  ],
  md: [
    style({
      fontSize: themeVars.fontSize.md,
    }),
  ],
  lg: [
    style({
      fontSize: themeVars.fontSize.xl,
    }),
  ],
});
