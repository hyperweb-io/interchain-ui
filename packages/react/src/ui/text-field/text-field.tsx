import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Stack from "../stack";
import FieldLabel from "../field-label";
import TextFieldAddon from "../text-field-addon";
import Icon from "../icon";
import { store } from "../../models/store";
import {
  inputStyles,
  inputSizes,
  inputIntent,
  inputRootIntent,
  clearIcon,
  rootInput,
  rootInputFocused,
  clearButton,
} from "./text-field.css";
import { validTypes, defaultInputModesForType } from "./text-field.types";
import type { ThemeVariant } from "../../models/system.model";
import type { TextFieldProps } from "./text-field.types";

function TextField(props: TextFieldProps) {
  const { type = "text", size = "sm", intent = "default" } = props;
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  const [isFocused, setIsFocused] = useState(() => false);
  function isClearable() {
    return (
      typeof props.onClear !== "undefined" &&
      !props.disabled &&
      typeof props.value === "string" &&
      props.value.length > 0
    );
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
    <Stack
      direction="vertical"
      space="$4"
      attributes={props.attributes}
      className={props.className}
    >
      {props.label ? (
        <FieldLabel
          id={props.labelId ?? `${props.id}-label`}
          htmlFor={props.id}
          label={props.label}
        />
      ) : null}
      <div
        className={clx(
          rootInput,
          isFocused ? rootInputFocused : null,
          props.disabled ? inputRootIntent.disabled : inputRootIntent[intent],
          props.inputContainer
        )}
      >
        {props.startAddon ? <>{props.startAddon}</> : null}
        <input
          {...props.inputAttributes}
          id={props.id}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          readOnly={props.readonly}
          disabled={props.disabled}
          type={validTypes[type]}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.inputAttributes?.onChange?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
            props.inputAttributes?.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
            props.inputAttributes?.onBlur?.(e);
          }}
          placeholder={!props.disabled ? props.placeholder : undefined}
          inputMode={props.inputMode || defaultInputModesForType[type]}
          className={clx(
            inputStyles[theme],
            inputSizes[size],
            props.disabled ? inputIntent.disabled : inputIntent[intent],
            props.inputClassName
          )}
        />
        {isClearable() ? (
          <TextFieldAddon
            position="end"
            divider
            intent={intent}
            disabled={props.disabled}
            size={size}
          >
            <button
              type="button"
              onClick={(event) => props.onClear?.()}
              className={clearButton}
            >
              <Icon name="close" className={clearIcon} />
            </button>
          </TextFieldAddon>
        ) : null}
        {props.endAddon ? <>{props.endAddon}</> : null}
      </div>
    </Stack>
  );
}

export default TextField;
