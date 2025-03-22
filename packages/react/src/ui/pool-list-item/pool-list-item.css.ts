import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  marginBottom: themeVars.space[10],
  marginRight: themeVars.space[9],
  display: "flex",
  width: "752px",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "100%",
      minWidth: "400px",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  },
});

export const hoverStyle = style({
  cursor: "pointer",
  padding: themeVars.space[1],
  borderRadius: themeVars.radii.base,
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.colors.cardBg,
    },
  },
});

export const contentContainer = style({
  width: "712px",
});

export const rank = style({
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      marginLeft: "-46px",
    },
  },
});

export const responsiveText = style({
  width: "calc(100% / 3)",
  "@media": {
    [`screen and (min-width: ${breakpoints.desktop}px)`]: {
      width: "calc(100% / 5)",
    },
  },
});

export const nameContainer = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      minWidth: "calc(72px + 20%)",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      width: "calc(88px + 33.33%)",
    },
  },
});

export const imageBox = style({
  position: "relative",
  minWidth: themeVars.space[18],
  height: themeVars.space[14],
  marginRight: themeVars.space[8],
});

export const imgBase = style({
  position: "absolute",
  width: themeVars.space[14],
  height: themeVars.space[14],
});

export const image1 = style([
  imgBase,
  {
    left: 0,
  },
]);

export const image2 = style([
  imgBase,
  {
    right: 0,
  },
]);

export const smAPR = style({
  justifyContent: "space-between",
});

export const lgAPR = style({
  "@media": {
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "none !important",
    },
  },
});

export const onlySm = style({
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "none !important",
    },
    [`screen and (max-width: ${breakpoints.tablet}px)`]: {
      display: "flex !important",
    },
  },
});

const baseIcon = style({
  width: "38px",
  height: "38px",
  cursor: "pointer",
  borderRadius: themeVars.radii.base,
});

export const iconContainer = styleVariants({
  light: [
    baseIcon,
    {
      backgroundColor: "#EEF2F8",
    },
  ],
  dark: [
    baseIcon,
    {
      backgroundColor: "#1D2024",
    },
  ],
});
