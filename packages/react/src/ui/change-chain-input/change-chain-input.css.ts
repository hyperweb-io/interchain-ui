import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";
import { unstyledButton } from "../button/button.css";
import { baseTextStyles } from "../text/text.css";

export const textFieldRoot = style({
  position: "relative",
});

export const chainItem = style({
  position: "absolute",
  zIndex: 2,
  top: "50%",
  transform: "translateY(-50%)",
  left: "20px",
});

export const inputBorderVar = createVar();
export const inputBgVar = createVar();
export const inputTextVar = createVar();

export const rootInput = styleVariants({
  light: {
    position: "relative",
    display: "flex",
    color: inputTextVar,
    vars: {
      [inputBorderVar]: "#E2E8F0",
      [inputBgVar]: themeVars.colors.inputBg,
      [inputTextVar]: themeVars.colors.text,
    },
    selectors: {
      "&:hover": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
      },
      "&[data-is-focused='true']": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
      },
    },
  },
  dark: {
    position: "relative",
    display: "flex",
    color: inputTextVar,
    vars: {
      [inputBorderVar]: themeVars.colors.inputBorder,
      [inputBgVar]: themeVars.colors.inputBg,
      [inputTextVar]: themeVars.colors.text,
    },
    selectors: {
      "&:hover": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
      },
      "&[data-is-focused='true']": {
        vars: {
          [inputBorderVar]: themeVars.colors.text,
        },
      },
    },
  },
});

export const inputBorderAndShadow = style({
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "6px",
  borderColor: inputBorderVar,
  selectors: {
    "&:hover": {
      vars: {
        [inputBorderVar]: themeVars.colors.text,
      },
    },
    "&:focus-visible": {
      vars: {
        [inputBorderVar]: themeVars.colors.text,
      },
    },
  },
});

export const inputRootIntent = styleVariants({
  default: [],
  error: [
    style({
      vars: {
        [inputBorderVar]: themeVars.colors.inputDangerBorder,
        [inputBgVar]: themeVars.colors.inputDangerBg,
      },
    }),
  ],
  disabled: [
    style({
      vars: {
        [inputBorderVar]: "none",
        [inputBgVar]: themeVars.colors.inputDisabledBg,
      },
    }),
  ],
});

export const inputIntent = styleVariants({
  default: [],
  error: [],
  disabled: [
    style({
      color: themeVars.colors.inputDisabledText,
      borderColor: inputBgVar,
    }),
  ],
});

const baseInputStyles = style([
  baseTextStyles,
  inputBorderAndShadow,
  style({
    height: themeVars.space[15],
    paddingLeft: themeVars.space[10],
    paddingRight: themeVars.space[15],
    flex: "1",
    outline: "none",
    position: "relative",
    appearance: "none",
    transitionProperty:
      "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform",
    transitionDuration: "200ms",
    backgroundColor: inputBgVar,
    color: "inherit",
    selectors: {
      "&::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
    },
  }),
]);

export const inputStyles = styleVariants({
  light: [baseInputStyles],
  dark: [
    baseInputStyles,
    style({
      vars: {
        [inputTextVar]: themeVars.colors.textSecondary,
      },
    }),
  ],
});
