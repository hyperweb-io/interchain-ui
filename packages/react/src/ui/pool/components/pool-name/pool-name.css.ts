import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../../../styles/tokens";
import { themeVars } from "../../../../styles/themes.css";

export const imageBox = style({
  position: "relative",
  minWidth: themeVars.space[18],
  height: themeVars.space[14],
});

export const imgBase = style({
  position: "absolute",
  width: themeVars.space[14],
  height: themeVars.space[14],
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

export const nameContainer = style({
  width: "133px",
});
