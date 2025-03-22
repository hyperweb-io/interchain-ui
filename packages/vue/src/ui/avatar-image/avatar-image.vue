<template>
  <template v-if="getShowFallback()">
    <AvatarName
      :name="name"
      :getInitials="getInitials"
      :showInitials="fallbackMode === 'initials'"
    ></AvatarName>
  </template>

  <template v-else>
    <img
      ref="imgRef"
      :src="src"
      :srcset="srcSet"
      :alt="name"
      @load="onLoad"
      :width="width"
      :height="height"
      :referrerPolicy="referrerPolicy"
      :crossOrigin="crossOrigin ?? undefined"
      :loading="loading"
      :data-status="getResolvedStatus()"
      :style="getInlineStyles()"
      :class="cls(avatarImg, className)"
    />
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

import { onUnmounted, ref, watch } from "vue";

import cls from "clsx";
import AvatarName from "../avatar-name";
import { avatarImg } from "../avatar/avatar.css";
import type { AvatarImageProps } from "../avatar/avatar.types";

const props = defineProps<AvatarImageProps>();
const status = ref("pending");
const transitionState = ref("idle");

const imgRef = ref<HTMLImageElement | null>();
const cleanupRef = ref<undefined>();

onUnmounted(() => {
  if (typeof cleanupRef.value === "function") {
    cleanupRef.value();
  }
});

watch(
  () => [props.src],
  () => {
    status.value = props.src ? "loading" : "pending";
  },
  { immediate: true }
);
watch(
  () => [
    status.value,
    props.ignoreFallback,
    props.crossOrigin,
    props.srcSet,
    props.sizes,
    props.onLoad,
    props.onError,
    props.loading,
  ],
  () => {
    if (props.ignoreFallback) return;
    if (status.value === "loading") {
      load();
    }
    cleanupRef.value = () => {
      flush();
    };
  },
  { immediate: true }
);
function load() {
  if (!props.src) return;
  flush();
  const img = new Image();
  img.src = props.src;
  if (props.crossOrigin) img.crossOrigin = props.crossOrigin;
  if (props.srcSet) img.srcset = props.srcSet;
  if (props.sizes) img.sizes = props.sizes;
  if (props.loading) img.loading = props.loading;
  img.onload = (event) => {
    flush();
    status.value = "loaded";
    transitionState.value = "entered";
    props.onLoad?.(event);
  };
  img.onerror = (error) => {
    flush();
    status.value = "failed";
    props.onError?.(error);
  };
  imgRef.value = img;
}
function flush() {
  if (imgRef.value) {
    imgRef.value.onload = null;
    imgRef.value.onerror = null;
    imgRef.value = null;
    transitionState.value = "idle";
  }
}
function getResolvedStatus() {
  return props.ignoreFallback ? "loaded" : status.value;
}
function getShowFallback() {
  return !props.src || getResolvedStatus() !== "loaded";
}
function getInlineStyles() {
  return {
    opacity: `${transitionState.value === "idle" ? 0 : 1}`,
    transition:
      transitionState.value === "entered"
        ? "opacity 150ms cubic-bezier(0.7, 0, 0.84, 0)"
        : "none !important",
  };
}
</script>