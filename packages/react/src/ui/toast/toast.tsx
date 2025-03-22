import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import { store } from "../../models/store";
import Icon from "../icon";
import type { IconName } from "../icon/icon.types";
import {
  GAP,
  SWIPE_TRESHOLD,
  TIME_BEFORE_UNMOUNT,
  TOAST_LIFETIME,
} from "./toast.constants";
import {
  indexVar,
  initialHeightVar,
  offsetVar,
  swipeAmountVar,
  toast,
  toastButton,
  toastCancelButton,
  toastCloseButton,
  toastContent,
  toastDescription,
  toastIcon,
  toastSpinner,
  toastTitle,
  toastsBeforeVar,
  zIndexVar,
} from "./toast.css";
import type { ToastHeight, ToastProps } from "./toast.types";

function Toast(props: ToastProps) {
  const toastRef = useRef<HTMLLIElement>(null);
  const cleanupTimerRef = useRef<(() => void) | null>(null);
  const restoreHeightsRef = useRef<(() => void) | null>(null);
  const closeTimerStartTimeRef = useRef<number>(0);
  const offset = useRef<number>(0);
  const lastCloseTimerStartTimeRef = useRef<number>(0);
  const pointerStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);
  const closeTimerRemainingTimeRef = useRef<number>(duration());
  const cleanupUIStore = useRef(null);
  const [theme, setTheme] = useState(() => "light");

  const [mounted, setMounted] = useState(() => false);

  const [removed, setRemoved] = useState(() => false);

  const [swiping, setSwiping] = useState(() => false);

  const [swipeOut, setSwipeOut] = useState(() => false);

  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(() => 0);

  const [initialHeight, setInitialHeight] = useState(() => 0);

  const [swipeAmount, setSwipeAmount] = useState(() => "0px");

  function isFront() {
    return props.index === 0;
  }

  function isVisible() {
    return props.index + 1 <= props.visibleToasts;
  }

  function toastType() {
    return props.toast.type;
  }

  function positionTuple() {
    const [y, x] = props.position.split("-");
    return {
      x,
      y,
    };
  }

  function invert() {
    return props.toast.invert || props.invert;
  }

  function disabled() {
    return props.toast.type === "loading";
  }

  function statusIconName() {
    if (props.toast.type === "success") return "checkFill";
    if (props.toast.type === "error") return "errorWarningFill";
    return null;
  }

  function heightIndex() {
    return (
      props.heights.findIndex(
        (height: ToastHeight) => height.toastId === props.toast.id
      ) || 0
    );
  }

  function duration() {
    return props.toast.duration || props.duration || TOAST_LIFETIME;
  }

  function toastsHeightBefore() {
    return props.heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up untill current  toast
      if (reducerIndex >= heightIndex()) {
        return prev;
      }
      return prev + curr.height;
    }, 0);
  }

  function pxToNum(cssValue: string) {
    return Number(cssValue.replace("px", "")) || 0;
  }

  function deleteToast() {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    const oldHeights = props.heights;
    props.setHeights(
      oldHeights.filter((height) => height.toastId !== props.toast.id)
    );
    setTimeout(() => {
      props.removeToast(props.toast);
    }, TIME_BEFORE_UNMOUNT);
  }

  function handleCloseButtonClick() {
    if (disabled()) {
      return;
    }
    deleteToast();
    props.toast.onDismiss?.(props.toast);
  }

  function handleCancelButtonClick() {
    deleteToast();
    if (props.toast.cancel?.onClick) {
      props.toast.cancel.onClick();
    }
  }

  function handleActionButtonClick(event) {
    props.toast.action?.onClick(event);
    if (event.defaultPrevented) {
      return;
    }
    deleteToast();
  }

  function handleOnPointerDown(event) {
    if (disabled()) return;
    setOffsetBeforeRemove(offset.current);
    // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    if ((event.target as HTMLElement).tagName === "BUTTON") return;
    setSwiping(true);
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleOnPointerUp() {
    if (swipeOut) {
      return;
    }
    pointerStartRef.current = null;
    const swipeAmountNum = Number(
      pxToNum(toastRef.current?.style.getPropertyValue(`${swipeAmountVar}`))
    );

    // Remove only if treshold is met
    if (Math.abs(swipeAmountNum) >= SWIPE_TRESHOLD) {
      setOffsetBeforeRemove(offset.current);
      props.toast.onDismiss?.(props.toast);
      deleteToast();
      setSwipeOut(true);
      return;
    }
    setSwipeAmount("0px");
    setSwiping(false);
  }

  function handleOnPointerMove(event) {
    if (!pointerStartRef.current) return;
    const yPosition = event.clientY - pointerStartRef.current.y;
    const xPosition = event.clientX - pointerStartRef.current.x;
    const clamp = positionTuple().y === "top" ? Math.min : Math.max;
    const clampedY = clamp(0, yPosition);
    const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
    const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;
    if (isAllowedToSwipe) {
      setSwipeAmount(`${yPosition}px`);
    } else if (Math.abs(xPosition) > swipeStartThreshold) {
      // User is swiping in wrong direction so we disable swipe gesture
      // for the current pointer down interaction
      pointerStartRef.current = null;
    }
  }

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
    setTheme(store.getState().theme);
    cleanupUIStore.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);

  useEffect(() => {
    offset.current = heightIndex() * GAP + toastsHeightBefore();
  });
  useEffect(() => {
    if (!mounted) {
      return;
    }
    const toastNode = toastRef.current;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = "auto";
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;
    setInitialHeight(newHeight);
    const calcNewHeights = () => {
      const oldHeights = props.heights;
      const alreadyExists = oldHeights.find(
        (height) => height.toastId === props.toast.id
      );
      if (!alreadyExists) {
        return [
          {
            toastId: props.toast.id,
            height: newHeight,
          },
          ...oldHeights,
        ];
      } else {
        return oldHeights.map((height) =>
          height.toastId === props.toast.id
            ? {
                ...height,
                height: newHeight,
              }
            : height
        );
      }
    };
    props.setHeights(calcNewHeights());
  }, [mounted, props.toast.title, props.toast.description, props.toast.id]);
  useEffect(() => {
    // Always clear timer in new update pass
    if (typeof cleanupTimerRef.current === "function") {
      cleanupTimerRef.current();
    }
    if (
      (props.toast.promise && toastType() === "loading") ||
      props.toast.duration === Infinity
    ) {
      return;
    }
    let timeoutId: ReturnType<typeof setTimeout>;

    // Pause the exit timer on hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime =
          new Date().getTime() - closeTimerStartTimeRef.current;
        closeTimerRemainingTimeRef.current =
          closeTimerRemainingTimeRef.current - elapsedTime;
      }
      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };
    const startTimer = () => {
      closeTimerStartTimeRef.current = new Date().getTime();
      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        props.toast.onAutoClose?.(props.toast);
        deleteToast();
      }, closeTimerRemainingTimeRef.current);
    };
    if (props.expanded || props.interacting) {
      pauseTimer();
    } else {
      startTimer();
    }
    cleanupTimerRef.current = () => clearTimeout(timeoutId);
  }, [
    props.expanded,
    props.interacting,
    props.expandByDefault,
    props.toast,
    props.duration,
    props.toast.promise,
    deleteToast,
    toastType(),
  ]);
  useEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height to heights array after the toast is mounted
      setInitialHeight(height);
      const oldHeights = props.heights;
      props.setHeights([
        {
          toastId: props.toast.id,
          height,
        },
        ...oldHeights,
      ]);
      restoreHeightsRef.current = () => {
        const oldHeights = props.heights;
        props.setHeights(
          oldHeights.filter((height) => height.toastId !== props.toast.id)
        );
      };
    }
  }, [props.toast.id]);
  useEffect(() => {
    if (props.toast.delete) {
      deleteToast();
    }
  }, [props.toast.delete]);

  useEffect(() => {
    return () => {
      if (typeof cleanupTimerRef.current === "function") {
        cleanupTimerRef.current();
      }
      if (typeof restoreHeightsRef.current === "function") {
        restoreHeightsRef.current();
      }
      if (typeof cleanupUIStore.current === "function") {
        cleanupUIStore.current();
      }
    };
  }, []);

  return (
    <li
      aria-atomic="true"
      role="status"
      data-interchain-toast=""
      aria-live={props.toast.important ? "assertive" : "polite"}
      tabIndex={0}
      ref={toastRef}
      data-styled
      data-theme={theme}
      data-mounted={mounted}
      data-promise={Boolean(props.toast.promise)}
      data-removed={removed}
      data-visible={isVisible()}
      data-y-position={positionTuple().y}
      data-x-position={positionTuple().x}
      data-index={props.index}
      data-front={isFront()}
      data-swiping={swiping}
      data-type={toastType()}
      data-invert={invert()}
      data-swipe-out={swipeOut}
      data-expanded={Boolean(
        props.expanded || (props.expandByDefault && mounted)
      )}
      style={{
        ...assignInlineVars({
          [indexVar]: `${props.index}`,
          [toastsBeforeVar]: `${props.index}`,
          [zIndexVar]: `${props.toasts.length - props.index}`,
          [offsetVar]: `${removed ? offsetBeforeRemove : offset.current}px`,
          [initialHeightVar]: props.expandByDefault
            ? "auto"
            : `${initialHeight}px`,
          [swipeAmountVar]: `${swipeAmount}`,
        }),
        ...props.rawCSS,
        ...props.toast.rawCSS,
      }}
      onPointerDown={(event) => handleOnPointerDown}
      onPointerUp={(event) => handleOnPointerUp}
      onPointerMove={(event) => handleOnPointerMove}
      className={clx(toast, props.className, props.toast.className)}
    >
      {props.closeButton ? (
        <button
          aria-label="Close toast"
          data-disabled={disabled()}
          data-close-button
          onClick={(event) => {
            handleCloseButtonClick();
          }}
          className={toastCloseButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-line-cap="round"
            stroke-line-join="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
      {toastType() || props.toast.icon || props.toast.promise ? (
        <div data-icon="" className={toastIcon}>
          {props.toast.promise && toastType() === "loading" ? (
            <div className={toastSpinner}>
              <Icon name="loaderFill" />
            </div>
          ) : null}
          {props.toast.icon ? <>{props.toast.icon}</> : null}
          {!props.toast.icon && statusIconName() ? (
            <Icon name={statusIconName()} />
          ) : null}
        </div>
      ) : null}
      <div data-content="" className={toastContent}>
        <div data-title="" className={toastTitle}>
          {props.toast.title}
        </div>
        {props.toast.description ? (
          <div
            data-description=""
            className={clx(toastDescription, props.descriptionClassName)}
          >
            {props.toast.description}
          </div>
        ) : null}
      </div>
      {props.toast.cancel ? (
        <button
          data-button
          data-cancel
          onClick={(event) => {
            handleCancelButtonClick();
          }}
          className={toastCancelButton}
        >
          {props.toast.cancel.label}
        </button>
      ) : null}
      {props.toast.action ? (
        <button
          data-button=""
          onClick={(event) => handleActionButtonClick(event)}
          className={toastButton}
        >
          {props.toast.action.label}
        </button>
      ) : null}
    </li>
  );
}

export default Toast;
