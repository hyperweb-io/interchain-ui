import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const connectModalShadowVar = createVar();
export const connectModalBgVar = createVar();

const modalContentBase = style([
  style({
    boxShadow: connectModalShadowVar,
    backgroundColor: connectModalBgVar,
    maxHeight: "100%",
    overflow: "auto !important",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    borderRadius: themeVars.radii["xl"],
    selectors: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  }),
]);

export const modalContent = styleVariants({
  light: [
    style({
      vars: {
        [connectModalBgVar]: themeVars.colors.white,
        [connectModalShadowVar]:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    }),
    modalContentBase,
  ],
  dark: [
    style({
      vars: {
        [connectModalBgVar]: themeVars.colors.blackPrimary,
        [connectModalShadowVar]:
          "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
      },
    }),
    modalContentBase,
  ],
});

export const modalChildren = style([
  {
    minWidth: "320px",
    paddingLeft: themeVars.space["9"],
    paddingRight: themeVars.space["9"],
    paddingBottom: themeVars.space["9"],
  },
]);

export const modalHeader = style({
  paddingTop: themeVars.space["4"],
  paddingLeft: themeVars.space["9"],
  paddingRight: themeVars.space["4"],
  paddingBottom: "0",
});
