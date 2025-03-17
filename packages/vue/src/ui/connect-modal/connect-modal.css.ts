import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const connectModalShadowVar = createVar();
export const connectModalBgVar = createVar();

const modalContentBase = style({
  boxShadow: connectModalShadowVar,
  backgroundColor: connectModalBgVar,
  display: "flex",
  height: "auto",
  flexDirection: "column",
  borderRadius: themeVars.radii.xl,
});

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
        [connectModalBgVar]: themeVars.colors.gray700,
        [connectModalShadowVar]:
          "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
      },
    }),
    modalContentBase,
  ],
});

export const modalAnimateContainer = style({
  minHeight: `clamp(100%, ${themeVars.space[30]}px, ${themeVars.space[30]}px)`,
});

export const modalChildren = style({
  width: "320px",
  boxSizing: "border-box",
  paddingLeft: themeVars.space[7],
  paddingRight: themeVars.space[7],
  paddingTop: themeVars.space[3],
  paddingBottom: themeVars.space[10],
});
