import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Box from "../box";
import Stack from "../stack";
import FieldLabel from "../field-label";
import {
  validTypes,
  defaultInputModesForType,
} from "../text-field/text-field.types";
import { store } from "../../models/store";
import * as styles from "./noble.css";
import type { NobleInputProps } from "./noble.types";

function NobleInput(props: NobleInputProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  const [isFocused, setIsFocused] = useState(() => false);

  function inputVariantProps() {
    if (props.size === "md") {
      return {
        fontSize: "$3xl",
        fontWeight: "$semibold",
        height: "$21",
        px: "$10",
        py: "$10",
      };
    }
    return {
      fontSize: "$sm",
      fontWeight: "$normal",
      height: "$16",
      px: "$8",
      py: "$8",
    };
  }

  function borderProps() {
    const hasIntent = props.intent != null;
    const borderColorDefault = isFocused
      ? "$inputBorderFocus"
      : {
          base: "$inputBorder",
          hover: "$textSecondary",
        };
    const borderColorIntents = {
      success: "$textSuccess",
      error: "$textDanger",
    };
    return {
      borderRadius: "$lg",
      borderWidth: hasIntent ? "$base" : "$sm",
      borderStyle: "$solid",
      borderColor: hasIntent
        ? borderColorIntents[props.intent]
        : borderColorDefault,
    };
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
      space="$8"
      attributes={props.attributes}
      className={props.className}
    >
      <Box {...props.labelContainerProps}>
        {props.label && typeof props.label === "string" ? (
          <FieldLabel
            id={props.labelId ?? `${props.id}-label`}
            htmlFor={props.id}
            label={props.label}
          />
        ) : null}
        {props.label && typeof props.label !== "string" ? (
          <>{props.label}</>
        ) : null}
        {props.labelExtra ? <>{props.labelExtra}</> : null}
      </Box>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        color="$text"
        backgroundColor="$inputBg"
        transition="all 0.2s ease-in-out"
        {...borderProps()}
        {...inputVariantProps()}
        {...props.inputContainerProps}
      >
        {props.startAddon ? (
          <Box flexGrow={0} flexShrink={0}>
            {props.startAddon}
          </Box>
        ) : null}
        <input
          {...props.inputAttributes}
          id={props.id}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          readOnly={props.readonly}
          type={validTypes[props.type]}
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
          inputMode={props.inputMode || defaultInputModesForType[props.type]}
          data-size={props.size ?? "md"}
          data-disabled={props.disabled}
          data-align={props.inputTextAlign}
          className={clx(styles.inputBase, props.inputClassName)}
        />
        {props.endAddon ? <>{props.endAddon}</> : null}
      </Box>
      {!!props.helperText ? <>{props.helperText}</> : null}
    </Stack>
  );
}

export default NobleInput;
