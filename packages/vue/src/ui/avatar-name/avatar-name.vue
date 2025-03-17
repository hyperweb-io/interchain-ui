<template>
  <Box
    fontFamily="$body"
    fontWeight="$normal"
    :attributes="{
      role: 'img',
      'aria-label': name,
    }"
    :boxRef="boxRef"
    :class="avatarName"
  >
    <template v-if="!!name && showInitials">
      {{ initials(name) }}
    </template>
  </Box>
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
import { avatarName } from "../avatar/avatar.css";
import type { AvatarNameProps } from "../avatar/avatar.types";

const props = withDefaults(defineProps<AvatarNameProps>(), {
  getInitials: undefined,
  name: undefined,
  boxRef: undefined,
  showInitials: true,
});

function initials(name: string) {
  if (typeof props.getInitials === "function") {
    return props.getInitials(props.name);
  }
  const names = name.split(" ");
  const firstName = names[0] ?? "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}
</script>