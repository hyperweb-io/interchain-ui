import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import AnimateLayout from "../animate-layout";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import {
  modalContent,
  modalChildren,
  modalAnimateContainer,
} from "./connect-modal.css";
import { connectModalOverrides } from "./connect-modal.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import Modal from "../modal";

function ConnectModal(props: ConnectModalProps) {
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [overrideManager, setOverrideManager] = useState(() => null);

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
    <Modal
      isOpen={props.isOpen}
      closeOnClickaway
      onOpen={(event) => props.onOpen?.()}
      onClose={(event) => props.onClose?.()}
      header={props.header}
      contentClassName={clx(
        modalContent[internalTheme],
        props.modalContentClassName
      )}
      contentStyles={{
        ...overrideManager?.applyOverrides(connectModalOverrides.name),
        ...props.modalContentStyles,
      }}
      childrenClassName={clx(modalChildren, props.modalChildrenClassName)}
      className={props.modalContainerClassName}
    >
      <AnimateLayout className={modalAnimateContainer}>
        {props.children}
      </AnimateLayout>
    </Modal>
  );
}

export default ConnectModal;
