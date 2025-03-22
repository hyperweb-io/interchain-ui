import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
import {
  nobleDarkThemeClass,
  nobleLightThemeClass,
} from "../../styles/themes.css";
import type { NobleProviderProps } from "./noble.types";

function NobleProvider(props: NobleProviderProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  function isControlled() {
    return props.themeMode != null;
  }

  function providerThemeMode() {
    if (isControlled()) return props.themeMode;
    return theme;
  }

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
    <div
      className={clx({
        [nobleLightThemeClass]: theme === "light",
        [nobleDarkThemeClass]: theme === "dark",
      })}
    >
      {props.children}
    </div>
  );
}

export default NobleProvider;
