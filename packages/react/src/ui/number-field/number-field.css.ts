import { style } from "@vanilla-extract/css";

export const borderless = style({
  border: "none !important",
  paddingTop: "0 !important",
  paddingBottom: "0 !important",
  selectors: {
    "&:focus": {
      boxShadow: "none !important",
    },
  },
});

export const withDecrementButton = style({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

export const withIncrementButton = style({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});
