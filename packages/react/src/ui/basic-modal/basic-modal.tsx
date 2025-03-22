import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import autoAnimate from "@formkit/auto-animate";
import { store } from "../../models/store";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import type { ThemeVariant } from "../../models/system.model";
import type { BasicModalProps } from "./basic-modal.types";
import { modalHeader, modalContent, modalChildren } from "./basic-modal.css";
import Modal from "../modal";

function BasicModal(props: BasicModalProps) {
  const { closeOnClickaway = true } = props;
  const cleanupRef = useRef<(() => void) | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(() => "light");
  useEffect(() => {
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
      closeOnClickaway={closeOnClickaway}
      onOpen={(event) => props.onOpen?.()}
      onClose={(event) => props.onClose?.()}
      preventScroll
      renderTrigger={props.renderTrigger}
      contentClassName={clsx(modalContent[theme], props?.modalContentClassName)}
      childrenClassName={modalChildren}
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
            <>
              <IconButton
                icon="closeFilled"
                iconSize="$4xl"
                variant="unstyled"
                onClick={(e) => {
                  props.onClose?.(e);
                }}
              />
            </>
          )}
        </Stack>
      }
    >
      <div ref={parentRef}>{props.children}</div>
    </Modal>
  );
}

export default BasicModal;
