<template>
  <div :class="clx(styles.modalHeader, className)">
    <template v-if="hasBackButton">
      <div :class="styles.modalBackButton">
        <Button
          variant="ghost"
          intent="secondary"
          size="sm"
          :onClick="
            (e) => {
              onBack?.(e);
            }
          "
          :class="styles.headerButton"
          ><Icon name="arrowLeftSLine" size="$2xl" color="inherit"></Icon
        ></Button>
      </div>
    </template>

    <p
      :id="id"
      :style="
        overrideManager?.applyOverrides(connectModalHeadTitleOverrides.name)
      "
      :class="clx(modalHeadTitleClassName, titleProps?.className)"
      v-bind="titleProps"
    >
      {{ title }}
    </p>
    <template v-if="hasCloseButton">
      <div :class="styles.modalCloseButton">
        <Button
          variant="ghost"
          intent="secondary"
          size="sm"
          :domAttributes="closeButtonProps"
          :onClick="(e) => closeButtonProps?.onClick?.(e)"
          :class="styles.headerButton"
          ><Icon name="closeFilled" size="$2xl" color="inherit"></Icon
        ></Button>
      </div>
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

import { computed, onMounted, onUnmounted, ref } from "vue";

import clx from "clsx";
import Button from "../button";
import Icon from "../icon";
import { store } from "../../models/store";
import { connectModalHeadTitleOverrides } from "./connect-modal-head.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import * as styles from "./connect-modal-head.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalHeadProps } from "./connect-modal-head.types";

const props = withDefaults(defineProps<ConnectModalHeadProps>(), {
  className: undefined,
  hasBackButton: false,
  onBack: undefined,
  titleProps: undefined,
  id: undefined,
  title: undefined,
  hasCloseButton: true,
  closeButtonProps: undefined,
});
const internalTheme = ref("light");
const overrideManager = ref(null);

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
const modalHeadTitleClassName = computed(() => {
  return styles.modalHeaderText[internalTheme.value];
});
</script>