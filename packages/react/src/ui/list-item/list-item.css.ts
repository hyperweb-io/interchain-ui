import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { baseTextStyles } from "../text/text.css";

export const listItemBase = style([
  baseTextStyles,
  {
    listStyle: "none",
    cursor: "pointer",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
    color: themeVars.colors.text,
    borderRadius: themeVars.radii.base,
    boxSizing: "border-box",
    backgroundColor: themeVars.colors.menuItemBg,
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.colors.menuItemBgHovered,
      },
      '&[data-is-active="true"]': {
        backgroundColor: themeVars.colors.background,
      },
      '&[data-is-active="true"]:hover': {
        backgroundColor: themeVars.colors.menuItemBgActive,
      },
      '&[data-is-selected="true"]': {
        backgroundColor: themeVars.colors.menuItemBgSelected,
      },
      '&[data-is-disabled="true"]': {
        cursor: "not-allowed",
        color: themeVars.colors.textMuted,
      },
      '&[data-is-disabled="true"]:hover': {
        backgroundColor: `${themeVars.colors.menuItemBg} !important`,
      },
    },
  },
]);

export const listItemSizes = styleVariants({
  md: [
    style({
      height: themeVars.space[17],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
      paddingLeft: themeVars.space[6],
      paddingRight: themeVars.space[6],
    }),
  ],
  sm: [
    style({
      height: themeVars.space[14],
      paddingTop: themeVars.space[4],
      paddingBottom: themeVars.space[4],
      paddingLeft: themeVars.space[6],
      paddingRight: themeVars.space[6],
    }),
  ],
});
