import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  backgroundColor: themeVars.colors.cardBg,
  padding: themeVars.space[10],
  borderRadius: themeVars.radii.lg,
  boxSizing: "border-box",
  height: "fit-content",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      width: "236px",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "100%",
      minWidth: "236px",
    },
  },
});

export const hoverStyle = style({
  cursor: "pointer",
})

export const divider = styleVariants({
  light: [
    {
      backgroundColor: "#D1D6DD",
    },
  ],
  dark: [
    {
      backgroundColor: "#434B55",
    },
  ],
});
