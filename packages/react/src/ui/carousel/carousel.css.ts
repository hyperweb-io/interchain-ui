import { style } from "@vanilla-extract/css";

export const innerContainer = style({
  scrollBehavior: "smooth",
});

export const fadeOutGradient = style({
  background:
    "linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
});
