<template>
  <div
    :data-is-controlled="isControlled"
    :data-interchain-ui-provider="true"
    :data-interchain-theme-mode="themeMode == null ? undefined : themeMode"
    :style="{
      visibility: isMounted ? 'visible' : 'hidden',
    }"
    :class="clsx(isMounted ? themeClass : null, className)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const eventMappings = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onMouseMove: "mousemove",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onKeyPress: "keypress",
  onFocus: "focus",
  onBlur: "blur",
  onInput: "input",
  onChange: "change",
  onSubmit: "submit",
  onReset: "reset",
  onScroll: "scroll",
  onWheel: "wheel",
  onDragStart: "dragstart",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragEnter: "dragenter",
  onDragLeave: "dragleave",
  onDragOver: "dragover",
  onDrop: "drop",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTouchCancel: "touchcancel",
};

import { computed, onMounted, onUnmounted, ref, watch } from "vue";

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

const props = defineProps<ThemeProviderProps>();
const preferredMode = ref(null);
const isMounted = ref(false);
const localCustomTheme = ref(null);
const localThemeDefs = ref([]);
const internalTheme = ref("light");
const UIStore = ref(store.getState());

const cleanupRef = ref<() => void>();

onMounted(() => {
  isMounted.value = true;

  // Resolve the theme mode
  const resolvedThemeMode = resolveThemeMode(props.defaultTheme);

  // Set the initial theme based on the resolved mode
  if (!isControlled) {
    store.getState().setThemeMode(resolvedThemeMode);
  }
  const darkListener = ({ matches }: MediaQueryListEvent) => {
    if (matches) {
      preferredMode.value = "dark";
    }
  };
  const lightListener = ({ matches }: MediaQueryListEvent) => {
    if (matches) {
      preferredMode.value = "light";
    }
  };
  const cleanupStore = store.subscribe((newState) => {
    UIStore.value = newState;
    internalTheme.value = newState.theme;
  });
  if (darkQuery && lightQuery) {
    if (
      typeof darkQuery.addEventListener === "function" &&
      typeof lightQuery.addEventListener === "function"
    ) {
      darkQuery?.addEventListener("change", darkListener);
      lightQuery?.addEventListener("change", lightListener);
    }
  }
  cleanupRef.value = () => {
    if (typeof darkQuery.removeEventListener === "function") {
      darkQuery?.removeEventListener("change", darkListener);
    }
    if (typeof lightQuery.removeEventListener === "function") {
      lightQuery?.removeEventListener("change", lightListener);
    }
    if (typeof cleanupStore === "function") {
      cleanupStore();
    }
  };
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") {
    cleanupRef.value();
  }
});
const isControlled = computed(() => {
  return props.themeMode != null;
});
const isReady = computed(() => {
  return preferredMode.value && isMounted.value;
});
const lightQuery = computed(() => {
  if (isSSR()) return null;
  return window?.matchMedia?.(mediaQueryColorScheme(`light`));
});
const darkQuery = computed(() => {
  if (isSSR()) return null;
  return window?.matchMedia?.(mediaQueryColorScheme(`dark`));
});
const isDark = computed(() => {
  return !!darkQuery?.matches;
});
const isLight = computed(() => {
  return !!lightQuery?.matches;
});
const themeClass = computed(() => {
  return getNewThemeClass(store.getState());
});

watch(
  () => [preferredMode.value, internalTheme.value, isReady, UIStore.value],
  () => {
    if (!isReady) {
      return;
    }
    const themeMode = store.getState().themeMode;
    const setThemeModeFn = store.getState().setThemeMode;
    if (themeMode === "system" || themeMode == null) {
      return setThemeModeFn("system");
    }
  },
  { immediate: true }
);
watch(
  () => [props.themeDefs, isControlled],
  () => {
    const finalThemeDefs = props.themeDefs ?? [];
    const isValidThemeDefs =
      Array.isArray(props.themeDefs) && finalThemeDefs.length > 0;
    if (!isValidThemeDefs) {
      return;
    }

    // Only set global custom themes if props.themeMode is not controlled
    // controlled props.themeMode usage means that the user is managing nested theme
    if (isControlled) {
      return;
    } else {
      if (!isEqual(store.getState().themeDefs, finalThemeDefs)) {
        store.getState().setThemeDefs(finalThemeDefs);
      }
    }
  },
  { immediate: true }
);
watch(
  () => [props.customTheme, isMounted.value],
  () => {
    if (!props.customTheme || !isMounted.value) {
      return;
    }

    // TODO: handle custom theme for controlled mode
    store.getState().setCustomTheme(props.customTheme);
  },
  { immediate: true }
);
watch(
  () => [props.overrides],
  () => {
    const overrideStyleManager = store.getState().overrideStyleManager;
    if (!overrideStyleManager) {
      return;
    }
    overrideStyleManager.update(props.overrides, null);
  },
  { immediate: true }
);
watch(
  () => [props.accent],
  () => {
    // Skip if accent is not provided
    if (!props.accent) return;
    const prevAccent = UIStore.value.themeAccent;
    const currentColorMode = UIStore.value.theme;
    if (prevAccent !== props.accent) {
      UIStore.value.setThemeAccent(props.accent ?? "blue");
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
  },
  { immediate: true }
);
function getNewThemeClass(uiStore: ReturnType<typeof store.getState>) {
  if (isControlled) {
    if (props.themeMode === "system") {
      const finalThemeMode = isReady ? preferredMode.value : props.themeMode;
      return finalThemeMode === "dark" ? darkThemeClass : lightThemeClass;
    }
    return props.themeMode === "dark" ? darkThemeClass : lightThemeClass;
  }
  return uiStore.themeClass;
}
</script>