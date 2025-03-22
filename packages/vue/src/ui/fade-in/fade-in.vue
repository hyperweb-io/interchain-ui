<template>
  <div ref="elementRef"><slot /></div>
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

import { ref, watch } from "vue";

import anime from "animejs";
import type { AnimeInstance } from "animejs";
import type { FadeInProps } from "./fade-in.types";

const props = defineProps<FadeInProps>();

const fadeInAnimationRef = ref<AnimeInstance | null>();
const fadeOutAnimationRef = ref<AnimeInstance | null>();
const elementRef = ref<undefined>();

watch(
  () => [props.delayMs, props.durationMs, props.isVisible],
  () => {
    const delaySetting = props.delayMs || 100;
    const durationSetting = props.durationMs || 250;

    // Animation not init yet
    if (
      elementRef.value &&
      !fadeInAnimationRef.value &&
      !fadeOutAnimationRef.value
    ) {
      fadeInAnimationRef.value = anime({
        targets: elementRef.value,
        opacity: [0, 1],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });
      fadeOutAnimationRef.value = anime({
        targets: elementRef.value,
        opacity: [1, 0],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });
    }
    if (props.isVisible) {
      fadeInAnimationRef.value?.restart();
    } else {
      fadeOutAnimationRef.value?.restart();
    }
  },
  { immediate: true }
);
</script>