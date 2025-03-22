import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { lightThemeClass, darkThemeClass } from "../../styles/themes.css";
import {
  VISIBLE_TOASTS_AMOUNT,
  VIEWPORT_OFFSET,
  TOAST_WIDTH,
  GAP,
} from "./toast.constants";
import { ToastState } from "./toast.state";
import type { ToastsState } from "./toast.state";
import type {
  ToasterProps,
  Toast,
  ToastToDismiss,
  ToastHeight,
} from "./toast.types";
import ToastItem from "./toast";
import {
  frontToastHeightVar,
  offsetVar,
  widthVar,
  gapVar,
  toaster,
} from "./toast.css";
import { store } from "../../models/store";

function Toaster(props: ToasterProps) {
  const {
    colorful = true,
    hotkey = ["altKey", "KeyT"],
    position = "bottom-right",
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
  } = props;
  const listRef = useRef<HTMLOListElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement>(null);
  const isFocusWithinRef = useRef<boolean>(false);
  const cleanupToastState = useRef(null);
  const cleanupSyncToastState = useRef(null);
  const cleanupListeners = useRef(null);
  const cleanupUIStore = useRef(null);
  const [theme, setTheme] = useState(() => "light");
  const [toasts, setToasts] = useState(() => []);
  const [heights, setHeights] = useState(() => []);
  const [expanded, setExpanded] = useState(() => false);
  const [interacting, setInteracting] = useState(() => false);
  function positionTuple() {
    const [y, x] = position.split("-");
    return { x, y };
  }
  function hotkeyLabel() {
    return hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  }
  function handleToastEvent(toast: Toast | ToastToDismiss) {
    if ((toast as ToastToDismiss).dismiss) {
      ToastState.syncDisplayToasts((displayToasts) =>
        displayToasts.map((t) =>
          t.id === toast.id ? { ...t, delete: true } : t
        )
      );
      return;
    }
    ToastState.syncDisplayToasts((displayToasts) => {
      let returnToasts = [];
      const indexOfExistingToast = displayToasts.findIndex(
        (t) => t.id === toast.id
      ); // Update the toast if it already exists
      if (indexOfExistingToast !== -1) {
        returnToasts = [
          ...displayToasts.slice(0, indexOfExistingToast),
          { ...displayToasts[indexOfExistingToast], ...toast },
          ...displayToasts.slice(indexOfExistingToast + 1),
        ];
        return returnToasts;
      } // Add toast on top if not exists
      returnToasts = [toast, ...displayToasts];
      return returnToasts;
    });
  }
  function handleSyncToasts(displayToasts: ToastsState) {
    setToasts(displayToasts);
  }
  function removeToast(toast: Toast) {
    ToastState.syncDisplayToasts((displayToasts) =>
      displayToasts.filter(({ id }) => id !== toast.id)
    );
  }
  function updateHeights(newHeights: ToastHeight[]) {
    setHeights(newHeights);
  }
  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupUIStore.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
    cleanupToastState.current = ToastState.subscribe(handleToastEvent);
    cleanupSyncToastState.current =
      ToastState.subscribeDisplay(handleSyncToasts);
  }, []);
  useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = hotkey.every(
        (key) => (event as any)[key] || event.code === key
      );
      if (isHotkeyPressed) {
        setExpanded(true);
        listRef.current?.focus();
      }
      if (
        event.code === "Escape" &&
        (document.activeElement === listRef.current ||
          listRef.current?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    cleanupListeners.current = () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [hotkey]);
  useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({ preventScroll: true });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [listRef.current]);
  useEffect(() => {
    return () => {
      if (typeof cleanupToastState.current === "function") {
        cleanupToastState.current();
      }
      if (typeof cleanupSyncToastState.current === "function") {
        cleanupSyncToastState.current();
      }
      if (typeof cleanupListeners.current === "function") {
        cleanupListeners.current();
      }
      if (typeof cleanupUIStore.current === "function") {
        cleanupUIStore.current();
      }
    };
  }, []);
  return (
    <section
      aria-label={`Notifications ${hotkeyLabel()}`}
      tabIndex={-1}
      style={{ visibility: toasts.length > 0 ? "visible" : "hidden" }}
    >
      <ol
        tabIndex={-1}
        ref={listRef}
        data-interchain-toaster
        data-theme={theme}
        data-colorful={colorful}
        data-y-position={positionTuple().y}
        data-x-position={positionTuple().x}
        style={{
          ...assignInlineVars({
            [frontToastHeightVar]: `${heights[0]?.height}px`,
            [offsetVar]:
              typeof props.offset === "number"
                ? `${props.offset}px`
                : props.offset || VIEWPORT_OFFSET,
            [widthVar]: `${TOAST_WIDTH}px`,
            [gapVar]: `${GAP}px`,
          }),
          ...props.rawCSS,
        }}
        onBlur={(event) => {
          if (
            isFocusWithinRef.current &&
            !event.currentTarget.contains(event.relatedTarget as HTMLElement)
          ) {
            isFocusWithinRef.current = false;
            if (lastFocusedElementRef.current) {
              lastFocusedElementRef.current.focus({ preventScroll: true });
              lastFocusedElementRef.current = null;
            }
          }
        }}
        onFocus={(event) => {
          if (!isFocusWithinRef.current) {
            isFocusWithinRef.current = true;
            lastFocusedElementRef.current = event.relatedTarget as HTMLElement;
          }
        }}
        onMouseEnter={(event) => {
          setExpanded(true);
        }}
        onMouseMove={(event) => {
          setExpanded(true);
        }}
        onMouseLeave={(event) => {
          // Avoid setting expanded to false when interacting with a toast, e.g. swiping
          if (!interacting) {
            setExpanded(false);
          }
        }}
        onPointerDown={(event) => {
          setInteracting(true);
        }}
        onPointerUp={(event) => {
          setInteracting(false);
        }}
        className={clx(
          {
            [lightThemeClass]: theme === "light",
            [darkThemeClass]: theme === "dark",
          },
          toaster,
          props.className
        )}
      >
        {toasts?.map((toast, index) => (
          <ToastItem
            key={toast.id}
            index={index}
            toast={toast}
            duration={props.duration}
            descriptionClassName={props.toastOptions?.descriptionClassName}
            invert={props.invert}
            visibleToasts={visibleToasts}
            closeButton={props.closeButton}
            interacting={interacting}
            position={position}
            rawCSS={props.toastOptions?.rawCSS}
            removeToast={removeToast}
            toasts={toasts}
            heights={heights}
            setHeights={updateHeights}
            expandByDefault={props.expand}
            expanded={expanded}
            className={props.toastOptions?.className}
          />
        ))}
      </ol>
    </section>
  );
}
export default Toaster;
