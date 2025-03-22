import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

// Rewrite prgress-bar with input[type="range"]
/*
const base = sprinkles({
  borderRadius: "xl",
  height: "2",
});

export const bar = style([
  base,
  sprinkles({
    backgroundColor: "cardBg",
  }),
  {
    width: "100%",
  },
]);

export const filledBar = style([
  base,
  sprinkles({
    backgroundColor: "textSecondary",
  }),
  {
    transition: "width 0.5s ease-out",
    position: "relative",
  },
]);

export const dot = style([
  sprinkles({
    backgroundColor: "text",
    width: "10",
    height: "10",
    borderRadius: "2xl",
  }),
  {
    position: "absolute",
    right: "-12px",
    bottom: "-10px",
    cursor: "pointer",
    selectors: {
      "&:active": {
        width: "28px",
        height: "28px",
        borderRadius: "14px",
        right: "-14px",
        bottom: "-12px",
      },
    },
  },
]);

*/

export const range = style({
  height: themeVars.space[2],
  borderRadius: themeVars.radii.xl,
  backgroundColor: themeVars.colors.cardBg,
  outline: "none",
  width: "100%",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `linear-gradient(${themeVars.colors.text}, ${themeVars.colors.text})`,
  backgroundRepeat: "no-repeat",
  "::-webkit-slider-thumb": {
    width: "24px",
    height: "24px",
    border: "0",
    backgroundColor: themeVars.colors.text,
    borderRadius: "50%",
    appearance: "none",
    WebkitAppearance: "none",
  },
  selectors: {
    "&:active::-webkit-slider-thumb": {
      width: "28px",
      height: "28px",
    },
  },
});
