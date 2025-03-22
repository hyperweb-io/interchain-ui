import { style } from "@vanilla-extract/css";

export const textItem = style({
  display: "inline-flex",
  justifyContent: "left",
  alignItems: "center",
});

export const numericItem = style({
  display: "inline-flex",
  justifyContent: "right",
  alignItems: "center",
});
