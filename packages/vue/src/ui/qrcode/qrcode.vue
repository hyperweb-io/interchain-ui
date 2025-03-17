<template>
  <svg
    :height="size"
    :width="size"
    :viewBox="`0 0 ${numCells()} ${numCells()}`"
    :class="props.class ?? props.className"
  >
    <template v-if="!!title">
      <title>{{ title }}</title>
    </template>

    <path
      shape-rendering="crispEdges"
      :fill="bgColor"
      :d="`M0,0 h${numCells()}v${numCells()}H0z`"
    ></path>
    <path shape-rendering="crispEdges" :fill="fgColor" :d="fgPath"></path>
    <template v-if="available && !!imageSettings?.src">
      <image
        preserveAspectRatio="none"
        :href="imageSettings.src"
        :height="calculatedImageSettings.h"
        :width="calculatedImageSettings.w"
        :x="calculatedImageSettings.x + margin"
        :y="calculatedImageSettings.y + margin"
      ></image>
    </template>
  </svg>
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

import { onMounted, ref, watch } from "vue";

import qrcodegen from "./qrcodegen/qrcodegen";
import {
  DEFAULT_SIZE,
  DEFAULT_LEVEL,
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_INCLUDEMARGIN,
  ERROR_LEVEL_MAP,
} from "./qrcode.types";
import type { QRProps } from "./qrcode.types";
import {
  excavateModules,
  generatePath,
  getImageSettings,
  getMarginSize,
} from "./qrcode.helpers";

const props = withDefaults(defineProps<QRProps>(), {
  imageSettings: undefined,
  includeMargin: DEFAULT_INCLUDEMARGIN,
  marginSize: undefined,
  size: DEFAULT_SIZE,
  value: undefined,
  level: DEFAULT_LEVEL,
  className: undefined,
  title: undefined,
  bgColor: DEFAULT_BGCOLOR,
  fgColor: DEFAULT_FGCOLOR,
});
const available = ref(false);
const cells = ref(null);
const calculatedImageSettings = ref(null);
const margin = ref(null);
const fgPath = ref(null);

onMounted(() => {
  cells.value = genCells();
});

watch(
  () => [props.imageSettings, calculatedImageSettings.value],
  () => {
    if (props.imageSettings != null && calculatedImageSettings.value != null) {
      if (calculatedImageSettings.value.excavation != null) {
        cells.value = excavateModules(
          cells.value,
          calculatedImageSettings.value.excavation
        );
      }
      if (!available.value) {
        available.value = true;
      }
    }
  },
  { immediate: true }
);
watch(
  () => [
    props.size,
    props.imageSettings,
    props.includeMargin,
    props.marginSize,
    cells.value,
  ],
  () => {
    const newMargin = getMarginSize(props.includeMargin, props.marginSize);
    margin.value = newMargin;
    calculatedImageSettings.value = getImageSettings(
      cells.value,
      props.size,
      newMargin,
      props.imageSettings
    );
    fgPath.value = generateNewPath(newMargin);
  },
  { immediate: true }
);
function generateNewPath(newMargin: number) {
  // Drawing strategy: instead of a rect per module, we're going to create a
  // single path for the dark modules and layer that on top of a light rect,
  // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
  // way faster than DOM ops.
  // For level 1, 441 nodes -> 2
  // For level 40, 31329 -> 2
  return generatePath(cells.value ?? [], newMargin);
}
function genCells() {
  return qrcodegen.QrCode.encodeText(
    props.value,
    ERROR_LEVEL_MAP[props.level]
  ).getModules();
}
function numCells() {
  return (cells.value?.length ?? 0) + (margin.value ?? 0) * 2;
}
</script>