import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const baseInput = style({
  height: '100%',
  fontSize: themeVars.fontSize["lg"],
  fontWeight: themeVars.fontWeight["semibold"],
})

export const starContainer = style({
  top: "50%",
  transform: "translateY(-50%)"
})
