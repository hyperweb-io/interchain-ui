<template>
  <template v-if="label">
    <Stack space="2" :attributes="attributes">
      <template v-if="label">
        <Box as="span" display="flex" justifyContent="space-between">
          <template v-if="htmlFor === false">
            <p
              :class="clx(fieldlabelStyle, fieldLabelSizes[size])"
              v-bind="labelAttributes"
            >
              <span>{{ label }}</span>
            </p>
          </template>

          <template v-else>
            <label :id="id" :for="htmlFor" v-bind="labelAttributes"
              ><span :class="clx(fieldlabelStyle, fieldLabelSizes[size])">{{
                label
              }}</span></label
            >
          </template>
        </Box>
      </template>
    </Stack>
  </template>
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
import Stack from "../stack";
import type { FieldLabelProps } from "./field-label.types";
import { fieldLabelSizes, fieldlabelStyle } from "./field-label.css";

const props = withDefaults(defineProps<FieldLabelProps>(), {
  label: undefined,
  attributes: undefined,
  htmlFor: undefined,
  id: undefined,
  labelAttributes: undefined,
  size: "sm",
});
</script>