import clx from "clsx";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { ThemeVariant } from "../../models/system.model";
import {
  variants,
  intentPrimary,
  intentSecondary,
  intentTertiary,
  intentText,
  intentWarning,
  intentSuccess,
  intentDanger,
  disabled,
  baseButton,
  buttonBgVar,
  buttonHoverBgVar,
  buttonTextColorVar,
  buttonHoverTextColorVar,
  baseAnchorButton,
} from "./button.css";
import { ComponentOverrideSchema } from "../../styles/override/override.types";
import { ButtonProps } from "./button.types";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant =
  | "solid"
  | "outlined"
  | "link"
  | "ghost"
  | "unstyled";

export type ButtonIntent =
  | "primary"
  | "secondary"
  | "tertiary"
  | "text"
  | "warning"
  | "success"
  | "danger";

const buttonSize: Record<ButtonSize, Sprinkles> = {
  xs: {
    px: "$4",
    gap: "$2",
    fontSize: "$xs",
    height: "$10",
    minWidth: "$10",
  },
  sm: {
    px: "$6",
    gap: "$2",
    fontSize: "$sm",
    height: "$12",
    minWidth: "$12",
  },
  md: {
    px: "$8",
    gap: "$2",
    fontSize: "$md",
    height: "$14",
    minWidth: "$14",
  },
  lg: {
    px: "$10",
    gap: "$2",
    fontSize: "$lg",
    height: "$15",
    minWidth: "$15",
  },
};

export function getSize(size: ButtonSize): Sprinkles {
  return buttonSize[size];
}

export function recipe({
  as,
  variant,
  intent,
  isDisabled,
  theme,
}: {
  as: ButtonProps["as"];
  variant: ButtonVariant;
  intent: ButtonIntent;
  isDisabled: boolean;
  theme: ThemeVariant;
}) {
  const intentMap: Record<ButtonIntent, typeof intentPrimary> = {
    primary: intentPrimary,
    secondary: intentSecondary,
    tertiary: intentTertiary,
    warning: intentWarning,
    success: intentSuccess,
    danger: intentDanger,
    text: intentText,
  };

  const intentVariants = intentMap[intent];
  const intentClass = intentVariants
    ? intentVariants[theme]
    : intentPrimary[theme];

  return clx(
    as === "a" ? baseAnchorButton : baseButton,
    intentClass,
    intent === "tertiary" && variant === "outlined" ? null : variants[variant],
    isDisabled ? disabled : null,
  );
}

export const buttonOverrides: ComponentOverrideSchema = {
  name: "button",
  overrides: [
    [buttonBgVar, "bg"],
    [buttonHoverBgVar, "hoverBg"],
    [buttonTextColorVar, "color"],
    [buttonHoverTextColorVar, "hoverColor"],
  ],
};
