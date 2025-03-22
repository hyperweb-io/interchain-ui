import { style, fallbackVar, createVar, keyframes } from "@vanilla-extract/css";
import { childSelectors } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";

// Custom grays
const gray1 = createVar();
const gray2 = createVar();
const gray3 = createVar();
const gray4 = createVar();
const gray5 = createVar();
const gray6 = createVar();
const gray7 = createVar();
const gray8 = createVar();
const gray9 = createVar();
const gray10 = createVar();
const gray11 = createVar();
const gray12 = createVar();

// Common vars
export const frontToastHeightVar = createVar();
export const offsetVar = createVar();
export const widthVar = createVar();
export const gapVar = createVar();
export const mobileOffsetVar = createVar();

// Toast item vars
export const indexVar = createVar();
export const toastsBeforeVar = createVar();
export const zIndexVar = createVar();
export const initialHeightVar = createVar();
export const yVar = createVar();
export const scaleVar = createVar();
export const liftVar = createVar();
export const liftAmountVar = createVar();
export const swipeAmountVar = createVar();

export const normalBgVar = createVar();
export const normalBorderVar = createVar();
export const normalTextVar = createVar();

export const successBg = createVar();
export const successBorder = createVar();
export const successText = createVar();

export const errorBg = createVar();
export const errorBorder = createVar();
export const errorText = createVar();

export const colorVar = createVar();
export const borderColorVar = createVar();
export const shadowVar = createVar();

export const toaster = style({
  vars: {
    [gray1]: "hsl(0, 0%, 99%)",
    [gray2]: "hsl(0, 0%, 97.3%)",
    [gray3]: "hsl(0, 0%, 95.1%)",
    [gray4]: "hsl(0, 0%, 93%)",
    [gray5]: "hsl(0, 0%, 90.9%)",
    [gray6]: "hsl(0, 0%, 88.7%)",
    [gray7]: "hsl(0, 0%, 85.8%)",
    [gray8]: "hsl(0, 0%, 78%)",
    [gray9]: "hsl(0, 0%, 56.1%)",
    [gray10]: "hsl(0, 0%, 52.3%)",
    [gray11]: "hsl(0, 0%, 43.5%)",
    [gray12]: "hsl(0, 0%, 9%)",
  },
  position: "fixed",
  width: widthVar,
  fontFamily: themeVars.font.body,
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
  listStyle: "none",
  outline: "none",
  zIndex: 999999999,
  selectors: {
    "&[data-theme='light']": {
      vars: {
        [normalBgVar]: themeVars.colors.white,
        [normalBorderVar]: gray3,
        [normalTextVar]: themeVars.colors.text,
        [successBg]: "hsl(143, 85%, 96%)",
        [successBorder]: "hsl(145, 92%, 91%)",
        [successText]: "hsl(140, 100%, 27%)",
        [errorBg]: "hsl(359, 100%, 97%)",
        [errorBorder]: "hsl(359, 100%, 94%)",
        [errorText]: "hsl(360, 100%, 45%)",
      },
    },
    "&[data-theme='dark']": {
      vars: {
        [normalBgVar]: themeVars.colors.background,
        [normalBorderVar]: themeVars.colors.blackAlpha200,
        [normalTextVar]: themeVars.colors.text,
        [successBg]: "hsl(150, 100%, 6%)",
        [successBorder]: "hsl(147, 100%, 12%)",
        [successText]: "hsl(150, 86%, 65%)",
        [errorBg]: "hsl(358, 76%, 10%)",
        [errorBorder]: "hsl(357, 89%, 16%)",
        [errorText]: "hsl(358, 100%, 81%)",
      },
    },
    "&[data-x-position='right']": {
      right: `max(${offsetVar}, env(safe-area-inset-right))`,
    },
    "&[data-x-position='left']": {
      left: `max(${offsetVar}, env(safe-area-inset-left))`,
    },
    "&[data-x-position='center']": {
      left: "50%",
      transform: "translateX(-50%)",
    },
    "&[data-y-position='top']": {
      top: `max(${offsetVar}, env(safe-area-inset-top))`,
    },
    "&[data-y-position='bottom']": {
      bottom: `max(${offsetVar}, env(safe-area-inset-bottom))`,
    },
  },
  "@media": {
    "screen and (max-width: 600px)": {
      vars: {
        [mobileOffsetVar]: themeVars.space[8],
      },
      position: "fixed",
      right: mobileOffsetVar,
      left: mobileOffsetVar,
      width: "100%",
      selectors: {
        "&[data-x-position='left']": {
          left: mobileOffsetVar,
        },
        "&[data-y-position='bottom']": {
          bottom: themeVars.space[9],
        },
        "&[data-y-position='top']": {
          top: themeVars.space[9],
        },
        "&[data-x-position='center']": {
          left: mobileOffsetVar,
          right: mobileOffsetVar,
          transform: "none",
        },
      },
    },
  },
});

// ==== Toast item
const toastSwipeOut = keyframes({
  from: {
    transform: `translateY(calc(${liftVar} * ${offsetVar} + ${swipeAmountVar}))`,
    opacity: 1,
  },
  to: {
    transform: `translateY(calc(${liftVar} * ${offsetVar} + ${swipeAmountVar} + ${liftVar} * -100%))`,
    opacity: 0,
  },
});

const toastFadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.8)" },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

const toastFadeOut = keyframes({
  "0%": { opacity: 1, transform: "scale(1)" },
  "100%": {
    opacity: 0,
    transform: "scale(0.8)",
  },
});

export const toast = style({
  vars: {
    [yVar]: `translateY(100%)`,
    [liftAmountVar]: `calc(${liftVar} * ${gapVar})`,
  },
  zIndex: zIndexVar,
  position: "absolute",
  opacity: 0,
  transform: yVar,
  // https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not
  touchAction: "none",
  willChange: "transform, opacity, height",
  transition: "transform 400ms, opacity 400ms, height 400ms, box-shadow 200ms",
  boxSizing: "border-box",
  outline: "none",
  selectors: {
    "&[data-theme='light']": {
      vars: {
        [shadowVar]: `
          0.7px 0px 6.8px rgba(0, 0, 0, 0.019),
          1.9px 0px 18.8px rgba(0, 0, 0, 0.033),
          4.5px 0px 45.2px rgba(0, 0, 0, 0.044),
          15px 0px 150px rgba(0, 0, 0, 0.07)
        `,
      },
    },
    "&[data-theme='dark']": {
      vars: {
        [shadowVar]: `
          0.4px 0px 2.2px rgba(0, 0, 0, 0.07),
          1px 0px 5.3px rgba(0, 0, 0, 0.058),
          1.9px 0px 10px rgba(0, 0, 0, 0.048),
          3.4px 0px 17.9px rgba(0, 0, 0, 0.039),
          6.3px 0px 33.4px rgba(0, 0, 0, 0.031),
          15px 0px 80px rgba(0, 0, 0, 0.023)
        `,
      },
    },
    "&[data-styled='true']": {
      padding: themeVars.space[8],
      background: normalBgVar,
      border: `1px solid ${normalBorderVar}`,
      color: normalTextVar,
      borderRadius: themeVars.radii.sm,
      boxShadow: shadowVar,
      width: widthVar,
      fontSize: themeVars.fontSize.sm,
      display: "flex",
      alignItems: "center",
      gap: themeVars.space[3],
    },
    "&:focus-visible": {
      boxShadow:
        "0px 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.2)",
    },
    "&[data-y-position='top']": {
      vars: {
        [yVar]: "translateY(-100%)",
        [liftVar]: "1",
        [liftAmountVar]: `calc(1 * ${gapVar})`,
      },
      top: 0,
    },
    "&[data-y-position='bottom']": {
      vars: {
        [yVar]: "translateY(100%)",
        [liftVar]: "-1",
        [liftAmountVar]: `calc(${liftVar} * ${gapVar})`,
      },
      bottom: 0,
    },
    // Leave a ghost div to avoid setting hover to false when swiping out
    "&[data-swiping='true']:before": {
      content: "",
      position: "absolute",
      left: 0,
      right: 0,
      height: "100%",
    },
    "&[data-y-position='top'][data-swiping='true']:before": {
      // y 50% needed to distribute height additional height evenly
      bottom: "50%",
      transform: "scaleY(3) translateY(50%)",
    },
    "&[data-y-position='bottom'][data-swiping='true']:before": {
      top: "50%",
      transform: "scaleY(3) translateY(-50%)",
    },
    "&[data-swiping='false'][data-removed='true']:before": {
      content: "",
      position: "absolute",
      inset: 0,
      transform: "scaleY(2)",
    },
    "&:after": {
      content: "",
      position: "absolute",
      left: 0,
      height: `calc(${gapVar} + 1px)`,
      bottom: "100%",
      width: "100%",
    },
    "&[data-mounted='true']": {
      vars: {
        [yVar]: `translateY(0)`,
      },
      opacity: 1,
    },
    "&[data-expanded='false'][data-front='false']": {
      vars: {
        [scaleVar]: `${toastsBeforeVar} * 0.05 + 1`,
        [yVar]: `translateY(calc(${liftAmountVar} * ${toastsBeforeVar})) scale(calc(-1 * ${scaleVar}))`,
      },
      height: frontToastHeightVar,
    },
    "&[data-visible='false']": {
      opacity: 0,
      pointerEvents: "none",
    },
    "&[data-mounted='true'][data-expanded='true']": {
      vars: {
        [yVar]: `translateY(calc(${liftVar} * ${offsetVar}))`,
      },
      height: initialHeightVar,
    },
    "&[data-removed='true'][data-front='true'][data-swipe-out='false']": {
      vars: {
        [yVar]: `translateY(calc(${liftVar} * -100%))`,
      },
      opacity: 0,
    },
    "&[data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']":
      {
        vars: {
          [yVar]: `translateY(calc(${yVar} * ${offsetVar} + ${yVar} * -100%))`,
        },
        opacity: 0,
      },
    "&[data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']":
      {
        vars: {
          [yVar]: "translateY(40%)",
        },
        opacity: 0,
        transition: "transform 500ms, opacity 200ms",
      },
    "&[data-removed='true'][data-front='false']:before": {
      height: `calc(${initialHeightVar} + 20%)`,
    },
    "&[data-swiping='true']": {
      transform: `${yVar} translateY(${fallbackVar(swipeAmountVar, "0px")})`,
      transition: "none",
    },
    "&[data-swipe-out='true'][data-y-position='bottom']": {
      animation: `${toastSwipeOut} 200ms ease-out forwards`,
    },
    "&[data-swipe-out='true'][data-y-position='top']": {
      animation: `${toastSwipeOut} 200ms ease-out forwards`,
    },
  },
  "@media": {
    "screen and (max-width: 600px)": {
      left: 0,
      right: 0,
      width: `calc(100% - 32px)`,
    },
  },
});

childSelectors(toast, "> *", {
  transition: "opacity 400ms",
});

childSelectors(
  toast,
  "[data-expanded='false'][data-front='false'][data-styled='true'] > * ",
  {
    opacity: 0,
  }
);

childSelectors(`${toast}[data-promise='true']`, "[data-icon] > svg", {
  opacity: 0,
  transform: "scale(0.8)",
  transformOrigin: "center",
  animation: `${toastFadeIn} 300ms ease forwards`,
});

// colorful toast variant
childSelectors(
  `${toaster}[data-colorful='true']`,
  `${toast}[data-type='success']`,
  {
    background: successBg,
    borderColor: successBorder,
    color: successText,
  }
);

childSelectors(
  `${toaster}[data-colorful='true']`,
  `${toast}[data-type='success'] [data-close-button]`,
  {
    background: successBg,
    borderColor: successBorder,
    color: successText,
  }
);

childSelectors(
  `${toaster}[data-colorful='true']`,
  `${toast}[data-type='error']`,
  {
    background: errorBg,
    borderColor: errorBorder,
    color: errorText,
  }
);

childSelectors(
  `${toaster}[data-colorful='true']`,
  `${toast}[data-type='error'] [data-close-button]`,
  {
    background: errorBg,
    borderColor: errorBorder,
    color: errorText,
  }
);

export const toastDescription = style({
  fontWeight: themeVars.fontWeight.normal,
  lineHeight: 1.4,
  color: "inherit",
});

export const toastTitle = style({
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: 1.5,
  color: "inherit",
});

export const toastIcon = style({
  display: "flex",
  height: themeVars.space[8],
  width: themeVars.space[8],
  position: "relative",
  justifyContent: "flex-start",
  alignItems: "center",
  flexShrink: 0,
  marginLeft: "-3px",
  marginRight: "4px",
});

export const toastContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const toastButton = style({
  borderRadius: themeVars.radii.base,
  paddingLeft: themeVars.space[4],
  paddingRight: themeVars.space[4],
  marginLeft: "auto",
  height: themeVars.space[10],
  fontSize: themeVars.fontSize.xs,
  color: normalBgVar,
  background: normalTextVar,
  border: "none",
  cursor: "pointer",
  outline: "none",
  transition: "opacity 400ms, box-shadow 200ms",
  selectors: {
    "&:focus-visible": {
      boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.4)",
    },
    "&:first-of-type": {
      marginLeft: "auto",
    },
  },
});

export const toastCancelButton = style([
  toastButton,
  {
    color: colorVar,
    background: borderColorVar,
  },
]);

export const toastCloseButton = style({
  position: "absolute",
  left: 0,
  top: 0,
  height: themeVars.space[9],
  width: themeVars.space[9],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  background: gray1,
  color: gray12,
  border: `1px solid ${gray4}`,
  transform: `translate(-35%, -35%)`,
  borderRadius: `50%`,
  opacity: 0,
  cursor: "pointer",
  zIndex: 1,
  transition: `opacity 100ms, background 200ms, border-color 200ms`,
  selectors: {
    "&:focus-visible": {
      boxShadow:
        "0px 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.2)",
    },
    "&[data-disabled='true']": {
      cursor: "not-allowed",
    },
    [`${toast}:hover &`]: {
      opacity: 1,
    },
    [`${toast}:focus &`]: {
      opacity: 1,
    },
    [`${toast}:focus-within &`]: {
      opacity: 1,
    },
    [`${toast}:hover &:hover`]: {
      background: gray2,
      borderColor: gray5,
    },
  },
});

const rotate = keyframes({
  "0%": { transform: `rotate3d(0, 0, 1, 0deg)` },
  "100%": { transform: `rotate3d(0, 0, 1, 360deg)` },
});

export const toastSpinner = style({
  animation: `${rotate} 500ms linear infinite`,
});
