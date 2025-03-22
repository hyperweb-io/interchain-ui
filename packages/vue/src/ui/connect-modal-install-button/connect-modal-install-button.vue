<template>
  <Box
    as="button"
    :rawCSS="overrideManager?.applyOverrides(installButtonOverrides.name)"
    :attributes="{
      onClick: (event) => onClick?.(event),
      onMouseEnter: (event) => onHoverStart?.(event),
      onMouseLeave: (event) => onHoverEnd?.(event),
      disabled: disabled,
      ...domAttributes,
    }"
    :class="getClassName()"
    v-bind="attributes"
    ><slot
  /></Box>
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

import { onMounted, onUnmounted, ref } from "vue";

import clx from "clsx";
import { store } from "../../models/store";
import Box from "../box";
import {
  fluidWidth,
  installButtonStyles,
} from "./connect-modal-install-button.css";
import { installButtonOverrides } from "./connect-modal-install-button.helper";
import type { ConnectModalInstallButtonProps } from "./connect-modal-install-button.types";

const props = defineProps<ConnectModalInstallButtonProps>();
const internalTheme = ref("light");
const overrideManager = ref(null);

const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  overrideManager.value = store.getState().overrideStyleManager;
  cleanupRef.value = store.subscribe((newState) => {
    internalTheme.value = newState.theme;
    overrideManager.value = newState.overrideStyleManager;
  });
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
});

function getClassName() {
  return clx(
    installButtonStyles[internalTheme.value],
    props.fluidWidth ? fluidWidth : "",
    props.class
  );
}
</script>