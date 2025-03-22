import * as React from "react";
import clx from "clsx";
import type { ComboBoxProps } from "@react-types/combobox";
import {
  useComboBoxState,
  useSearchFieldState,
  Item,
  Section,
} from "react-stately";
import { useComboBox, useFilter, useSearchField } from "react-aria";

import Icon from "@/ui/icon";
import Box from "@/ui/box";
import type { BoxProps } from "@/ui/box/box.types";
import { ListBox } from "./list-box";
import * as styles from "./noble-chain-combobox.css";

const DEFAULT_WIDTH: BoxProps["width"] = "$29";

interface ComboboxProps<T> extends ComboBoxProps<T> {
  defaultIsOpen?: boolean;
  styleProps?: BoxProps;
}

function useMeasure() {
  const [dimensions, setDimensions] = React.useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const previousObserver = React.useRef(null);

  const customRef = React.useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions] as const;
}

export default function NobleChainCombobox<T extends object>(
  props: ComboboxProps<T>,
) {
  const {
    styleProps,
    defaultIsOpen = true,
    label = "Select chain",
    ...comboboxProps
  } = props;
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({
    ...comboboxProps,
    defaultFilter: contains,
    allowsEmptyCollection: true,
  });

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const containerRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const [popoverRef] = React.useState<HTMLDivElement>(
    document.createElement("div"),
  );

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...comboboxProps,
      label,
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: () => {
        setIsFocused(false);
      },
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef: { current: popoverRef },
    },
    state,
  );

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label ?? "Select chain",
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  };

  const searchState = useSearchFieldState(searchProps);

  const [measureRef, dimensions] = useMeasure();

  useSearchField(searchProps, searchState, inputRef);

  // Keep the listbox open
  React.useEffect(() => {
    if (defaultIsOpen) {
      state.open();
    }
  }, []);

  const inputBorderBottomRadius = state.isOpen
    ? state.collection.size === 0
      ? "8px"
      : "$none"
    : "8px";

  return (
    <Box
      {...styleProps}
      display="flex"
      flexDirection="column"
      position="relative"
      width={styleProps?.width ?? DEFAULT_WIDTH}
      className={clx(styleProps.className)}
    >
      <label {...labelProps} className={styles.label}>
        {props.label}
      </label>

      <div ref={measureRef}>
        <Box
          position="relative"
          display="flex"
          height="53px"
          alignItems="center"
          backgroundColor="$inputBg"
          boxShadow="$sm"
          borderWidth="$sm"
          borderStyle="solid"
          borderColor="$inputBorder"
          borderRadius="8px"
          borderBottomLeftRadius={inputBorderBottomRadius}
          borderBottomRightRadius={inputBorderBottomRadius}
          boxRef={containerRef}
          attributes={{
            "data-focused": isFocused,
          }}
        >
          <Box
            paddingLeft="$9"
            paddingY="$9"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="magnifier" color="$textSecondary" size="$md" />
          </Box>

          <Box
            as="input"
            attributes={inputProps}
            boxRef={inputRef}
            outline="none"
            paddingX="$5"
            paddingY="$2"
            width="$full"
            border="none"
            color="$textSecondary"
            backgroundColor="$inputBg"
            transition="all 0.2s ease-in-out"
            className={clx(styles.baseInputStyles)}
          />
        </Box>
      </div>

      {state.isOpen && (
        <ListBox
          {...listBoxProps}
          listBoxRef={listBoxRef}
          state={state}
          styleProps={{
            width: dimensions.width ? `${dimensions.width}px` : DEFAULT_WIDTH,
          }}
        />
      )}
    </Box>
  );
}

NobleChainCombobox.Item = Item;
NobleChainCombobox.Section = Section;
