<template>
  <div ref="elementRef" :class="clsx(styles.container, className)">
    <slot /><Stack
      direction="vertical"
      :attributes="{
        display: !isVisible ? 'flex' : 'none',
        cursor: 'pointer',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '$full',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '$27',
      }"
      ><Box
        height="$23"
        flexShrink="0"
        width="$full"
        :class="styles.shadow[internalTheme]"
      ></Box
      ><Box
        width="$full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="1"
        :backgroundColor="internalTheme === 'light' ? '$white' : '$gray900'"
        :attributes="{
          onClick: () => {
            toggle();
            animationRef?.play();
          },
          'data-part-id': 'reveal-showmore',
        }"
        ><Text
          color="$textSecondary"
          fontWeight="$semibold"
          :attributes="{
            marginRight: '$5',
          }"
          >{{ showMoreLabel }}</Text
        ><Icon name="arrowDownS" color="$textSecondary"></Icon></Box></Stack
    ><Stack
      :attributes="{
        display: !!isVisible ? 'flex' : 'none',
        cursor: 'pointer',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 'fit-content',
      }"
      ><Box
        display="flex"
        alignItems="center"
        :attributes="{
          onClick: () => {
            toggle();
            animationRef?.reverse();
            animationRef?.play();
          },
          'data-part-id': 'reveal-showless',
        }"
        ><Text
          color="$textSecondary"
          fontWeight="$semibold"
          :attributes="{
            marginRight: '$5',
          }"
          >{{ showLessLabel }}</Text
        ><Icon name="arrowUpS" color="$textSecondary"></Icon></Box
    ></Stack>
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

import clsx from "clsx";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import { debounce } from "lodash";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import type { RevealProps } from "./reveal.types";
import * as styles from "./reveal.css";
import { ThemeVariant } from "../../models/system.model";

const props = withDefaults(defineProps<RevealProps>(), {
  hideThresholdHeight: 500,
  className: undefined,
  children: undefined,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
});
const internalTheme = ref("light");
const isVisible = ref(false);

const eleHeight = ref<number | null>();
const isVisibleRef = ref<boolean>();
const animationRef = ref<AnimeInstance | null>();
const elementRef = ref<undefined>();
const cleanupRef = ref<() => void>();
const resizeListenerRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  cleanupRef.value = store.subscribe((newState, prevState) => {
    internalTheme.value = newState.theme;
  });
  setTimeout(() => {
    if (!elementRef.value) return;
    const TOGGLE_SPACE = 40;
    if (elementRef.value.offsetHeight > props.hideThresholdHeight) {
      // Listen the resize event to get container height
      resizeListenerRef.value = debounce(() => {
        if (!elementRef.value) return;
        elementRef.value.style.height = "auto";
        eleHeight.value = elementRef.value.offsetHeight + TOGGLE_SPACE;
        elementRef.value.style.height = isVisibleRef.value
          ? `${eleHeight.value}px`
          : `${props.hideThresholdHeight}px`;
        updateAnimationRef();
      }, 100);
      window.addEventListener("resize", resizeListenerRef.value);

      // Simulate useLayoutEffect
      setTimeout(() => {
        if (!eleHeight.value) {
          eleHeight.value = elementRef.value.offsetHeight + TOGGLE_SPACE;
        }
        updateAnimationRef();
      }, 100);
    }
  }, 100);
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
  if (window) {
    window.removeEventListener("resize", resizeListenerRef.value);
  }
});

function toggle() {
  isVisibleRef.value = !isVisible.value;
  isVisible.value = !isVisible.value;
}
function updateAnimationRef() {
  animationRef.value = anime({
    targets: elementRef.value,
    height: [props.hideThresholdHeight, eleHeight.value],
    duration: 250,
    direction: `alternate`,
    loop: false,
    autoplay: false,
    easing: `easeInOutSine`,
  });
  isVisible.value = false;
}
</script>