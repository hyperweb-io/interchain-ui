import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  width: "752px",
  paddingTop: themeVars.space[10],
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "100%",
    },
  },
});

export const titleContainer = style({
  paddingLeft: "88px",
  marginTop: themeVars.space[9],
  marginBottom: themeVars.space[9],
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "none !important",
    },
  },
});

export const title = style({
  width: "calc(100% / 5)",
});
