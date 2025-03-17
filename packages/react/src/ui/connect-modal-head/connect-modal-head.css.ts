import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const titleColorVar = createVar();
export const buttonColorVar = createVar();

const modalHeaderTextBase = style({
  display: "block",
  textAlign: "center",
  fontSize: themeVars.fontSize.md,
  fontWeight: themeVars.fontWeight.semibold,
  width: "100%",
  height: "100%",
  margin: "0",
  marginBlockEnd: 0,
  marginBlockStart: 0,
  color: titleColorVar,
});

export const modalHeaderText = styleVariants({
  light: [
    style({
      vars: {
        [titleColorVar]: themeVars.colors.gray700,
      },
    }),
    modalHeaderTextBase,
  ],
  dark: [
    style({
      vars: {
        [titleColorVar]: themeVars.colors.whiteAlpha900,
      },
    }),
    modalHeaderTextBase,
  ],
});

export const modalHeader = style({
  fontFamily: themeVars.font.body,
  paddingLeft: themeVars.space[8],
  paddingRight: themeVars.space[8],
  paddingBottom: themeVars.space[8],
  paddingTop: themeVars.space[10],
  position: "relative",
  display: "flex",
});

export const modalBackButton = style({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  marginTop: themeVars.space[2],
  marginLeft: themeVars.space[8],
});

export const modalCloseButton = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  marginTop: themeVars.space[2],
  marginRight: themeVars.space[8],
});

export const headerButton = style({
  width: "32px",
  height: "32px",
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
});
