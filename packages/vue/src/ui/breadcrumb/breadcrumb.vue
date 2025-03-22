<template>
  <Box
    display="flex"
    alignItems="center"
    :gap="gapRight"
    :width="width"
    :mt="mt"
    :mb="mb"
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
import { BreadcrumbProps } from "./breadcrumb.types";

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  gapRight: "22px",
  width: {
    tablet: "90%",
    desktop: "80%",
  },
  mt: undefined,
  mb: undefined,
  children: undefined,
});
</script>