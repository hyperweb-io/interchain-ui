import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import Stack from "../stack";
import Avatar from "../avatar";
import Spinner from "../spinner";
import Icon from "../icon";
import TextFieldAddon from "../text-field-addon";
import TextField from "../text-field";
import { baseButton } from "../button/button.css";
import { textFieldRoot, chainItem } from "./change-chain-input.css";
import type { ChangeChainInputProps } from "./change-chain-input.types";

function ChangeChainInput(props: ChangeChainInputProps) {
  const { size = "md", placeholder = "Choose a chain" } = props;
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  function getIconSize(size: ChangeChainInputProps["size"]) {
    const sizes: Record<ChangeChainInputProps["size"], string> = {
      sm: "$sm",
      md: "$md",
    };
    return sizes[size ?? "sm"];
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
    <TextField
      type="text"
      size={size}
      intent={props.intent}
      id={props.id}
      label={props.label}
      value={props.value}
      placeholder={props.chainName ? undefined : placeholder}
      onChange={(event) => props.onChange}
      onBlur={(event) => props.onBlur}
      onFocus={(event) => props.onFocus}
      disabled={props.disabled}
      inputContainer={textFieldRoot}
      inputAttributes={props.inputAttributes}
      className={props.className}
      startAddon={
        <div className={chainItem}>
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
      }
      endAddon={
        <TextFieldAddon
          position="end"
          size="sm"
          divider
          intent={props.intent}
          disabled={props.disabled}
        >
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              position="absolute"
              left="-50px"
              width="$11"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {props.isLoading ? <Spinner /> : null}
              {!props.isLoading &&
              props.isClearable &&
              (props.chainName || props.value) ? (
                <button
                  type="button"
                  style={{ backgroundColor: "transparent" }}
                  onClick={(event) => props.onClear?.()}
                  className={baseButton}
                >
                  <Icon name="close" color="$text" size={getIconSize(size)} />
                </button>
              ) : null}
            </Box>
            <button
              type="button"
              disabled={props.disabled}
              style={{ backgroundColor: "transparent" }}
              onClick={(event) => props.onDropdownArrowClicked?.()}
              className={baseButton}
            >
              <Icon
                name="arrowDropDown"
                color="$text"
                size={getIconSize(size)}
              />
            </button>
          </Box>
        </TextFieldAddon>
      }
    />
  );
}

export default ChangeChainInput;
