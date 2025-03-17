import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import Spinner from "../spinner";
import { store, UIState } from "../../models/store";
import { recipe, buttonOverrides } from "./button.helper";
import { isDefaultAccent, getAccentHover } from "../../helpers/style";
import { themeVars } from "../../styles/themes.css";
import { fullWidth, fullWidthHeight } from "../shared/shared.css";
import type { UnknownRecord } from "../../helpers/types";
import type { ButtonProps } from "./button.types";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./button.css";

function Button(props: ButtonProps) {
  const {
    as = "button",
    size = "md",
    intent = "primary",
    variant = "solid",
    spinnerPlacement = "start",
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const [isMounted, setIsMounted] = useState(() => false);
  const [_overrideManager, set_overrideManager] = useState(() => null);
  const [_theme, set_theme] = useState(() => "light");
  const [_themeAccent, set_themeAccent] = useState(() => null);
  function getStoreState() {
    // This seems weird but it's a workaround for one minor bug from mitosis // If we have any variables in any function scope that has the same name as the store state, mitosis understands that it's the same variable
    // and will attempt to transform those unwanted/unrelated variables into the ones in the state.<variable>
    // So we need to name these values differently (e.g. _keyA: valueA) or inverse
    return {
      theme: store.getState().theme,
      themeAccent: store.getState().themeAccent,
      overrideStyleManager: store.getState().overrideStyleManager,
    };
  }
  function getVars() {
    const accent = _themeAccent;
    const isDefaultAppearance = isDefaultAccent(accent) && accent === "blue"; // Only allow accent customization for 'primary' Intent
    const isPrimaryIntent = intent === "primary";
    return isDefaultAppearance || !isPrimaryIntent
      ? _overrideManager?.applyOverrides(buttonOverrides.name)
      : assignInlineVars({
          [styles.buttonBgVar]: themeVars.colors.accent,
          [styles.buttonTextColorVar]: themeVars.colors.accentText,
          [styles.buttonHoverBgVar]: getAccentHover(themeVars.colors.accent),
        });
  }
  function combinedClassName() {
    return clx(
      styles.buttonSize[size],
      recipe({
        as: as,
        variant: variant,
        intent: intent ?? "primary",
        isDisabled: props.disabled || props.isLoading,
        theme: isMounted ? getStoreState().theme : "light",
      }),
      props.fluidWidth ? fullWidth : null,
      props.fluid ? fullWidthHeight : null,
      props.className
    );
  }
  function spreadAttributes() {
    return Object.assign(
      { as: as },
      {
        attributes: {
          ...props.attributes,
          disabled: props.disabled, // style: state.getVars(),
          ...props.domAttributes,
        },
      }
    );
  }
  function eventHandlers() {
    const handlers: Record<string, (event: any) => void> = {};
    const eventProps = [
      "onClick",
      "onDoubleClick",
      "onMouseDown",
      "onMouseUp",
      "onMouseEnter",
      "onMouseLeave",
      "onMouseMove",
      "onMouseOver",
      "onMouseOut",
      "onKeyDown",
      "onKeyUp",
      "onKeyPress",
      "onFocus",
      "onBlur",
      "onInput",
      "onChange",
      "onSubmit",
      "onReset",
      "onScroll",
      "onWheel",
      "onDragStart",
      "onDrag",
      "onDragEnd",
      "onDragEnter",
      "onDragLeave",
      "onDragOver",
      "onDrop",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onTouchCancel",
    ];
    eventProps.forEach((eventName) => {
      if (props[eventName]) {
        handlers[eventName] = (event: any) => props[eventName](event);
      }
    });
    return handlers;
  }
  useEffect(() => {
    const uiStore = getStoreState();
    setIsMounted(true);
    set_theme(uiStore[0]);
    set_themeAccent(uiStore[1]);
    set_overrideManager(uiStore[2]);
    cleanupRef.current = store.subscribe((newState, prevState) => {
      set_theme(newState.theme);
      set_themeAccent(newState.themeAccent);
      set_overrideManager(newState.overrideStyleManager);
    });
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);
  return (
    <Box
      boxRef={props.buttonRef}
      {...spreadAttributes()}
      {...eventHandlers()}
      className={combinedClassName()}
    >
      <Spinner
        size={props.iconSize}
        attributes={{
          display:
            props.isLoading && spinnerPlacement === "start"
              ? "inline-block"
              : "none",
        }}
      />
      <Icon
        name={props.leftIcon}
        size={props.iconSize}
        attributes={{
          display:
            !!props.leftIcon && !props.isLoading ? "inline-block" : "none",
          marginRight: !props.children ? "$0" : "$2",
        }}
      />
      {!props.isLoading ? <>{props.children}</> : null}
      <Icon
        name={props.rightIcon}
        size={props.iconSize}
        attributes={{
          display:
            !!props.rightIcon && !props.isLoading ? "inline-block" : "none",
          marginLeft: !props.children ? "$0" : "$2",
        }}
      />
      <Spinner
        size={props.iconSize}
        attributes={{
          display:
            props.isLoading && spinnerPlacement === "end"
              ? "inline-block"
              : "none",
        }}
      />
    </Box>
  );
}
export default Button;
