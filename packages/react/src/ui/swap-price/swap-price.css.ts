import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const swapPriceContainer = style([
  {
    borderTop: `2px solid ${themeVars.colors.cardBg}`,
  },
]);

export const img = style({
  width: themeVars.space[12],
  height: themeVars.space[12],
});

export const absImg = style({
  position: "absolute",
  top: "0",
  right: "0",
});

export const routeDivider = style({
  height: "1px",
  paddingLeft: themeVars.space[7],
  paddingRight: themeVars.space[7],
  flex: 1,
  background: `repeating-linear-gradient(90deg, ${themeVars.colors.divider} 0 4px, #0000 0 12px)`,
});

export const priceContainer = style({
  overflow: "hidden",
  maxHeight: "0",
});
