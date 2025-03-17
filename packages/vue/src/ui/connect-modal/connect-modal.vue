<template>
  <ScaffoldModal
    :isOpen="isOpen"
    :closeOnClickaway="true"
    :onOpen="(event) => onOpen?.()"
    :onClose="(event) => onClose?.()"
    :header="header"
    :contentClassName="clx(modalContent[internalTheme], modalContentClassName)"
    :contentStyles="{
      ...overrideManager?.applyOverrides(connectModalOverrides.name),
      ...modalContentStyles,
    }"
    :childrenClassName="clx(modalChildren, modalChildrenClassName)"
    :class="modalContainerClassName"
    ><AnimateLayout :class="modalAnimateContainer"><slot /></AnimateLayout
  ></ScaffoldModal>
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
import AnimateLayout from "../animate-layout";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalProps } from "./connect-modal.types";
import {
  modalContent,
  modalChildren,
  modalAnimateContainer,
} from "./connect-modal.css";
import { connectModalOverrides } from "./connect-modal.helper";
import type { OverrideStyleManager } from "../../styles/override/override";

const props = defineProps<ConnectModalProps>();
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
</script>