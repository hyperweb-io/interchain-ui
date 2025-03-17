import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const menuItemBgVar = createVar();
const menuItemBgHoveredVar = createVar();
const menuItemBgActiveVar = createVar();

export const chainLogoBase = style({
  display: "block",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "50%",
  background: themeVars.colors.skeletonBg,
});

export const chainLogoSizes = styleVariants({
  sm: [
    chainLogoBase,
    style({
      width: "24px",
      height: "24px",
    }),
  ],
  md: [
    chainLogoBase,
    style({
      width: "38px",
      height: "38px",
    }),
  ],
});

export const listItem = styleVariants({
  light: [
    {
      vars: {
        [menuItemBgVar]: themeVars.colors.menuItemBg,
        [menuItemBgHoveredVar]: themeVars.colors.menuItemBgHovered,
        [menuItemBgActiveVar]: themeVars.colors.menuItemBgActive,
      },
      willChange: "background-color",
      backgroundColor: `${menuItemBgVar} !important`,
      selectors: {
        "&:hover": {
          backgroundColor: `${menuItemBgHoveredVar} !important`,
        },
        '&[data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
        '&[data-is-selected="true"][data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
      },
    },
  ],
  dark: [
    {
      vars: {
        [menuItemBgVar]: themeVars.colors.menuItemBg,
        [menuItemBgHoveredVar]: themeVars.colors.menuItemBgHovered,
        [menuItemBgActiveVar]: themeVars.colors.menuItemBgActive,
      },
      willChange: "background-color",
      backgroundColor: `${menuItemBgVar} !important`,
      selectors: {
        "&:hover": {
          backgroundColor: `${menuItemBgHoveredVar} !important`,
        },
        '&[data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
        '&[data-is-selected="true"][data-is-active="true"]': {
          backgroundColor: `${menuItemBgActiveVar} !important`,
        },
      },
    },
  ],
});
