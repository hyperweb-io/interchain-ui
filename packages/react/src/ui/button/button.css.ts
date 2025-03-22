import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
// import { baseLayer } from "../../styles/layers.css";

export const buttonBgVar = createVar();
export const buttonHoverBgVar = createVar();
export const buttonTextColorVar = createVar();
export const buttonHoverTextColorVar = createVar();

export const baseButton = style({
  fontFamily: themeVars.font.body,
  fontWeight: themeVars.fontWeight.semibold,
  cursor: "pointer",
  appearance: "none",
  border: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  transitionProperty:
    "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter",
  transitionDuration: "200ms",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});

export const baseAnchorButton = style([
  baseButton,
  { display: "inline-flex", textDecoration: "none" },
]);

export const unstyledButton = style([
  baseButton,
  {
    background: "transparent",
    color: "inherit",
  },
]);

export const variants = styleVariants({
  solid: [
    {
      borderRadius: themeVars.radii.md,
      fontWeight: themeVars.fontWeight.semibold,
    },
  ],
  outlined: [
    {
      borderRadius: themeVars.radii.md,
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: buttonTextColorVar,
      outlineOffset: "-2px",
      background: "none !important",
      color: `${buttonTextColorVar} !important`,
      selectors: {
        "&:not([disabled]):hover": {
          opacity: 0.8,
        },
        "&:focus": {
          outline: `2px solid ${buttonTextColorVar}`,
        },
      },
    },
  ],
  link: [],
  ghost: [
    {
      borderRadius: themeVars.radii.md,
      fontWeight: themeVars.fontWeight.semibold,
      backgroundColor: "transparent !important",
      selectors: {
        "&:not([disabled]):hover": {
          backgroundColor: `${buttonHoverBgVar} !important`,
        },
      },
    },
  ],
  unstyled: [
    style({
      backgroundColor: "transparent !important",
      color: `${themeVars.colors.text} !important`,
    }),
  ],
});

export const buttonSize = styleVariants({
  xs: {
    padding: `0px ${themeVars.space["4"]}`,
    fontSize: themeVars.fontSize.xs,
    height: themeVars.space["10"],
    minWidth: themeVars.space["10"],
    borderRadius: themeVars.radii.base,
  },
  sm: {
    padding: `0px ${themeVars.space["6"]}`,
    fontSize: themeVars.fontSize.sm,
    height: themeVars.space["12"],
    minWidth: themeVars.space["12"],
  },
  md: {
    padding: `0px ${themeVars.space["9"]}`,
    fontSize: themeVars.fontSize.md,
    height: themeVars.space["15"],
    minWidth: themeVars.space["15"],
  },
  lg: {
    padding: `0px ${themeVars.space["10"]}`,
    fontSize: themeVars.fontSize.lg,
    height: themeVars.space["17"],
    minWidth: themeVars.space["17"],
  },
});

// ==== Intents
const intentPrimaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:not([disabled]):hover": {
      opacity: 0.8,
    },
  },
});

export const intentPrimary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.primary,
        [buttonHoverBgVar]: themeVars.colors.primary,
      },
    }),
    intentPrimaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.primary,
        [buttonHoverBgVar]: themeVars.colors.primary,
      },
    }),
    intentPrimaryBase,
  ],
});

// ====
const intentSecondaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:not([disabled]):hover": {
      color: buttonHoverTextColorVar,
      backgroundColor: buttonHoverBgVar,
    },
  },
});

export const intentSecondary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.gray600,
        [buttonBgVar]: themeVars.colors.gray100,
        [buttonHoverBgVar]: themeVars.colors.gray200,
        [buttonHoverTextColorVar]: themeVars.colors.gray700,
      },
    }),
    intentSecondaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.text,
        [buttonBgVar]: themeVars.colors.blackAlpha400,
        [buttonHoverBgVar]: "rgba(143,153,168, .15)",
        [buttonHoverTextColorVar]: themeVars.colors.text,
      },
    }),
    intentSecondaryBase,
  ],
});

// ====
const intentTertiaryBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:not([disabled]):hover": {
      opacity: 0.8,
    },
  },
});

export const intentTertiary = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.inputBg,
        [buttonBgVar]: themeVars.colors.text,
      },
    }),
    intentTertiaryBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.cardBg,
        [buttonBgVar]: themeVars.colors.text,
      },
    }),
    intentTertiaryBase,
  ],
});

// ====
const intentTextBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:not([disabled]):hover": {
      opacity: 0.8,
    },
  },
});

export const intentText = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.textSecondary,
        [buttonBgVar]: themeVars.colors.cardBg,
      },
    }),
    intentTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.textSecondary,
        [buttonBgVar]: themeVars.colors.cardBg,
      },
    }),
    intentTextBase,
  ],
});

// ==== Intent warning
const intentColorfulBase = style({
  color: buttonTextColorVar,
  backgroundColor: buttonBgVar,
  selectors: {
    "&:not([disabled]):hover": {
      opacity: 0.8,
    },
  },
});

export const intentWarning = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.yellow500,
      },
    }),
    intentColorfulBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.blackPrimary,
        [buttonBgVar]: themeVars.colors.yellow400,
      },
    }),
    intentColorfulBase,
  ],
});

// ==== Intent success
export const intentSuccess = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.green500,
      },
    }),
    intentColorfulBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.text,
        [buttonBgVar]: themeVars.colors.green400,
      },
    }),
    intentColorfulBase,
  ],
});

// ==== Intent danger
export const intentDanger = styleVariants({
  light: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.white,
        [buttonBgVar]: themeVars.colors.red500,
      },
    }),
    intentColorfulBase,
  ],
  dark: [
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.text,
        [buttonBgVar]: themeVars.colors.red400,
      },
    }),
    intentColorfulBase,
  ],
});

export const disabled = style({
  position: "relative",
  opacity: 0.6,
  cursor: "not-allowed !important",
});
