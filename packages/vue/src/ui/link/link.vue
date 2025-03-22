<template>
  <Box
    fontFamily="$body"
    fontSize="$sm"
    :as="as"
    :backgroundColor="background ? '$cardBg' : undefined"
    :p="background ? '$2' : undefined"
    :borderRadius="background ? '$md' : undefined"
    :color="
      color
        ? color
        : {
            base: '$link',
            hover: '$link',
          }
    "
    :textDecoration="{
      base: 'none',
      hover: underline ? 'underline' : 'none',
    }"
    :attributes="{
      ...attributes,
      href: href,
      target: target,
      rel: rel,
    }"
    :class="clx(className)"
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

import clx from "clsx";
import Box from "../box";
import type { LinkProps } from "./link.types";

const props = withDefaults(defineProps<LinkProps>(), {
  as: "a",
  background: undefined,
  color: undefined,
  underline: true,
  attributes: undefined,
  href: undefined,
  target: undefined,
  rel: "noopener noreferrer",
  className: undefined,
  children: undefined,
});
</script>