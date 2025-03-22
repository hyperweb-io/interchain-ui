import {
  style,
  styleVariants,
  createVar,
  createContainer,
} from "@vanilla-extract/css";
import { baseButton } from "../button/button.css";
import { themeVars } from "../../styles/themes.css";

const textButtonBgVar = createVar();
const textButtonColorVar = createVar();
export const transferItemRootContainer = createContainer();

export const root = style({
  containerName: transferItemRootContainer,
  containerType: "inline-size",
});

export const img = style({
  width: themeVars.space[15],
  height: themeVars.space[15],
});

export const dropdowBtn = style({
  padding: "0",
});

const textBtnBase = style({
  color: `${textButtonColorVar} !important`,
  backgroundColor: `${textButtonBgVar} !important`,
  borderRadius: themeVars.radii.base,
  minWidth: "42px",
  minHeight: themeVars.space["10"],
  selectors: {
    "&:hover": {
      opacity: 0.89,
    },
  },
});

export const textBtn = styleVariants({
  light: [
    baseButton,
    textBtnBase,
    style({
      vars: {
        [textButtonColorVar]: themeVars.colors.white,
        [textButtonBgVar]: themeVars.colors.textPlaceholder,
      },
    }),
  ],
  dark: [
    baseButton,
    textBtnBase,
    style({
      vars: {
        [textButtonColorVar]: themeVars.colors.text,
        [textButtonBgVar]: themeVars.colors.blackSecondary,
      },
    }),
  ],
});

export const transferInput = style({
  fontSize: themeVars.fontSize["2xl"],
  textAlign: "right",
  width: "100%",
  height: "auto !important",
  backgroundColor: "transparent !important",
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
});

export const comboboxContainer = style({
  minHeight: "86px",
  borderBottomLeftRadius: themeVars.radii.lg,
  borderBottomRightRadius: themeVars.radii.lg,
  backgroundColor: "transparent",
});

export const smComboboxInput = style({
  height: "auto !important",
  fontSize: "18px !important",
});
