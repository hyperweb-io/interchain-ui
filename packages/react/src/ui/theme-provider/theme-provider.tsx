import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { isEqual } from "lodash";
import {
  mediaQueryColorScheme,
  resolveThemeMode,
  getAccent,
  getAccentText,
} from "../../helpers/style";
import { lightThemeClass, darkThemeClass } from "../../styles/themes.css";
import { isSSR } from "../../helpers/platform";
import { store } from "../../models/store";
import { ThemeVariant } from "../../models/system.model";
import { assignThemeVars } from "../../styles/override/override";
import type { ThemeDef } from "../../styles/override/override.types";
import type { ThemeProviderProps } from "./theme-provider.types";

function ThemeProvider(props: ThemeProviderProps) {
  const cleanupRef = useRef<() => void>(null);
  const [preferredMode, setPreferredMode] = useState(() => null);

  const [isMounted, setIsMounted] = useState(() => false);

  const [localCustomTheme, setLocalCustomTheme] = useState(() => null);

  const [localThemeDefs, setLocalThemeDefs] = useState(() => []);

  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [UIStore, setUIStore] = useState(() => store.getState());

  function isControlled() {
    return props.themeMode != null;
  }

  function isReady() {
    return preferredMode && isMounted;
  }

  function lightQuery() {
    if (isSSR()) return null;
    return window?.matchMedia?.(mediaQueryColorScheme(`light`));
  }

  function darkQuery() {
    if (isSSR()) return null;
    return window?.matchMedia?.(mediaQueryColorScheme(`dark`));
  }

  function isDark() {
    return !!darkQuery?.()?.matches;
  }

  function isLight() {
    return !!lightQuery?.()?.matches;
  }

  function themeClass() {
    return getNewThemeClass(store.getState());
  }

  function getNewThemeClass(uiStore: ReturnType<typeof store.getState>) {
    if (isControlled()) {
      if (props.themeMode === "system") {
        const finalThemeMode = isReady() ? preferredMode : props.themeMode;
        return finalThemeMode === "dark" ? darkThemeClass : lightThemeClass;
      }
      return props.themeMode === "dark" ? darkThemeClass : lightThemeClass;
    }
    return uiStore.themeClass;
  }

  useEffect(() => {
    setIsMounted(true);

    // Resolve the theme mode
    const resolvedThemeMode = resolveThemeMode(props.defaultTheme);

    // Set the initial theme based on the resolved mode
    if (!isControlled()) {
      store.getState().setThemeMode(resolvedThemeMode);
    }
    const darkListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        setPreferredMode("dark");
      }
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        setPreferredMode("light");
      }
    };
    const cleanupStore = store.subscribe((newState) => {
      setUIStore(newState);
      setInternalTheme(newState.theme);
    });
    if (darkQuery() && lightQuery()) {
      if (
        typeof darkQuery().addEventListener === "function" &&
        typeof lightQuery().addEventListener === "function"
      ) {
        darkQuery?.()?.addEventListener("change", darkListener);
        lightQuery?.()?.addEventListener("change", lightListener);
      }
    }
    cleanupRef.current = () => {
      if (typeof darkQuery().removeEventListener === "function") {
        darkQuery?.()?.removeEventListener("change", darkListener);
      }
      if (typeof lightQuery().removeEventListener === "function") {
        lightQuery?.()?.removeEventListener("change", lightListener);
      }
      if (typeof cleanupStore === "function") {
        cleanupStore();
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady()) {
      return;
    }
    const themeMode = store.getState().themeMode;
    const setThemeModeFn = store.getState().setThemeMode;
    if (themeMode === "system" || themeMode == null) {
      return setThemeModeFn("system");
    }
  }, [preferredMode, internalTheme, isReady(), UIStore]);
  useEffect(() => {
    const finalThemeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && finalThemeDefs.length > 0;
    if (!isValidThemeDefs) {
      return;
    }

    // Only set global custom themes if props.themeMode is not controlled
    // controlled props.themeMode usage means that the user is managing nested theme
    if (isControlled()) {
      return;
    } else {
      if (!isEqual(store.getState().themeDefs, finalThemeDefs)) {
        store.getState().setThemeDefs(finalThemeDefs);
      }
    }
  }, [props.themeDefs, isControlled()]);
  useEffect(() => {
    if (!props.customTheme || !isMounted) {
      return;
    }

    // TODO: handle custom theme for controlled mode
    store.getState().setCustomTheme(props.customTheme);
  }, [props.customTheme, isMounted]);
  useEffect(() => {
    const overrideStyleManager = store.getState().overrideStyleManager;
    if (!overrideStyleManager) {
      return;
    }
    overrideStyleManager.update(props.overrides, null);
  }, [props.overrides]);
  useEffect(() => {
    // Skip if accent is not provided
    if (!props.accent) return;
    const prevAccent = UIStore.themeAccent;
    const currentColorMode = UIStore.theme;
    if (prevAccent !== props.accent) {
      UIStore.setThemeAccent(props.accent ?? "blue");
      assignThemeVars(
        {
          colors: {
            // @ts-ignore
            accent: getAccent(props.accent, currentColorMode ?? "light"),
            // @ts-ignore
            accentText: getAccentText(currentColorMode ?? "light"),
          },
        },
        currentColorMode
      );
    }
  }, [props.accent]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <div
      data-is-controlled={isControlled()}
      data-interchain-ui-provider
      data-interchain-theme-mode={
        props.themeMode == null ? undefined : props.themeMode
      }
      style={{
        visibility: isMounted ? "visible" : "hidden",
      }}
      className={clsx(isMounted ? themeClass() : null, props.className)}
    >
      {props.children}
    </div>
  );
}

export default ThemeProvider;
