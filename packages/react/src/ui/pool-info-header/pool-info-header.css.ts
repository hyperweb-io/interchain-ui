import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const poolInfoHeader = style({
  minWidth: "350px",
});

export const imageBox = style({
  position: "relative",
  minWidth: themeVars.space[18],
  height: themeVars.space[14],
  marginRight: themeVars.space[10],
});

export const imgBase = style({
  position: "absolute",
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const image1 = style([
  imgBase,
  {
    left: 0,
  },
]);

export const image2 = style([
  imgBase,
  {
    right: 0,
  },
]);

export const longText = style([
  style({
    width: "calc(50% - 96px)",
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "calc(100% - 96px)",
      },
    },
  }),
]);

export const shortText = style({
  width: themeVars.space[21],
});

export const onlysm = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "none",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "block",
    },
  },
});
