import { style, styleVariants } from "@vanilla-extract/css";
import { unstyledButton } from "../button/button.css";
import {
  inputSizes,
  inputStyles,
  rootInput,
  inputRootIntent,
} from "../text-field/text-field.css";
import { themeVars } from "../../styles/themes.css";

const hideShadow = style({
  selectors: {
    "&:focus": {
      boxShadow: "none",
    },
  },
});

const buttonBase = style([
  unstyledButton,
  hideShadow,
  style({
    fontSize: themeVars.fontSize.sm,
    width: "100%",
    fontWeight: themeVars.fontWeight.normal,
  }),
]);

export const buttonStyles = styleVariants({
  light: [inputStyles.light, buttonBase],
  dark: [inputStyles.dark, buttonBase],
});

export const selectSizes = inputSizes;

export const buttonRoot = rootInput;

export const buttonIntent = inputRootIntent;

export const arrowDropDown = style({
  fontSize: themeVars.fontSize["3xl"],
  color: themeVars.colors.textPlaceholder,
});

export const buttonContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
});
