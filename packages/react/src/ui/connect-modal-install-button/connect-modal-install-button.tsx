import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import Box from "../box";
import {
  fluidWidth,
  installButtonStyles,
} from "./connect-modal-install-button.css";
import { installButtonOverrides } from "./connect-modal-install-button.helper";
import type { ConnectModalInstallButtonProps } from "./connect-modal-install-button.types";

function ConnectModalInstallButton(props: ConnectModalInstallButtonProps) {
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [overrideManager, setOverrideManager] = useState(() => null);

  function getClassName() {
    return clx(
      installButtonStyles[internalTheme],
      props.fluidWidth ? fluidWidth : "",
      props.className
    );
  }

  useEffect(() => {
    setInternalTheme(store.getState().theme);
    setOverrideManager(store.getState().overrideStyleManager);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
      setOverrideManager(newState.overrideStyleManager);
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
      {...props.attributes}
      rawCSS={overrideManager?.applyOverrides(installButtonOverrides.name)}
      attributes={{
        onClick: (event) => props.onClick?.(event),
        onMouseEnter: (event) => props.onHoverStart?.(event),
        onMouseLeave: (event) => props.onHoverEnd?.(event),
        disabled: props.disabled,
        ...props.domAttributes,
      }}
      className={getClassName()}
    >
      {props.children}
    </Box>
  );
}

export default ConnectModalInstallButton;
