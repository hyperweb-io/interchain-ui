import { style, keyframes } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const processingIcon = style({
  animation: `${rotate} 1s linear infinite`,
});

export const walletImg = style({
  display: "block",
});

export const walletImgContainer = style({
  position: "relative",
  display: "inline-block",
  selectors: {
    "&[data-disabled='true']::after": {
      position: "absolute",
      content: '""',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: themeVars.colors.body,
      mixBlendMode: "hue",
      backdropFilter: "grayscale(0.4) opacity(0.5)",
    },
  },
});

export const inputBase = style({
  width: "100%",
  height: "100%",
  flex: 1,
  border: "none",
  outline: "none",
  position: "relative",
  appearance: "none",
  fontFamily: themeVars.font.body,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
  transitionDuration: "200ms",
  color: "inherit",
  fontWeight: "inherit",
  fontSize: "inherit",
  letterSpacing: "inherit",
  backgroundColor: "transparent",
  borderRadius: themeVars.radii.lg,
  padding: 0,
  selectors: {
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    '&[data-align="left"]': {
      textAlign: "left",
    },
    '&[data-align="right"]': {
      textAlign: "right",
    },
  },
});
