import { ref, computed, onUnmounted } from "vue";
import { ModePreference, ThemeVariant } from "@/models/system.model";
import { store } from "@/models/store";

export default function useTheme() {
  const theme = ref(store.getState().theme);
  const themeMode = ref(store.getState().themeMode);
  const hasHydrated = ref(store.getState()._hasHydrated);
  const themeEvalMode = ref<"force" | "normal">("normal");
  const themeEvalRef = ref<HTMLElement | null>(null);
  const forcedModeRef = ref<ThemeVariant | null>(null);

  const cleanupStore = store.subscribe((state) => {
    theme.value = state.theme;
    themeMode.value = state.themeMode;
    hasHydrated.value = state._hasHydrated;
  });

  onUnmounted(() => {
    cleanupStore();
  });

  const setTheme = (mode: ModePreference) => {
    store.getState().setThemeMode(mode);
  };

  const toggleColorMode = () => {
    setTheme(store.getState().theme === "light" ? "dark" : "light");
  };

  function recursiveGetColorMode(
    node: HTMLElement | null,
  ): ThemeVariant | undefined {
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
    if (themeEvalMode.value === "normal" || !themeEvalRef.value) {
      return theme.value;
    }

    if (forcedModeRef.value) {
      return forcedModeRef.value;
    }

    const forcedMode = recursiveGetColorMode(themeEvalRef.value);

    if (!forcedMode) {
      return theme.value;
    }

    return forcedMode;
  }

  const getThemeRef = (node: HTMLElement | null) => {
    if (node === null) {
      themeEvalRef.value = null;
      return;
    }

    const forcedMode = recursiveGetColorMode(node);

    if (forcedMode === "light" || forcedMode === "dark") {
      themeEvalMode.value = "force";
      forcedModeRef.value = forcedMode;
    }

    themeEvalRef.value = node;
  };

  const computedThemeClass = computed(() =>
    themeEvalMode.value === "force"
      ? getForceThemeMode() === "light"
        ? store.getState().themeClasses[0]
        : store.getState().themeClasses[1]
      : store.getState().themeClass,
  );

  const colorMode = computed(() =>
    themeEvalMode.value === "force" ? getForceThemeMode() : theme.value,
  );

  return {
    hasHydrated,
    theme,
    themeClass: computedThemeClass,
    setTheme,
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
    getThemeRef,
  };
}
