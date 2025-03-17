<template>
  <div
    @click="handleOnClick($event)"
    :style="overrideManager?.applyOverrides(clipboardCopyTextOverrides.name)"
    :class="clx(containerStyle[internalTheme], className)"
  >
    <Text color="$textSecondary" :class="getTruncateClass()">{{
      transform(text)
    }}</Text>
    <template v-if="idle">
      <Icon name="copy" size="$md" :class="iconStyle.idle"></Icon>
    </template>

    <template v-else>
      <Icon
        name="checkboxCircle"
        size="$md"
        :class="iconStyle.copied[internalTheme]"
      ></Icon>
    </template>
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

import { onMounted, onUnmounted, ref } from "vue";

import clx from "clsx";
import copy from "copy-to-clipboard";
import Icon from "../icon";
import {
  containerStyle,
  textStyle,
  iconStyle,
  truncateEndStyle,
} from "./clipboard-copy-text.css";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";
import { clipboardCopyTextOverrides } from "./clipboard-copy-text.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import type { ClipboardCopyTextProps } from "./clipboard-copy-text.types";
import Text from "../text";

const props = defineProps<ClipboardCopyTextProps>();
const idle = ref(true);
const internalTheme = ref("light");
const overrideManager = ref(null);

const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  overrideManager.value = store.getState().overrideStyleManager;
  cleanupRef.value = store.subscribe((newState) => {
    internalTheme.value = newState.theme;
    overrideManager.value = newState.overrideStyleManager;
  });
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
});

function transform(text: string) {
  if (props.truncate === "middle") {
    const truncateLength = {
      lg: 14,
      md: 16,
      sm: 18,
    };
    return truncateTextMiddle(
      text,
      truncateLength[props.midTruncateLimit ?? "md"]
    );
  }
  return text;
}
function handleOnClick(event?: any) {
  const success = copy(props.text);
  if (success) {
    props.onCopied?.(event);
    idle.value = false;
    setTimeout(() => {
      idle.value = true;
    }, 1000);
  }
}
function getTruncateClass() {
  return clx(textStyle, props.truncate === "end" && truncateEndStyle);
}
</script>