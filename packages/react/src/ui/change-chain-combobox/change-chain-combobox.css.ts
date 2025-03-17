import { style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "@/styles/themes.css";
import { listboxStyleNoShadow } from "../select/select.css";

const spacings = style({
  maxHeight: "304px",
  zIndex: 5,
  selectors: {
    "& + &": {
      marginTop: themeVars.space[2],
    },
  },
});

export const changeChainListBox = styleVariants({
  light: [listboxStyleNoShadow.light, spacings],
  dark: [listboxStyleNoShadow.dark, spacings],
});
