import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const borderColorVar = createVar();
export const colorVar = createVar();

const containerStyleBase = style({
  cursor: "pointer",
  position: "relative",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  gap: themeVars.space[4],
  paddingInlineStart: themeVars.space[4],
  paddingInlineEnd: themeVars.space[4],
  paddingTop: themeVars.space[1],
  paddingBottom: themeVars.space[1],
  width: "100%",
  height: "auto",
  minHeight: themeVars.space[12],
  borderRadius: themeVars.radii.full,
  fontSize: themeVars.fontSize.sm,
  fontWeight: themeVars.fontWeight.normal,
  lineHeight: themeVars.lineHeight.normal,
  borderColor: borderColorVar,
  color: colorVar,
});

export const containerStyle = styleVariants({
  light: [
    style({
      vars: {
        [borderColorVar]: themeVars.colors.gray200,
        [colorVar]: themeVars.colors.gray500,
      },
    }),
    containerStyleBase,
  ],
  dark: [
    containerStyleBase,
    style({
      vars: {
        [borderColorVar]: themeVars.colors.whiteAlpha300,
        [colorVar]: themeVars.colors.whiteAlpha600,
      },
    }),
  ],
});

export const textStyle = style({
  color: "inherit",
  marginRight: themeVars.space[4],
});

export const truncateEndStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const iconStyle = {
  idle: style({ color: "inherit" }),
  copied: styleVariants({
    light: [style({ color: themeVars.colors.green300 })],
    dark: [style({ color: themeVars.colors.green400 })],
  }),
};
