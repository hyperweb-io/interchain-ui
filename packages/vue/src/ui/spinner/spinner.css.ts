import { style, keyframes } from "@vanilla-extract/css";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loader = style({
  animation: `${rotate} 1s linear infinite`,
});
