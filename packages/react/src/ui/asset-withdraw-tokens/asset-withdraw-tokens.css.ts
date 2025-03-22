import {
  style,
  styleVariants,
  createVar,
  keyframes,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const buttonTextColorVar = createVar();

export const container = style({
  minWidth: "340px",
  maxWidth: "460px",
  position: "relative",
});

export const flex1 = style({
  flex: 1,
  maxWidth: "215px",
});

export const onlyLg = style({
  display: "flex",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "none",
    },
  },
});

export const onlySm = style({
  display: "none",
  "@media": {
    [`screen and (max-width: 700px)`]: {
      display: "flex",
    },
  },
});

export const bgClass = styleVariants({
  light: [
    style({
      "@media": {
        [`screen and (max-width: 700px)`]: {
          backgroundColor: themeVars.colors.white,
        },
      },
    }),
  ],
  dark: [
    style({
      "@media": {
        [`screen and (max-width: 700px)`]: {
          backgroundColor: "#1D2024",
        },
      },
    }),
  ],
});

const btnTextBase = style({
  color: buttonTextColorVar,
});

export const btnText = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
      },
    }),
    btnTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
      },
    }),
    btnTextBase,
  ],
});

export const addressInput = style({
  paddingLeft: themeVars.space["15"],
  paddingRight: themeVars.space["17"],
  height: themeVars.space["15"],
  overflow: "hidden",
});

export const checkIcon = style({
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  position: "absolute",
  right: "0",
  bottom: "0",
  height: themeVars.space["15"],
});

const expandHorizontal = keyframes({
  "0%": { width: "100%", opacity: 0 },
  "100%": { width: "462px", opacity: 1 },
});
const expandHorizontalReverse = keyframes({
  "0%": { width: "462px", opacity: 1 },
  "100%": { width: "100%", opacity: 0 },
});

export const addressContainer = style({
  animation: `${expandHorizontal} .5s`,
  width: "460px",
});

export const addressContainerReverse = style({
  animation: `${expandHorizontalReverse} .5s`,
});

const expandVertical = keyframes({
  "0%": { opacity: "0", height: 0 },
  "100%": { opacity: "0.8", height: "400px" },
});

const expandVerticalReverse = keyframes({
  "0%": { opacity: "0.8", height: "400px" },
  "100%": { opacity: "0", height: 0 },
});

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.95)" },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

const fadeOut = keyframes({
  "0%": { opacity: 0, transform: "scale(0.95)" },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

export const addressBackgroundReverse = style({
  animation: `${expandVerticalReverse} .5s`,
});

export const smPanelShow = style({
  animation: `${fadeIn} 350ms cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const smPanelHide = style({
  animation: `${fadeOut} 250ms cubic-bezier(0.22, 1, 0.36, 1)`,
});

export const fromAddressInput = style({
  paddingRight: "20px",
  backgroundColor: themeVars.colors.inputBg,
});

export const transferMask = styleVariants({
  light: [
    style({
      backgroundColor: themeVars.colors.white,
    }),
  ],
  dark: [
    style({
      backgroundColor: themeVars.colors.blackPrimary,
    }),
  ],
});

export const addressBackground = style({
  animation: `${expandVertical} 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
  position: "absolute",
  width: "460px",
  height: "400px",
  top: "84px",
  right: "0",
  zIndex: "1",
  opacity: 0.8,
});
