import { style, createVar, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export const buttonHoverShadowVar = createVar();
export const buttonFocusShadowVar = createVar();
export const buttonTextColorVar = createVar();
export const buttonBgVar = createVar();
export const buttonHoverBgVar = createVar();
export const buttonFocusBgVar = createVar();

const transitionProperty =
  "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform";

const connectButtonShapeVariants = {
  square: style({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100px",
    maxWidth: "140px",
    height: "140px",
    padding: themeVars.space[2],
  }),
  list: style({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "auto",
    height: "52px",
    padding: themeVars.space[4],
  }),
};

const connectButtonBase = style({
  fontFamily: themeVars.font.body,
  fontWeight: themeVars.fontWeight.semibold,
  borderRadius: themeVars.radii.md,
  cursor: "pointer",
  appearance: "none",
  border: "none",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: 1.2,
  display: "flex",
  vars: {
    [buttonHoverShadowVar]: "0 0 0 1px #6A66FF",
    [buttonFocusShadowVar]: "0 0 0 1px #6A66FF",
  },
  selectors: {
    "&:hover": {
      transitionProperty: transitionProperty,
      transitionDuration: "200ms",
      boxShadow: buttonHoverShadowVar,
    },
    "&:focus": {
      transitionProperty: transitionProperty,
      transitionDuration: "200ms",
      boxShadow: buttonFocusShadowVar,
    },
  },
});

export const connectButtonStyle = styleVariants({
  light: [
    connectButtonBase,
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.blackAlpha800,
        [buttonBgVar]: themeVars.colors.gray100,
        [buttonHoverBgVar]: themeVars.colors.gray50,
        [buttonFocusBgVar]: themeVars.colors.gray50,
      },
      color: buttonTextColorVar,
      backgroundColor: buttonBgVar,
      selectors: {
        "&:hover": {
          backgroundColor: buttonHoverBgVar,
        },
        "&:focus": {
          backgroundColor: buttonFocusBgVar,
        },
      },
    }),
  ],
  dark: [
    connectButtonBase,
    style({
      vars: {
        [buttonTextColorVar]: themeVars.colors.whiteAlpha800,
        [buttonBgVar]: themeVars.colors.blackAlpha500,
        [buttonHoverBgVar]: themeVars.colors.blackAlpha600,
        [buttonFocusBgVar]: themeVars.colors.blackAlpha600,
      },
      color: buttonTextColorVar,
      backgroundColor: buttonBgVar,
      selectors: {
        "&:hover": {
          backgroundColor: buttonHoverBgVar,
        },
        "&:focus": {
          backgroundColor: buttonFocusBgVar,
        },
      },
    }),
  ],
});

export const connectButtonVariants = recipe({
  base: {},
  variants: {
    variant: connectButtonShapeVariants,
  },
  defaultVariants: {
    variant: "square",
  },
});

export type ConnectButtonVariants = RecipeVariants<
  typeof connectButtonVariants
>;

const logoVariant = {
  square: style({
    width: themeVars.space[16],
    height: themeVars.space[16],
    marginBottom: themeVars.space[5],
  }),
  list: style({
    width: themeVars.space[12],
    height: themeVars.space[12],
    marginRight: themeVars.space[8],
  }),
};

export const logoVariants = recipe({
  base: style({
    position: "relative",
  }),
  variants: {
    variant: logoVariant,
  },
  defaultVariants: {
    variant: "square",
  },
});

// ==== Button label
export const buttonLabelColorVar = createVar();

const buttonTextBase = style({
  fontFamily: themeVars.font.body,
  textAlign: "left",
  fontSize: themeVars.fontSize.sm,
  fontWeight: themeVars.fontWeight.normal,
  color: buttonLabelColorVar,
});

export const buttonTextStyle = styleVariants({
  light: [
    style({
      vars: {
        [buttonLabelColorVar]: themeVars.colors.blackAlpha800,
      },
    }),
    buttonTextBase,
  ],
  dark: [
    style({
      vars: {
        [buttonLabelColorVar]: themeVars.colors.whiteAlpha900,
      },
    }),
    buttonTextBase,
  ],
});

export const buttonTextVariants = recipe({
  base: {},
  variants: {
    variant: {
      square: {},
      list: style({
        flex: 1,
      }),
    },
  },
  defaultVariants: {
    variant: "square",
  },
});

export const buttonSublogoBgVar = createVar();
export const buttonSublogoBorderVar = createVar();

// ==== Button sub logo
const subLogoBase = style({
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  border: "2px solid",
  right: "-8px",
  bottom: "-8px",
  borderRadius: themeVars.radii.full,
  backgroundColor: buttonSublogoBgVar,
  borderColor: buttonSublogoBorderVar,
});

export const subLogoSquare = styleVariants({
  light: [
    style({
      vars: {
        [buttonSublogoBgVar]: themeVars.colors.gray100,
        [buttonSublogoBorderVar]: themeVars.colors.gray100,
      },
    }),
    subLogoBase,
  ],
  dark: [
    style({
      vars: {
        [buttonSublogoBgVar]: themeVars.colors.gray700,
        [buttonSublogoBorderVar]: themeVars.colors.gray700,
      },
    }),
    subLogoBase,
  ],
});

export const subLogoList = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "transparent",
  borderRadius: themeVars.radii.full,
  marginRight: themeVars.space[2],
});
