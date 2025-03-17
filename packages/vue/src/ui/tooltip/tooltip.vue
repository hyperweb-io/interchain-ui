<template>
  <Box
    :attributes="{
      'data-part-id': 'tooltip-container',
    }"
    ><Box
      display="flex"
      alignItems="center"
      cursor="help"
      :boxRef="anchorRef"
      :attributes="{
        tabIndex: '0',
        onMouseEnter: () => setTooltip(true),
        onMouseLeave: () => setTooltip(false),
        onFocus: () => setTooltip(true),
        onBlur: () => setTooltip(false),
      }"
      ><slot /></Box
  ></Box>
  <Box
    px="$5"
    py="$3"
    backgroundColor="$text"
    borderRadius="$md"
    position="absolute"
    width="max-content"
    zIndex="1"
    :attributes="{
      role: 'tooltip',
    }"
    :display="isShown ? 'block' : 'none'"
    :boxRef="tooltipRef"
    :rawCSS="{
      left: '0',
      top: '0',
    }"
    :class="standardTransitionProperties"
    >{{ title
    }}<Box
      position="absolute"
      transform="rotate(45deg)"
      width="$5"
      height="$5"
      backgroundColor="$text"
      :boxRef="arrowRef"
      :attributes="{
        'data-part-id': 'tooltip-arrow',
      }"
    ></Box
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

import { onMounted, ref, watch } from "vue";

import {
  computePosition,
  offset,
  shift,
  flip,
  arrow,
  inline,
  size,
} from "@floating-ui/dom";
import Box from "../box";
import { standardTransitionProperties } from "../shared/shared.css";
import type { TooltipProps } from "./tooltip.types";

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "top",
  offset: undefined,
  surroundPadding: undefined,
  children: undefined,
  title: undefined,
});
const isMounted = ref(false);
const isShown = ref(false);

const anchorRef = ref<undefined>();
const tooltipRef = ref<undefined>();
const arrowRef = ref<undefined>();

onMounted(() => {
  isMounted.value = true;
});

watch(
  () => [
    isMounted.value,
    isShown.value,
    props.placement,
    props.offset,
    props.surroundPadding,
  ],
  () => {
    if (!isMounted.value) {
      return;
    }
    compute();
  },
  { immediate: true }
);
function setTooltip(shouldShow) {
  if (shouldShow) {
    isShown.value = true;
    compute();
  } else {
    isShown.value = false;
  }
}
function getLatestRefs() {
  return {
    arrow: arrowRef.value,
    anchor: anchorRef.value,
    tooltip: tooltipRef.value,
  };
}
function compute() {
  const latestRefs = getLatestRefs();
  if (latestRefs.anchor == null || latestRefs.tooltip == null) {
    return;
  }
  computePosition(latestRefs.anchor, latestRefs.tooltip, {
    placement: props.placement ?? "top-start",
    middleware: [
      inline(),
      offset(props.offset ?? 12),
      flip(),
      shift({
        padding: props.surroundPadding ?? 4,
      }),
      arrow({
        element: arrowRef.value,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          // Do things with the data, e.g.
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  }).then((result) => {
    const x = result.x;
    const y = result.y;
    const placement = result.placement;
    const arrowData = result.middlewareData.arrow;
    const { x: arrowX, y: arrowY } = arrowData;
    Object.assign(latestRefs.tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];
    const endSide = {
      start: "start",
      end: "end",
    }[placement.split("-")[1]];
    const deltaX = endSide === "start" ? -12 : endSide === "end" ? 12 : 0;
    Object.assign(latestRefs.arrow.style, {
      left: arrowX != null ? `${arrowX + deltaX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      right: "",
      bottom: "",
      [staticSide]: "-4px",
    });
  });
}
</script>