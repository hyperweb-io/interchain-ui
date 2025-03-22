import { style } from "@vanilla-extract/css";

export const lineClamp = style({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
});

export const pointer = style({
  cursor: "pointer",
});
