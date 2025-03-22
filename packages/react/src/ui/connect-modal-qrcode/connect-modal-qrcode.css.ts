import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const descriptionStyle = style({
  textAlign: "center",
  opacity: 0.75,
});

export const qrCodeBgVar = createVar();
export const qrCodeFgVar = createVar();
export const qrCodeBorderColorVar = createVar();
export const qrCodeBoxShadowVar = createVar();

const qrCodeContainerBase = style({
  border: "1px solid",
  borderColor: qrCodeBorderColorVar,
  boxShadow: qrCodeBoxShadowVar,
  width: "100%",
  padding: themeVars.space[9],
  borderRadius: themeVars.radii.lg,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: themeVars.space[2],
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "272px",
  maxHeight: "272px",
});

export const qrCodeContainer = styleVariants({
  light: [
    qrCodeContainerBase,
    style({
      vars: {
        [qrCodeBgVar]: themeVars.colors.white,
        [qrCodeFgVar]: themeVars.colors.blackAlpha900,
        [qrCodeBorderColorVar]: themeVars.colors.blackAlpha200,
        [qrCodeBoxShadowVar]: "rgba(0, 0, 0, 0.16) 0px 2px 5px -1px",
      },
    }),
  ],
  dark: [
    qrCodeContainerBase,
    style({
      vars: {
        [qrCodeBgVar]: themeVars.colors.gray800,
        [qrCodeFgVar]: themeVars.colors.white,
        [qrCodeBorderColorVar]: themeVars.colors.whiteAlpha200,
        [qrCodeBoxShadowVar]: "rgba(0, 0, 0, 0.92) 0px 2px 5px -1px",
      },
    }),
  ],
});

export const qrCodeDesc = style([
  {
    position: "relative",
  },
]);

export const qrCodeDescContent = style({
  overflowX: "hidden",
  overflowY: "auto",
  textAlign: "center",
  opacity: 0.75,
  fontSize: themeVars.fontSize.sm,
  fontWeight: themeVars.fontWeight.normal,
});

export const qrCodeDescBgVar = createVar();

const qrCodeDescShadowBase = style({
  height: "0px",
  opacity: "0",
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  background: qrCodeDescBgVar,
});

export const qrCodeDescShadow = styleVariants({
  light: [
    qrCodeDescShadowBase,
    style({
      vars: {
        [qrCodeDescBgVar]:
          "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)",
      },
    }),
  ],
  dark: [
    qrCodeDescShadowBase,
    style({
      vars: {
        [qrCodeDescBgVar]:
          "linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)",
      },
    }),
  ],
});
