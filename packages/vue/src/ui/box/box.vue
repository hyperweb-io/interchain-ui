<template>
  <component
    :style="{
      ...boxStyles.style,
      ...attributes?.style,
      ...rawCSS,
    }"
    ref="boxRef"
    :class="boxStyles.combinedClassName"
    :is="comp"
    v-bind="{
      ...finalPassThroughProps,
    }"
    v-on="eventHandlers"
    ><slot
  /></component>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "keydown",
  "keyup",
  "keypress",
  "focus",
  "blur",
  "input",
  "change",
  "submit",
  "reset",
  "scroll",
  "wheel",
  "dragstart",
  "drag",
  "dragend",
  "dragenter",
  "dragleave",
  "dragover",
  "drop",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
]);

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

import { computed, defineEmits } from "vue";

import clsx from "clsx";
import { omit } from "lodash";
import { rainbowSprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BoxProps } from "./box.types";
import { DEFAULT_VALUES } from "./box.types";

const props = defineProps<BoxProps>();

const comp = computed(() => {
  return props.as ?? DEFAULT_VALUES.as;
});
const finalPassThroughProps = computed(() => {
  return boxStyles.passThroughProps;
});
const boxStyles = computed(() => {
  const sprinklesObj = rainbowSprinkles({
    ...omit(props.props, ["attributes", "as", "boxRef.value"]),
    ...props.attributes,
  });
  return {
    combinedClassName: clsx(sprinklesObj.className, props.class),
    style: sprinklesObj.style,
    passThroughProps: omit(sprinklesObj.otherProps, [
      "attributes",
      "style",
      "rawCSS",
      "colorScheme",
    ]),
  };
});
const eventHandlers = computed(() => {
  const handlers: Record<string, (event: any) => void> = {};
  const eventProps = [
    "onClick",
    "onDoubleClick",
    "onMouseDown",
    "onMouseUp",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onMouseOver",
    "onMouseOut",
    "onKeyDown",
    "onKeyUp",
    "onKeyPress",
    "onFocus",
    "onBlur",
    "onInput",
    "onChange",
    "onSubmit",
    "onReset",
    "onScroll",
    "onWheel",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onDragEnter",
    "onDragLeave",
    "onDragOver",
    "onDrop",
    "onTouchStart",
    "onTouchMove",
    "onTouchEnd",
    "onTouchCancel",
  ];
  eventProps.forEach((eventName) => {
    if (props[eventName]) {
      handlers[eventMappings[eventName]] = (event) => {
        emit(eventMappings[eventName], event);
      };
    }
  });
  return handlers;
});
</script>