<template>
  <Box
    display="flex"
    position="absolute"
    alignItems="center"
    justifyContent="center"
    borderRadius="$full"
    :boxRef="boxRef"
    :borderWidth="borderWidth"
    :width="size"
    :height="size"
    :class="
      clx(
        avatarBadge[internalTheme],
        avatarBadgePlacement[placement],
        className
      )
    "
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
import Box from "../box";
import { store } from "../../models/store";
import { avatarBadge, avatarBadgePlacement } from "../avatar/avatar.css";
import type { AvatarBadgeProps } from "../avatar/avatar.types";

const props = withDefaults(defineProps<AvatarBadgeProps>(), {
  boxRef: undefined,
  borderWidth: "0.2em",
  attributes: undefined,
  size: "1.25em",
  placement: "bottom-right",
  className: undefined,
  children: undefined,
});
const internalTheme = ref("light");

const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  cleanupRef.value = store.subscribe((newState, prevState) => {
    internalTheme.value = newState.theme;
  });
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
});
</script>