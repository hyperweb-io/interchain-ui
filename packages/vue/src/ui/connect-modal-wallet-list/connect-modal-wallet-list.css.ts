import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  position: "relative",
});

export const walletList = style({
  maxHeight: "320px",
  height: "auto",
  width: "100%",
  overflow: "auto",
  scrollbarWidth: "none",
  paddingTop: themeVars.space[1],
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none" /* Safari and Chrome */,
    },
    "&[data-has-list-wallets='true']": {
      paddingBottom: themeVars.space[8],
    },
  },
});

export const squareWallets = style({
  columnGap: themeVars.space[5],
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  marginBottom: themeVars.space[5],
  paddingLeft: themeVars.space[1],
  paddingRight: themeVars.space[1],
});

export const listWallets = style({
  rowGap: themeVars.space[2],
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  paddingBottom: themeVars.space[4],
  paddingLeft: themeVars.space[1],
  paddingRight: themeVars.space[1],
});
