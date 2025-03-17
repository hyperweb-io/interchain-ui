import * as React from "react";
import clx from "clsx";
import type { ComboBoxProps } from "@react-types/combobox";
import {
  useComboBoxState,
  useSearchFieldState,
  Item,
  Section,
} from "react-stately";
import { useComboBox, useFilter, useButton, useSearchField } from "react-aria";

import Icon from "@/ui/icon";
import Box from "@/ui/box";
import useTheme from "@/ui/hooks/use-theme";
import type { BoxProps } from "@/ui/box/box.types";
import { inputSizes } from "@/ui/text-field/text-field.css";
import { ComboboxContext } from "./combobox.context";
import { ListBox } from "./list-box";
import { Popover } from "./popover";
import * as styles from "./combobox.css";

const DEFAULT_WIDTH: BoxProps["width"] = "$29";

interface ComboboxProps<T> extends ComboBoxProps<T> {
  defaultIsOpen?: boolean;
  openOnFocus?: boolean;
  size?: "sm" | "md";
  styleProps?: BoxProps;
  inputAddonStart?: React.ReactNode;
  inputAddonEnd?: React.ReactNode;
}

export default function Combobox<T extends object>(props: ComboboxProps<T>) {
  const {
    size = "sm",
    defaultIsOpen = false,
    openOnFocus = false,
    styleProps = {},
    inputAddonStart,
    inputAddonEnd,
    ...comboboxProps
  } = props;

  const { themeClass, theme } = useTheme();
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...comboboxProps, defaultFilter: contains });

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const containerRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...comboboxProps,
      onFocus: () => {
        setIsFocused(true);

        if (openOnFocus) {
          state.open();
        }
      },
      onBlur: () => {
        setIsFocused(false);
      },
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { buttonProps } = useButton(triggerProps, buttonRef);

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  };

  const searchState = useSearchFieldState(searchProps);
  const { clearButtonProps } = useSearchField(
    searchProps,
    searchState,
    inputRef,
  );
  const clearButtonRef = React.useRef(null);

  const { buttonProps: clearButtonAriaProps } = useButton(
    clearButtonProps,
    clearButtonRef,
  );

  React.useEffect(() => {
    if (defaultIsOpen) {
      state.open();
    }
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        size,
      }}
    >
      <Box
        {...styleProps}
        display="inline-flex"
        flexDirection="column"
        position="relative"
        width={styleProps?.width ?? DEFAULT_WIDTH}
        className={clx(themeClass, styleProps.className)}
      >
        {props.label && (
          <Box
            as="label"
            attributes={labelProps}
            display="block"
            fontFamily="$body"
            fontSize="$sm"
            fontWeight="$medium"
            color="$textSecondary"
            textAlign="left"
            marginBottom="$4"
          >
            {props.label}
          </Box>
        )}

        <Box
          boxRef={containerRef}
          position="relative"
          display="flex"
          borderRadius="$md"
          overflow="hidden"
          boxShadow="$sm"
          borderWidth="$sm"
          borderStyle="solid"
          borderColor={state.isFocused ? "$inputBorderFocus" : "$inputBorder"}
          className={clx(styles.comboboxInput[theme])}
          attributes={{
            "data-focused": isFocused,
          }}
        >
          {inputAddonStart && (
            <Box
              paddingLeft="$2"
              paddingY="$2"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="$3xl"
            >
              {inputAddonStart}
            </Box>
          )}

          <Box
            as="input"
            attributes={inputProps}
            boxRef={inputRef}
            outline="none"
            paddingX="$5"
            paddingY="$2"
            width="$full"
            border="none"
            backgroundColor="$transparent"
            className={clx(styles.comboboxInputElement, {
              [inputSizes.sm]: size === "sm",
              [inputSizes.md]: size === "md",
              [styles.noStartPadding]: !!inputAddonStart,
              [styles.noEndPadding]: !!inputAddonEnd,
            })}
          />

          {inputAddonEnd && (
            <Box
              paddingRight="$2"
              paddingY="$2"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {inputAddonEnd}
            </Box>
          )}

          <button
            ref={clearButtonRef}
            {...clearButtonAriaProps}
            className={styles.comboboxInlineButton}
            data-bg="true"
            data-size={size}
            data-hidden={!state.inputValue}
          >
            <Icon
              name="close"
              color="$textPlaceholder"
              size="inherit"
              attributes={{
                zIndex: "$10",
              }}
              domAttributes={{
                "aria-hidden": true,
              }}
            />
          </button>

          <button
            {...buttonProps}
            ref={buttonRef}
            className={styles.comboboxInlineButton}
            data-size={size}
          >
            <Icon
              name="arrowDownS"
              color="$textPlaceholder"
              size="inherit"
              attributes={{
                zIndex: "$10",
              }}
              domAttributes={{
                "aria-hidden": true,
              }}
            />
          </button>
        </Box>

        {state.isOpen && (
          <Popover
            popoverRef={popoverRef}
            triggerRef={containerRef}
            state={state}
            isNonModal
            placement="bottom start"
            className={clx(themeClass, styles.comboboxPopover)}
          >
            <Box pt="$5" borderRadius="$lg" backgroundColor="$transparent">
              <ListBox
                {...listBoxProps}
                listBoxRef={listBoxRef}
                state={state}
                styleProps={{
                  width: styleProps?.width ?? DEFAULT_WIDTH,
                }}
              />
            </Box>
          </Popover>
        )}
      </Box>
    </ComboboxContext.Provider>
  );
}

Combobox.Item = Item;
Combobox.Section = Section;
