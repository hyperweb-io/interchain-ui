import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import autoAnimate from "@formkit/auto-animate";
import { store } from "../../models/store";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import MeshButton from "../mesh-staking/mesh-button";
import {
  modalHeader,
  modalContent,
  modalChildren,
  modalCloseButton,
  modalBackdropBg,
} from "./mesh-modal.css";
import {
  meshDarkThemeClass,
  meshLightThemeClass,
} from "../../styles/themes.css";
import type { MeshModalProps } from "./mesh-modal.types";
import Modal from "../modal";

function MeshModal(props: MeshModalProps) {
  const { closeOnClickaway = false } = props;
  const cleanupRef = useRef<(() => void) | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(() => "light");
  function isControlled() {
    return props.themeMode != null;
  }
  function modalThemeMode() {
    if (isControlled()) return props.themeMode;
    return theme;
  }
  useEffect(() => {
    // Controlled theme mode
    if (isControlled()) return;
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef.current]);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Modal
      isOpen={props.isOpen}
      root={props.modalRoot}
      closeOnClickaway
      onOpen={(event) => props.onOpen?.()}
      onClose={(event) => props.onClose?.()}
      preventScroll
      renderTrigger={props.renderTrigger}
      themeClassName={
        modalThemeMode() === "dark" ? meshDarkThemeClass : meshLightThemeClass
      }
      backdropClassName={
        modalThemeMode() === "light"
          ? modalBackdropBg.light
          : modalBackdropBg.dark
      }
      contentClassName={clsx(modalContent, props?.modalContentClassName)}
      childrenClassName={clsx(
        props.modalChildrenClassName ? null : modalChildren
      )}
      className={props.modalContainerClassName}
      header={
        <Stack
          attributes={{ justifyContent: "space-between", alignItems: "center" }}
          className={modalHeader}
        >
          {props.title && typeof props.title === "string" ? (
            <Text fontSize="$xl" fontWeight="$semibold">
              {props?.title}
            </Text>
          ) : null}
          {props.title && typeof props.title !== "string" ? (
            <>{props.title}</>
          ) : null}
          {typeof props.renderCloseButton === "function" ? (
            <>{props.renderCloseButton({ onClose: props.onClose })}</>
          ) : (
            <MeshButton
              width="$11"
              height="$11"
              px="$0"
              py="$0"
              variant="text"
              colorScheme="secondary"
              onClick={(e) => {
                props.onClose?.(e);
              }}
              className={modalCloseButton}
            >
              <Icon name="closeFilled" size="$3xl" color="inherit" />
            </MeshButton>
          )}
        </Stack>
      }
    >
      <div ref={parentRef}>{props.children}</div>
    </Modal>
  );
}

export default MeshModal;
