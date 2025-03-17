import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { baseButton } from "../button/button.css";
import { themeVars } from "../../styles/themes.css";

const swapBorderColorVar = createVar();

export const switchContainer = style({
  height: themeVars.space[7],
  position: "relative",
});

const swapIconBase = style([
  {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    borderRadius: "50%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: `3px solid ${swapBorderColorVar} !important`,
    minWidth: `${themeVars.space[14]}`,
    width: `${themeVars.space[14]}`,
    height: `${themeVars.space[14]}`,
  },
]);

export const swapIcon = styleVariants({
  light: [
    style({
      vars: {
        [swapBorderColorVar]: themeVars.colors.white,
      },
    }),
    baseButton,
    swapIconBase,
  ],
  dark: [
    style({
      vars: {
        [swapBorderColorVar]: themeVars.colors.gray700,
      },
    }),
    baseButton,
    swapIconBase,
  ],
});

export const settingContainer = style({
  flex: 1,
  height: "100%",
});

export const percentLabelContainer = style({
  zIndex: 0,
});

export const percentContainer = style({
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "-400px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 1,
});
