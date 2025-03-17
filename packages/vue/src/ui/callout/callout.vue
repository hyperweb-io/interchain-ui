<template>
  <Box
    borderRadius="$md"
    p="$6"
    :class="props.class ?? props.className"
    v-bind="{ ...colorsProperties, ...attributes }"
    ><Box display="flex" gap="$6" flexDirection="column"
      ><Box display="flex" flexWrap="nowrap" gap="$5">
        <template v-if="!!iconName && isValidIconName()">
          <Icon size="$3xl" color="inherit" :name="iconName"></Icon>
        </template>

        <template v-if="!iconName && !isValidIconName() && iconRender">
          {{ iconRender }}
        </template>

        <Text as="h5" fontSize="$md" fontWeight="$semibold" color="inherit">{{
          title
        }}</Text></Box
      ><Text as="div" fontSize="$sm" fontWeight="$normal" color="inherit"
        ><slot /></Text></Box
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

import { computed, onMounted, onUnmounted, ref } from "vue";

import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import { getIntentColors } from "./callout.helpers";
import type { CalloutProps } from "./callout.types";

const props = withDefaults(defineProps<CalloutProps>(), {
  intent: "none",
  iconName: undefined,
  attributes: undefined,
  className: undefined,
  iconRender: undefined,
  title: undefined,
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
const colorsProperties = computed(() => {
  return getIntentColors(props.intent, internalTheme.value as ThemeVariant);
});

function isValidIconName() {
  return ALL_ICON_NAMES.includes(props.iconName);
}
</script>