import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const avatarSizeVar = createVar();
export const avatarBgVar = createVar();
export const avatarBorderColorVar = createVar();

export const avatarBase = style({
  display: "inline-flex",
  borderRadius: "inherit",
  width: avatarSizeVar,
  height: avatarSizeVar,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flex: "auto 0 1px",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: themeVars.fontWeight.medium,
  selectors: {
    "&:not([data-loaded='true']):not([data-custom-bg='true'])": {
      backgroundColor: avatarBgVar,
    },
    "&:not([data-loaded='true'])": {
      color: themeVars.colors.text,
    },
  },
});

export const avatar = styleVariants({
  light: [
    avatarBase,
    style({
      vars: {
        [avatarBgVar]: themeVars.colors.gray200,
      },
    }),
  ],
  dark: [
    avatarBase,
    style({
      vars: {
        [avatarBgVar]: themeVars.colors.whiteAlpha300,
      },
    }),
  ],
});

export const avatarName = style({
  display: "inline-block",
  backgroundColor: "transparent",
  borderRadius: "100%",
  fontSize: `calc(${avatarSizeVar} / 2.5)`,
});

export const avatarImg = style({
  display: "inline-block",
  backgroundColor: "transparent",
  maxWidth: "100%",
  borderRadius: "inherit",
});

export const avatarBadge = styleVariants({
  light: [
    style({
      vars: {
        [avatarBorderColorVar]: themeVars.colors.white,
      },
      borderStyle: "solid",
      borderColor: avatarBorderColorVar,
    }),
  ],
  dark: [
    style({
      vars: {
        [avatarBorderColorVar]: themeVars.colors.gray300,
      },
      borderStyle: "solid",
      borderColor: avatarBorderColorVar,
    }),
  ],
});

export const avatarBadgePlacement = styleVariants({
  "top-left": [
    {
      top: "0",
      left: "0",
      transform: "translate(-25%, -25%)",
    },
  ],
  "top-right": [
    {
      top: "0",
      right: "0",
      transform: "translate(25%, -25%)",
    },
  ],
  "bottom-left": [
    {
      bottom: "0",
      left: "0",
      transform: "translate(-25%, 25%)",
    },
  ],
  "bottom-right": [
    {
      bottom: "0",
      right: "0",
      transform: "translate(25%, 25%)",
    },
  ],
});
