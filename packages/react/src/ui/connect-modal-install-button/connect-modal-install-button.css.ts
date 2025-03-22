import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { baseButton } from "../button/button.css";
import { themeVars } from "../../styles/themes.css";

export const borderColorVar = createVar();
export const bgVar = createVar();
export const colorVar = createVar();
export const shadowVar = createVar();

const spacings = style({
  paddingTop: themeVars.space[6],
  paddingBottom: themeVars.space[6],
  height: themeVars.space[15],
});

const colors = style({
  color: colorVar,
  boxShadow: shadowVar,
  backgroundColor: bgVar,
  borderRadius: themeVars.radii.md,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: borderColorVar,
  selectors: {
    "&:hover": {
      opacity: 0.8,
    },
  },
});

const baseInstallButton = style([baseButton, spacings, colors]);

export const installButtonStyles = styleVariants({
  light: [
    style({
      vars: {
        [bgVar]: "rgba(37, 57, 201, 0.1)",
        [borderColorVar]: themeVars.colors.white,
        [colorVar]: themeVars.colors.primary400,
        [shadowVar]: "0 0 1px 2px rgba(37, 57, 201, 0.5)",
      },
    }),
    baseInstallButton,
  ],
  dark: [
    style({
      vars: {
        [bgVar]: "rgba(40, 62, 219, 0.15)",
        [borderColorVar]: themeVars.colors.gray800,
        [colorVar]: themeVars.colors.primary100,
        [shadowVar]: "0 0 1px 2px rgba(196, 203, 255, 0.5)",
      },
    }),
    baseInstallButton,
  ],
});

export const fluidWidth = style({ width: "100% !important" });
