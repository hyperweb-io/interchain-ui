<template>
  <Box v-bind="spreadAttributes"><slot /></Box>
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

import { computed } from "vue";

import Box from "../box";
import type { TextProps } from "./text.types";
import { getTextTransformStyles, getVariantStyles } from "./text.helper";

const props = withDefaults(defineProps<TextProps>(), {
  as: "p",
  className: undefined,
  attributes: undefined,
  domAttributes: undefined,
  variant: "body",
  fontFamily: undefined,
  ellipsis: false,
  underline: false,
  color: "$text",
  fontSize: "$sm",
  fontWeight: undefined,
  letterSpacing: undefined,
  lineHeight: undefined,
  textAlign: undefined,
  textTransform: undefined,
  wordBreak: "break-word",
  children: undefined,
});

const spreadAttributes = computed(() => {
  return Object.assign(
    {
      margin: "$0",
      as: props.as,
      className: props.class,
    },
    props.attributes,
    props.domAttributes,
    getVariantStyles(props.variant ?? "body", props.fontFamily),
    getTextTransformStyles({
      ellipsis: props.ellipsis,
      underline: props.underline,
    }),
    {
      color: props.color,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      letterSpacing: props.letterSpacing,
      lineHeight: props.lineHeight,
      textAlign: props.textAlign,
      textTransform: props.textTransform,
      wordBreak: props.wordBreak,
    }
  );
});
</script>