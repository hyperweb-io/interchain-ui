<template>
  <div
    data-part-id="animate-layout"
    ref="parentRef"
    :style="{
      backfaceVisibility: 'hidden',
    }"
    :class="props.class ?? props.className"
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

import { onMounted, ref, useSlots, watch } from "vue";

import { animateLayout } from "./animate-layout.helper";
import type { AnimateLayoutProps } from "./animate-layout.types";

const props = defineProps<AnimateLayoutProps>();

const parentRef = ref<HTMLDivElement>();

onMounted(() => {
  if (parentRef.value) {
    animateLayout(parentRef.value);
  }
});

const slots = useSlots();
watch(
  () => [parentRef.value, slots.default],
  () => {
    if (parentRef.value) {
      animateLayout(parentRef.value);
    }
  },
  { immediate: true }
);
</script>