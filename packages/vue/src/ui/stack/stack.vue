<template>
  <Box
    display="flex"
    :as="as"
    :boxRef="boxRef"
    :flexDirection="direction === 'horizontal' ? 'row' : 'column'"
    :gap="space"
    :attributes="domAttributes"
    :class="props.class ?? props.className"
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

import Box from "../box";
import type { StackProps } from "./stack.types";

const props = withDefaults(defineProps<StackProps>(), {
  as: "div",
  attributes: undefined,
  boxRef: undefined,
  direction: "horizontal",
  space: "$0",
  domAttributes: undefined,
  className: undefined,
  children: undefined,
});
</script>