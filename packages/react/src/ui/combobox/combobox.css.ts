import { style, styleVariants } from "@vanilla-extract/css";
import { scrollBar } from "@/ui/shared/shared.css";
import { themeVars } from "@/styles/themes.css";
import {
  inputBorderVar,
  inputBgVar,
  inputRingShadowVar,
} from "@/ui/text-field/text-field.css";
import { baseTextStyles } from "@/ui/text/text.css";
import { listBoxBaseWithShadow } from "@/ui/select/select.css";
import { unstyledButton } from "@/ui/button/button.css";

export const inputBorderAndShadow = style({
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "6px",
  borderColor: inputBorderVar,
  vars: {
    [inputBgVar]: themeVars.colors.inputBg,
    [inputBorderVar]: themeVars.colors.inputBorder,
  },
  selectors: {
    "&:hover": {
      vars: {
        [inputBorderVar]: themeVars.colors.text,
      },
    },
    '&[data-focused="true"]': {
      vars: {
        [inputBorderVar]: themeVars.colors.inputBorderFocus,
        [inputRingShadowVar]: `${themeVars.colors.inputBg} 0px 0px 0px 0px, ${themeVars.colors.textPlaceholder} 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`,
      },
      outline: `2px solid transparent`,
      outlineOffset: "2px",
      boxShadow: inputRingShadowVar,
    },
  },
});

const baseInputStyles = style([
  baseTextStyles,
  inputBorderAndShadow,
  style({
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

export const comboboxInput = styleVariants({
  light: [
    baseInputStyles,
    style({
      color: themeVars.colors.text,
    }),
  ],
  dark: [
    baseInputStyles,
    style({
      color: themeVars.colors.textSecondary,
    }),
  ],
});

export const comboboxInputElement = style({
  color: "inherit",
  boxShadow: "none !important",
  appearance: "none",
});

export const comboboxPopover = style({
  borderRadius: themeVars.radii.lg,
});

export const listboxStyle = styleVariants({
  light: [
    listBoxBaseWithShadow,
    scrollBar.light,
    style({
      borderColor: "#D1D6DD",
    }),
  ],
  dark: [
    listBoxBaseWithShadow,
    scrollBar.dark,
    style({
      borderColor: "#434B55",
    }),
  ],
});

export const noStartPadding = style({
  paddingLeft: "0 !important",
});

export const noEndPadding = style({
  paddingLeft: "0 !important",
});

export const comboboxInlineButton = style([
  unstyledButton,
  {
    transitionProperty: "background-color,color",
    transitionDuration: "200ms",
    paddingLeft: themeVars.space[4],
    paddingRight: themeVars.space[4],
    flexShrink: 0,
    position: "relative",
    selectors: {
      '&[data-hidden="true"]': {
        visibility: "hidden",
      },
      '&[data-hidden="false"]': {
        visibility: "visible",
      },
      '&[data-size="sm"]': {
        fontSize: themeVars.fontSize["4xl"],
        width: themeVars.space[13],
      },
      '&[data-size="md"]': {
        fontSize: themeVars.fontSize["4xl"],
        width: themeVars.space[14],
      },
      '&[data-bg="true"]:hover:before': {
        position: "absolute",
        zIndex: 0,
        transitionProperty: "background-color,color",
        transitionDuration: "200ms",
        content: '""',
        top: "50%",
        bottom: 0,
        left: "50%",
        right: 0,
        transform: "translate(-50%, -50%)",
        borderRadius: "100%",
        backgroundColor: themeVars.colors.menuItemBgHovered,
      },
      '&[data-bg="true"][data-size="sm"]:hover:before': {
        height: themeVars.space[12],
        width: themeVars.space[12],
      },
      '&[data-bg="true"][data-size="md"]:hover:before': {
        height: themeVars.space[13],
        width: themeVars.space[13],
      },
    },
  },
]);
