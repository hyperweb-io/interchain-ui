import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { themeVars } from "../../styles/themes.css";

const variant = {
  body: style({
    fontSize: themeVars.fontSize.sm,
    color: themeVars.colors.text,
    fontWeight: themeVars.fontWeight.normal,
    lineHeight: themeVars.lineHeight.normal,
  }),
  heading: style({
    fontSize: themeVars.fontSize.md,
    color: themeVars.colors.text,
    fontWeight: themeVars.fontWeight.semibold,
    lineHeight: themeVars.lineHeight.tall,
  }),
};

export const baseTextStyles = style({
  fontFamily: themeVars.font.body,
});

export const textTransformStyle = styleVariants({
  ellipsis: [
    baseTextStyles,
    style({
      textOverflow: `ellipsis`,
      overflow: `hidden`,
      whiteSpace: `nowrap`,
    }),
  ],
  underline: [
    baseTextStyles,
    style({
      textDecoration: `underline`,
    }),
  ],
});

export const variants = recipe({
  base: baseTextStyles,
  variants: {
    variant,
    ellipsis: {
      true: style({
        textOverflow: `ellipsis`,
        overflow: `hidden`,
        whiteSpace: `nowrap`,
      }),
    },
    underline: {
      true: style({
        textDecoration: `underline`,
      }),
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type Variants = RecipeVariants<typeof variants>;
