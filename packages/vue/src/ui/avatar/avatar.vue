<template>
  <Box
    as="span"
    display="inline-flex"
    :borderWidth="showBorder ? '$sm' : undefined"
    :borderColor="borderColor"
    :borderRadius="rounded ? '$full' : 'none'"
    :backgroundColor="backgroundColor"
    :attributes="attributes"
    :class="props.class ?? props.className"
    ><span
      :data-loaded="isLoaded"
      :data-custom-bg="!!backgroundColor"
      :style="cssVars"
      :class="avatar[internalTheme]"
      ><AvatarImage
        :src="src"
        :srcSet="srcSet"
        :loading="loading"
        :fallbackMode="fallbackMode"
        :onLoad="
          (event) => {
            onLoad?.(event);
            isLoaded = true;
          }
        "
        :width="sizeValue"
        :height="sizeValue"
        :onError="(event) => onError"
        :getInitials="getInitials"
        :name="name"
        :borderRadius="borderRadius"
        :ignoreFallback="ignoreFallback"
        :crossOrigin="crossOrigin"
        :referrerPolicy="referrerPolicy"
      ></AvatarImage
      ><slot /></span
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

import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import Box from "../box";
import AvatarImage from "../avatar-image";
import { store } from "../../models/store";
import { avatarSize } from "./avatar.helper";
import { avatarSizeVar, avatar } from "./avatar.css";
import type { AvatarProps } from "./avatar.types";

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "md",
  showBorder: undefined,
  borderColor: undefined,
  rounded: true,
  backgroundColor: undefined,
  attributes: undefined,
  className: undefined,
  src: undefined,
  srcSet: undefined,
  loading: undefined,
  fallbackMode: "initials",
  onLoad: undefined,
  onError: undefined,
  getInitials: undefined,
  name: undefined,
  borderRadius: undefined,
  ignoreFallback: undefined,
  crossOrigin: undefined,
  referrerPolicy: undefined,
  children: undefined,
});
const internalTheme = ref("light");
const isLoaded = ref(false);
const sizeValue = ref(avatarSize(props.size));

const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  cleanupRef.value = store.subscribe((newState) => {
    internalTheme.value = newState.theme;
  });
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
});
const cssVars = computed(() => {
  return assignInlineVars({
    [avatarSizeVar]: sizeValue.value,
  });
});

watch(
  () => [props.size],
  () => {
    sizeValue.value = avatarSize(props.size);
  },
  { immediate: true }
);
</script>