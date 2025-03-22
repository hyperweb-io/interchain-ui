import { style, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const tableRow = style({
  selectors: {
    "&:hover": {
      backgroundColor: `rgb(from ${themeVars.colors.text} r g b / 0.1)`,
    },
  },
});

export const tableCell = style({
  height: themeVars.space["14"],
  selectors: {
    [`${tableRow} &:first-child`]: {
      borderTopLeftRadius: themeVars.radii["base"],
      borderBottomLeftRadius: themeVars.radii["base"],
    },
    [`${tableRow} &:last-child`]: {
      borderTopRightRadius: themeVars.radii["base"],
      borderBottomRightRadius: themeVars.radii["base"],
    },
  },
});

export const tableBody = style({
  selectors: {
    "&:before": {
      content: '""',
      display: "block",
      height: themeVars.space["9"],
    },
    "&:after": {
      content: '""',
      display: "block",
      height: themeVars.space["9"],
    },
  },
});
export const borderedTableCell = style({
  position: "relative",
  height: "calc(40px + 1px)",
  selectors: {
    "&:after": {
      content: "",
      position: "absolute",
      bottom: "-1px",
      left: 0,
      right: 0,
      width: "100%",
      height: "1px",
      backgroundColor: themeVars.colors.divider,
    },
  },
});

export const firstRowCell = style({
  paddingTop: themeVars.space["4"],
});

export const lastRowCell = style({
  paddingBottom: themeVars.space["9"],
});

export const bottomShadow = style({
  height: "45px",
  position: "relative",
  width: "100%",
  backgroundColor: `rgb(from ${themeVars.colors.cardBg} r g b / 0.75)`,
  backdropFilter: "blur(1px)",
  opacity: 0.99,
  zIndex: 10,
  selectors: {
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
      right: 0,
      height: "45px",
      background: themeVars.colors.overflowShadowBg,
    },
  },
});

export const scrollBarThumbBgVar = createVar();

const scrollBarBase = style({
  // Firefox
  scrollbarWidth: "thin" /* "auto" or "thin" */,
  scrollbarColor: `${scrollBarThumbBgVar} transparent` /* scroll thumb and track */,
  selectors: {
    "&::-webkit-scrollbar": {
      width: themeVars.space[3],
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: scrollBarThumbBgVar,
      borderRadius: themeVars.space[2],
    },
  },
});

export const scrollBar = style([
  scrollBarBase,
  {
    vars: {
      [scrollBarThumbBgVar]: themeVars.colors.inputBorder,
    },
  },
]);
