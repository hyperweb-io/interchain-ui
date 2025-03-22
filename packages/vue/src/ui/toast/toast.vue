<template>
  <li
    aria-atomic="true"
    role="status"
    data-interchain-toast=""
    :aria-live="toast.important ? 'assertive' : 'polite'"
    :tabIndex="0"
    ref="toastRef"
    :data-styled="true"
    :data-theme="theme"
    :data-mounted="mounted"
    :data-promise="Boolean(toast.promise)"
    :data-removed="removed"
    :data-visible="isVisible"
    :data-y-position="positionTuple.y"
    :data-x-position="positionTuple.x"
    :data-index="index"
    :data-front="isFront"
    :data-swiping="swiping"
    :data-type="toastType"
    :data-invert="invert"
    :data-swipe-out="swipeOut"
    :data-expanded="Boolean(expanded || (expandByDefault && mounted))"
    :style="{
      ...assignInlineVars({
        [indexVar]: `${index}`,
        [toastsBeforeVar]: `${index}`,
        [zIndexVar]: `${toasts.length - index}`,
        [offsetVar]: `${removed ? offsetBeforeRemove : offset}px`,
        [initialHeightVar]: expandByDefault ? 'auto' : `${initialHeight}px`,
        [swipeAmountVar]: `${swipeAmount}`,
      }),
      ...rawCSS,
      ...toast.rawCSS,
    }"
    @pointerdown="handleOnPointerDown"
    @pointerup="handleOnPointerUp"
    @pointermove="handleOnPointerMove"
    :class="clx(toast, props.class ?? props.className, toast.className)"
  >
    <template v-if="closeButton">
      <button
        aria-label="Close toast"
        :data-disabled="disabled"
        :data-close-button="true"
        @click="handleCloseButtonClick()"
        :class="toastCloseButton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-line-cap="round"
          stroke-line-join="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </template>

    <template v-if="toastType || toast.icon || toast.promise">
      <div data-icon="" :class="toastIcon">
        <template v-if="toast.promise && toastType === 'loading'">
          <div :class="toastSpinner"><Icon name="loaderFill"></Icon></div>
        </template>

        <template v-if="toast.icon">
          {{ toast.icon }}
        </template>

        <template v-if="!toast.icon && statusIconName">
          <Icon :name="statusIconName"></Icon>
        </template>
      </div>
    </template>

    <div data-content="" :class="toastContent">
      <div data-title="" :class="toastTitle">{{ toast.title }}</div>
      <template v-if="toast.description">
        <div
          data-description=""
          :class="clx(toastDescription, descriptionClassName)"
        >
          {{ toast.description }}
        </div>
      </template>
    </div>
    <template v-if="toast.cancel">
      <button
        :data-button="true"
        :data-cancel="true"
        @click="handleCancelButtonClick()"
        :class="toastCancelButton"
      >
        {{ toast.cancel.label }}
      </button>
    </template>

    <template v-if="toast.action">
      <button
        data-button=""
        @click="handleActionButtonClick($event)"
        :class="toastButton"
      >
        {{ toast.action.label }}
      </button>
    </template>
  </li>
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

import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import clx from "clsx";
import { store } from "../../models/store";
import Icon from "../icon";
import type { IconName } from "../icon/icon.types";
import {
  GAP,
  SWIPE_TRESHOLD,
  TIME_BEFORE_UNMOUNT,
  TOAST_LIFETIME,
} from "./toast.constants";
import {
  indexVar,
  initialHeightVar,
  offsetVar,
  swipeAmountVar,
  toast,
  toastButton,
  toastCancelButton,
  toastCloseButton,
  toastContent,
  toastDescription,
  toastIcon,
  toastSpinner,
  toastTitle,
  toastsBeforeVar,
  zIndexVar,
} from "./toast.css";
import type { ToastHeight, ToastProps } from "./toast.types";

const props = defineProps<ToastProps>();
const theme = ref("light");
const mounted = ref(false);
const removed = ref(false);
const swiping = ref(false);
const swipeOut = ref(false);
const offsetBeforeRemove = ref(0);
const initialHeight = ref(0);
const swipeAmount = ref("0px");

const toastRef = ref<HTMLLIElement>();
const cleanupTimerRef = ref<(() => void) | null>();
const restoreHeightsRef = ref<(() => void) | null>();
const closeTimerStartTimeRef = ref<number>();
const offset = ref<number>();
const lastCloseTimerStartTimeRef = ref<number>();
const pointerStartRef = ref<{
  x: number;
  y: number;
} | null>();
const closeTimerRemainingTimeRef = ref<number>();
const cleanupUIStore = ref<undefined>();

onMounted(() => {
  // Trigger enter animation without using CSS animation
  mounted.value = true;
  theme.value = store.getState().theme.value;
  cleanupUIStore.value = store.subscribe((newState) => {
    theme.value = newState.theme.value;
  });
});
onUnmounted(() => {
  if (typeof cleanupTimerRef.value === "function") {
    cleanupTimerRef.value();
  }
  if (typeof restoreHeightsRef.value === "function") {
    restoreHeightsRef.value();
  }
  if (typeof cleanupUIStore.value === "function") {
    cleanupUIStore.value();
  }
});
const isFront = computed(() => {
  return props.index === 0;
});
const isVisible = computed(() => {
  return props.index + 1 <= props.visibleToasts;
});
const toastType = computed(() => {
  return props.toast.type;
});
const positionTuple = computed(() => {
  const [y, x] = props.position.split("-");
  return {
    x,
    y,
  };
});
const invert = computed(() => {
  return props.toast.invert || props.invert;
});
const disabled = computed(() => {
  return props.toast.type === "loading";
});
const statusIconName = computed(() => {
  if (props.toast.type === "success") return "checkFill";
  if (props.toast.type === "error") return "errorWarningFill";
  return null;
});
const heightIndex = computed(() => {
  return (
    props.heights.findIndex(
      (height: ToastHeight) => height.toastId === props.toast.id
    ) || 0
  );
});
const duration = computed(() => {
  return props.toast.duration || props.duration || TOAST_LIFETIME;
});
const toastsHeightBefore = computed(() => {
  return props.heights.reduce((prev, curr, reducerIndex) => {
    // Calculate offset.value up untill current  toast
    if (reducerIndex >= heightIndex) {
      return prev;
    }
    return prev + curr.height;
  }, 0);
});

onUpdated(() => {
  offset.value = heightIndex * GAP + toastsHeightBefore;
});

watch(
  () => [
    mounted.value,
    props.toast.title,
    props.toast.description,
    props.toast.id,
  ],
  () => {
    if (!mounted.value) {
      return;
    }
    const toastNode = toastRef.value;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = "auto";
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;
    initialHeight.value = newHeight;
    const calcNewHeights = () => {
      const oldHeights = props.heights;
      const alreadyExists = oldHeights.find(
        (height) => height.toastId === props.toast.id
      );
      if (!alreadyExists) {
        return [
          {
            toastId: props.toast.id,
            height: newHeight,
          },
          ...oldHeights,
        ];
      } else {
        return oldHeights.map((height) =>
          height.toastId === props.toast.id
            ? {
                ...height,
                height: newHeight,
              }
            : height
        );
      }
    };
    props.setHeights(calcNewHeights());
  },
  { immediate: true }
);
watch(
  () => [
    props.expanded,
    props.interacting,
    props.expandByDefault,
    props.toast,
    props.duration,
    props.toast.promise,
    deleteToast,
    toastType,
  ],
  () => {
    // Always clear timer in new update pass
    if (typeof cleanupTimerRef.value === "function") {
      cleanupTimerRef.value();
    }
    if (
      (props.toast.promise && toastType === "loading") ||
      props.toast.duration === Infinity
    ) {
      return;
    }
    let timeoutId: ReturnType<typeof setTimeout>;

    // Pause the exit timer on hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.value < closeTimerStartTimeRef.value) {
        // Get the elapsed time since the timer started
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
        closeTimerRemainingTimeRef.value =
          closeTimerRemainingTimeRef.value - elapsedTime;
      }
      lastCloseTimerStartTimeRef.value = new Date().getTime();
    };
    const startTimer = () => {
      closeTimerStartTimeRef.value = new Date().getTime();
      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        props.toast.onAutoClose?.(props.toast);
        deleteToast();
      }, closeTimerRemainingTimeRef.value);
    };
    if (props.expanded || props.interacting) {
      pauseTimer();
    } else {
      startTimer();
    }
    cleanupTimerRef.value = () => clearTimeout(timeoutId);
  },
  { immediate: true }
);
watch(
  () => [props.toast.id],
  () => {
    const toastNode = toastRef.value;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height to heights array after the toast is mounted.value
      initialHeight.value = height;
      const oldHeights = props.heights;
      props.setHeights([
        {
          toastId: props.toast.id,
          height,
        },
        ...oldHeights,
      ]);
      restoreHeightsRef.value = () => {
        const oldHeights = props.heights;
        props.setHeights(
          oldHeights.filter((height) => height.toastId !== props.toast.id)
        );
      };
    }
  },
  { immediate: true }
);
watch(
  () => [props.toast.delete],
  () => {
    if (props.toast.delete) {
      deleteToast();
    }
  },
  { immediate: true }
);
function pxToNum(cssValue: string) {
  return Number(cssValue.replace("px", "")) || 0;
}
function deleteToast() {
  // Save the offset.value for the exit swipe animation
  removed.value = true;
  offsetBeforeRemove.value = offset.value;
  const oldHeights = props.heights;
  props.setHeights(
    oldHeights.filter((height) => height.toastId !== props.toast.id)
  );
  setTimeout(() => {
    props.removeToast(props.toast);
  }, TIME_BEFORE_UNMOUNT);
}
function handleCloseButtonClick() {
  if (disabled) {
    return;
  }
  deleteToast();
  props.toast.onDismiss?.(props.toast);
}
function handleCancelButtonClick() {
  deleteToast();
  if (props.toast.cancel?.onClick) {
    props.toast.cancel.onClick();
  }
}
function handleActionButtonClick(event) {
  props.toast.action?.onClick(event);
  if (event.defaultPrevented) {
    return;
  }
  deleteToast();
}
function handleOnPointerDown(event) {
  if (disabled) return;
  offsetBeforeRemove.value = offset.value;
  // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping.value)
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
  if ((event.target as HTMLElement).tagName === "BUTTON") return;
  swiping.value = true;
  pointerStartRef.value = {
    x: event.clientX,
    y: event.clientY,
  };
}
function handleOnPointerUp() {
  if (swipeOut.value) {
    return;
  }
  pointerStartRef.value = null;
  const swipeAmountNum = Number(
    pxToNum(toastRef.value?.style.getPropertyValue(`${swipeAmountVar}`))
  );

  // Remove only if treshold is met
  if (Math.abs(swipeAmountNum) >= SWIPE_TRESHOLD) {
    offsetBeforeRemove.value = offset.value;
    props.toast.onDismiss?.(props.toast);
    deleteToast();
    swipeOut.value = true;
    return;
  }
  swipeAmount.value = "0px";
  swiping.value = false;
}
function handleOnPointerMove(event) {
  if (!pointerStartRef.value) return;
  const yPosition = event.clientY - pointerStartRef.value.y;
  const xPosition = event.clientX - pointerStartRef.value.x;
  const clamp = positionTuple.y === "top" ? Math.min : Math.max;
  const clampedY = clamp(0, yPosition);
  const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
  const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;
  if (isAllowedToSwipe) {
    swipeAmount.value = `${yPosition}px`;
  } else if (Math.abs(xPosition) > swipeStartThreshold) {
    // User is swiping.value in wrong direction so we disable swipe gesture
    // for the current pointer down interaction
    pointerStartRef.value = null;
  }
}
</script>