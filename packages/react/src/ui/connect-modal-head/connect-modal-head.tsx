import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Button from "../button";
import Icon from "../icon";
import { store } from "../../models/store";
import { connectModalHeadTitleOverrides } from "./connect-modal-head.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./connect-modal-head.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalHeadProps } from "./connect-modal-head.types";

function ConnectModalHead(props: ConnectModalHeadProps) {
  const { hasBackButton = false, hasCloseButton = true } = props;
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  const [overrideManager, setOverrideManager] = useState(() => null);
  function modalHeadTitleClassName() {
    return styles.modalHeaderText[internalTheme];
  }
  useEffect(() => {
    setInternalTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <div className={clx(styles.modalHeader, props.className)}>
      {hasBackButton ? (
        <div className={styles.modalBackButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            onClick={(e) => {
              props.onBack?.(e);
            }}
            className={styles.headerButton}
          >
            <Icon name="arrowLeftSLine" size="$2xl" color="inherit" />
          </Button>
        </div>
      ) : null}
      <p
        {...props.titleProps}
        id={props.id}
        style={overrideManager?.applyOverrides(
          connectModalHeadTitleOverrides.name
        )}
        className={clx(modalHeadTitleClassName(), props.titleProps?.className)}
      >
        {props.title}
      </p>
      {hasCloseButton ? (
        <div className={styles.modalCloseButton}>
          <Button
            variant="ghost"
            intent="secondary"
            size="sm"
            domAttributes={props.closeButtonProps}
            onClick={(e) => props.closeButtonProps?.onClick?.(e)}
            className={styles.headerButton}
          >
            <Icon name="closeFilled" size="$2xl" color="inherit" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default ConnectModalHead;
