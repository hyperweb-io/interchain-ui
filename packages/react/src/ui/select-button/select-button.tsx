import * as React from "react";
import { useState, useRef, forwardRef, useEffect } from "react";
import clx from "clsx";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import {
  buttonStyles,
  buttonRoot,
  buttonIntent,
  selectSizes,
  arrowDropDown,
  buttonContent,
} from "./select-button.css";
import type { ThemeVariant } from "../../models/system.model";
import type { SelectButtonProps } from "./select-button.types";

const SelectButton = forwardRef<any, SelectButtonProps>(function SelectButton(
  props: SelectButtonProps,
  buttonRef: SelectButtonProps["buttonRef"]
) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

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
      {...props._css}
      attributes={props.attributes}
      className={clx(
        buttonRoot,
        props.disabled ? buttonIntent.disabled : buttonIntent[props.intent],
        props.className
      )}
    >
      <button
        type="button"
        onClick={(event) => props?.onClick()}
        ref={buttonRef}
        {...props.buttonAttributes}
        className={clx(buttonStyles[theme], selectSizes[props.size])}
      >
        <span className={buttonContent}>
          <span {...props.valueProps}>
            {props.placeholder ?? "Select option"}
          </span>
          <Icon name="arrowDropDown" className={arrowDropDown} />
        </span>
      </button>
    </Box>
  );
});

export default SelectButton;
