<template>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    width="$full"
    px="$6"
    :class="props.class ?? props.className"
    ><div
      :style="
        overrideManager?.applyOverrides(
          connectModalQRCodeSkeletonOverrides.name
        )
      "
      :class="qrcodeSkeleton[internalTheme]"
    ></div
  ></Box>
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

import Box from "../box";
import { qrcodeSkeleton } from "./connect-modal-qrcode-skeleton.css";
import { store } from "../../models/store";
import { connectModalQRCodeSkeletonOverrides } from "./connect-modal-qrcode-skeleton.helper";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";

const props = defineProps(["className"]);
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