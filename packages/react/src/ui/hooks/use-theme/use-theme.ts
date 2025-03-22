import * as React from "react";

import { ModePreference, ThemeVariant } from "@/models/system.model";
import { store as interchainUIStore } from "@/models/store";
import { StoreApi, useStore } from "zustand";

// Store helper
// More details: https://docs.pmnd.rs/zustand/guides/auto-generating-selectors#vanilla-store

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () =>
      useStore(_store, (s) => s[k as keyof typeof s]);
  }

  return store;
};

const useInterchainStore = createSelectors(interchainUIStore);

type ThemeEvalMode = "force" | "normal";

export default function useTheme() {
  const [hasHydrated, setHasHydrated] = React.useState(false);

  const theme = useInterchainStore.use.theme();
  const setThemeMode = useInterchainStore.use.setThemeMode();
  const themeClass = useInterchainStore.use.themeClass();
  const themeClasses = useInterchainStore.use.themeClasses();

  // Rehydrate the store on page load
  React.useEffect(() => {
    useInterchainStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  const [themeEvalMode, setThemeEvalMode] =
    React.useState<ThemeEvalMode>("normal");

  const setTheme = (mode: ModePreference) => {
    setThemeMode(mode);
  };

  const toggleColorMode = () => {
    setThemeMode(theme === "light" ? "dark" : "light");
  };

  const themeEvalRef = React.useRef<HTMLElement | null>(null);
  const forcedModeRef = React.useRef<ThemeVariant | null>(null);

  function recursiveGetColorMode(node: HTMLElement | null) {
    if (!node) return;

    let parent = node.parentElement;
    while (parent) {
      if (parent.dataset.interchainColorMode) {
        return parent.dataset.interchainColorMode as ThemeVariant;
      }
      parent = parent.parentElement;
    }
  }

  function getForceThemeMode(): ThemeVariant {
    if (themeEvalMode === "normal" || !themeEvalRef) return theme;
    if (!!forcedModeRef.current) return forcedModeRef.current;

    // Get closest sentinel element and extract force theme value;
    const forcedMode = recursiveGetColorMode(themeEvalRef.current);

    if (!forcedMode) return theme;
    return forcedMode;
  }

  const getThemeRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node == null) {
      themeEvalRef.current = null;
      return;
    }

    // Try resolve forced theme if there is any
    const forcedMode = recursiveGetColorMode(node);

    if (forcedMode === "light" || forcedMode === "dark") {
      setThemeEvalMode("force");
      forcedModeRef.current = forcedMode;
    }

    themeEvalRef.current = node;
  }, []);

  return {
    hasHydrated,
    theme,
    themeClass:
      themeEvalMode === "force"
        ? // Forced mode, resolve it ourselves
          getForceThemeMode() === "light"
          ? themeClasses[0]
          : themeClasses[1]
        : // Fallback normal behavior
          themeClass,
    setTheme,
    // TODO: refactor to use colorMode naming instead of theme
    // Aliasing for refactoring later
    colorMode: themeEvalMode === "force" ? getForceThemeMode() : theme,
    setColorMode: setTheme,
    toggleColorMode,
    getThemeRef,
  };
}
