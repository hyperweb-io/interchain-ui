import { style, styleVariants } from "@vanilla-extract/css";
import { inputBorderVar } from "../text-field/text-field.css";
import { themeVars } from "../../styles/themes.css";

export const textFieldAddon = style({
  display: "flex",
  color: "inherit",
  fontSize: "inherit",
  position: "absolute",
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
});

export const textFieldAddonPositions = styleVariants({
  end: [
    style({
      right: 0,
      top: 0,
      bottom: 0,
    }),
  ],
  start: [
    style({
      left: 0,
      top: 0,
      bottom: 0,
    }),
  ],
});

export const textFieldAddonSizes = styleVariants({
  sm: [
    style({
      paddingLeft: themeVars.space[6],
      paddingRight: themeVars.space[6],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
    }),
  ],
  md: [
    style({
      paddingLeft: themeVars.space[8],
      paddingRight: themeVars.space[8],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
    }),
  ],
});

export const textFieldAddonDivider = styleVariants({
  end: [
    style({
      borderLeftWidth: "1px",
      borderLeftStyle: "solid",
      borderLeftColor: inputBorderVar,
    }),
  ],
  start: [
    style({
      borderRightWidth: "1px",
      borderRightStyle: "solid",
      borderRightColor: inputBorderVar,
    }),
  ],
});
