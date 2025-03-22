import { style } from "@vanilla-extract/css";

export const arrow = style({
  zIndex: 999,
});

export const contentWrapper = style({
  zIndex: 999,
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});
