import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import FieldLabel from "../field-label";
import Stack from "../stack";
import Avatar from "../avatar";
import Spinner from "../spinner";
import Icon from "../icon";
import { visuallyHidden } from "../shared/shared.css";
import { baseButton } from "../button/button.css";
import * as styles from "./change-chain-input.css";
import type { ThemeVariant } from "../../models/system.model";
import {
  validTypes,
  defaultInputModesForType,
} from "../text-field/text-field.types";
import type { ChangeChainInputBoldProps } from "./change-chain-input.types";

function ChangeChainInputBold(props: ChangeChainInputBoldProps) {
  const { placeholder = "Choose a chain" } = props;
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
        data-is-focused={isFocused}
        className={clx(
          styles.rootInput[theme],
          props.disabled
            ? styles.inputRootIntent.disabled
            : styles.inputRootIntent[props.intent]
        )}
      >
        <div className={styles.chainItem}>
          {props.chainName ? (
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                alignItems: "center",
                display: props.showSelectedItem ? "flex" : "none",
              }}
            >
              <Avatar
                size="xs"
                name={props.chainName}
                getInitials={name[0]}
                src={props.iconUrl}
              />
              <Text fontSize="$sm" fontWeight="$normal" color="$text">
                {props.chainName}
              </Text>
            </Stack>
          ) : null}
        </div>
        <input
          {...props.inputAttributes}
          id={props.id}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
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
          placeholder={
            !props.disabled && !props.chainName ? placeholder : undefined
          }
          inputMode={props.inputMode || defaultInputModesForType[props.type]}
          className={clx(
            styles.inputStyles[theme],
            props.disabled
              ? styles.inputIntent.disabled
              : styles.inputIntent[props.intent]
          )}
        />
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          top="50%"
          transform="translateY(-50%)"
          px="$4"
          right={0}
          attributes={{ "data-part-id": "dropdown-arrow" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            attributes={{ "data-is-loading": props.isLoading }}
          >
            <button
              type="button"
              disabled={props.disabled || props.isLoading}
              style={{ backgroundColor: "transparent" }}
              onClick={(event) => {
                if (props.isLoading) return;
                props.onClear?.();
              }}
              className={clx(baseButton, {
                [visuallyHidden]: !props.isLoading && !props.isClearable,
              })}
            >
              <Box className={clx({ [visuallyHidden]: !props.isLoading })}>
                <Spinner color="$textPlaceholder" />
              </Box>
              <Icon
                name="close"
                color="$text"
                size="$3xl"
                className={clx({
                  [visuallyHidden]: !props.chainName && !props.value,
                })}
              />
            </button>
          </Box>
          <button
            type="button"
            disabled={props.disabled}
            style={{ backgroundColor: "transparent" }}
            onClick={(event) => props.onDropdownArrowClicked?.()}
            className={baseButton}
          >
            <Icon name="arrowDropDown" color="$text" size="$3xl" />
          </button>
        </Box>
      </div>
    </Stack>
  );
}

export default ChangeChainInputBold;
