import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  width: "464px",
});
export const inputContainer = style({
  borderColor: themeVars.colors.inputBorder,
  borderWidth: "1px",
  borderStyle: "solid",
  height: "68px",
});

export const token = style({
  width: "100%",
  height: "100%",
  border: 0,
  outline: 0,
  backgroundColor: themeVars.colors.cardBg,
});
