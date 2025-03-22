import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import {
  meshDarkThemeClass,
  meshLightThemeClass,
} from "../../styles/themes.css";
import type { MeshProviderProps } from "./mesh-staking.types";

function MeshProvider(props: MeshProviderProps) {
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
    // Controlled theme mode
    if (isControlled()) return;
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
        [meshLightThemeClass]: providerThemeMode() === "light",
        [meshDarkThemeClass]: providerThemeMode() === "dark",
      })}
    >
      {props.children}
    </div>
  );
}

export default MeshProvider;
