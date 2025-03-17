import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import type {
  NobleButtonProps,
  NobleButtonVariant,
  NobleButtonSize,
} from "./noble.types";
import type { BoxProps } from "../box/box.types";

function NobleButton(props: NobleButtonProps) {
  const { size = "lg", variant = "solid" } = props;
  const cleanupRef = useRef<(() => void) | null>(null);
  const [theme, setTheme] = useState(() => "light");
  function buttonProps() {
    const {
      leftIcon,
      rightIcon,
      iconSize,
      variant,
      size,
      isActive,
      ...otherProps
    } = props;
    return otherProps;
  }
  function variantStyles() {
    const variantStylesMap: Record<NobleButtonVariant, BoxProps> = {
      solid: {
        bg: { base: "$primary", hover: "$blue700" },
        fontWeight: "$semibold",
        color: "$white",
        ...getSizeStyles(size),
        ...getDisabledStyles(),
      },
      text: {
        bg: "transparent",
        color: "$textSecondary",
        fontSize: "$sm",
        fontWeight: "$normal",
        lineHeight: "$base",
      },
      outlined: {
        color: "$text",
        bg: props.isActive
          ? theme === "light"
            ? "$gray800"
            : "$blue300"
          : { base: "$cardBg", hover: "$body" },
        borderRadius: "$lg",
        borderWidth: props.borderless ? "$none" : "1px",
        borderStyle: "$solid",
        borderColor: "$progressBg",
        fontSize: "$md",
        fontWeight: "$normal",
        lineHeight: "$base",
        ...getSizeStyles(size),
        ...getDisabledStyles(),
      },
      tag: {
        bg: props.isActive
          ? theme === "light"
            ? "$gray400"
            : "$blue700"
          : {
              base: "$progressBg",
              hover: theme === "light" ? "$gray600" : "$blue200",
              active: theme === "light" ? "$gray400" : "$blue700",
            },
        color: props.isActive
          ? theme === "light"
            ? "$textInverse"
            : "$blue200"
          : {
              base: theme === "light" ? "$gray400" : "$textSecondary",
              hover: theme === "light" ? "$gray400" : "$textSecondary",
              active: theme === "light" ? "$textInverse" : "$blue200",
            },
        borderRadius: "$base",
        fontWeight: "$semibold",
        lineHeight: "$base",
        ...getSizeStyles(size),
        ...getDisabledStyles(),
      },
    };
    return variantStylesMap[variant];
  }
  function getDisabledStyles() {
    const isLightTheme = theme === "light";
    if (variant === "solid") {
      return props.disabled
        ? ({
            bg: isLightTheme
              ? { base: "$gray700", hover: "$gray700" }
              : { base: "$blue100", hover: "$blue100" },
            color: isLightTheme ? "$gray600" : "$blue400",
            cursor: "not-allowed",
          } as BoxProps)
        : {};
    }
    if (variant === "tag") {
      return props.disabled
        ? ({ opacity: 0.5, cursor: "not-allowed" } as BoxProps)
        : {};
    } // For text and outlined variants
    return props.disabled
      ? ({
          bg: "$transparent",
          color: "$progressBg",
          cursor: "not-allowed",
        } as BoxProps)
      : {};
  }
  function getSizeStyles(size: NobleButtonSize) {
    const sizeStylesMap: Record<NobleButtonSize, BoxProps> = {
      xs: {
        height: "$11",
        px: "$4",
        py: "$2",
        borderRadius: "$base",
        fontSize: "$sm",
      },
      sm: {
        height: "38px",
        px: "$7",
        py: "$5",
        borderRadius: "$base",
        fontSize: "$sm",
      },
      md: {
        height: "70px",
        px: "$10",
        py: "$10",
        borderRadius: "$base",
        fontSize: "$md",
      },
      lg: {
        height: "$17",
        width: "$full",
        borderRadius: "$md",
        fontSize: "$lg",
      },
      xl: {
        height: "$21",
        p: "$10",
        width: "$full",
        borderRadius: "$md",
        fontSize: "$lg",
      },
    };
    return sizeStylesMap[size];
  }
  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      as="button"
      position="relative"
      fontFamily="$body"
      cursor="pointer"
      appearance="none"
      border="none"
      userSelect="none"
      whiteSpace="nowrap"
      verticalAlign="middle"
      lineHeight="1.2"
      transitionProperty="background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter"
      transitionDuration="200ms"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...variantStyles()}
      {...buttonProps()}
      {...props.attributes}
      attributes={{
        ...props.domAttributes,
        onClick: props.disabled ? undefined : (event) => props.onClick?.(event),
      }}
      className={props.className}
    >
      <Icon
        name={props.leftIcon}
        size={props.iconSize}
        attributes={{
          display: !!props.leftIcon ? "inline-block" : "none",
          marginRight: !props.children ? "$0" : "$2",
        }}
      />
      {props.children}
      <Icon
        name={props.rightIcon}
        size={props.iconSize}
        attributes={{
          display: !!props.rightIcon ? "inline-block" : "none",
          marginLeft: !props.children ? "$0" : "$2",
        }}
      />
    </Box>
  );
}

export default NobleButton;
