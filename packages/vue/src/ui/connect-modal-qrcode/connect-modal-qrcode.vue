<template>
  <Stack
    direction="vertical"
    space="$0"
    :attributes="{
      alignItems: 'center',
    }"
    ><Text fontWeight="$medium" fontSize="$md" :class="descriptionStyle">{{
      description
    }}</Text>
    <template v-if="status === 'Pending'">
      <Box height="$4"></Box>
      <QRCodeSkeleton></QRCodeSkeleton>
    </template>

    <template v-if="status === 'Done'">
      <Box height="$4"></Box>
      <div
        :style="overrideManager?.applyOverrides(connectQRCodeOverrides.name)"
        :class="qrCodeContainer[internalTheme]"
      >
        <QRCode
          level="L"
          :value="link"
          :size="qrCodeSize"
          :bgColor="qrCodeBgVar"
          :fgColor="qrCodeFgVar"
          :includeMargin="false"
        ></QRCode>
      </div>
    </template>

    <template v-if="status === 'Error' || status === 'Expired'">
      <Box height="$4"></Box>
      <QRCodeError
        :onRefresh="(event) => onRefresh?.()"
        :qrCodeSize="qrCodeSize"
      ></QRCodeError>
    </template>

    <template v-if="!!errorTitle">
      <template v-if="status === 'Error'">
        <Box height="$4"></Box>
        <Text
          as="p"
          fontWeight="$medium"
          fontSize="$md"
          color="$textDanger"
          :attributes="{
            marginTop: '$2',
          }"
          >{{ errorTitle }}</Text
        >
      </template>

      <template v-if="status === 'Expired'">
        <Box height="$4"></Box>
        <Text
          as="p"
          fontWeight="$medium"
          fontSize="$md"
          color="$textWarning"
          :attributes="{
            marginTop: '$2',
          }"
          >{{ errorTitle }}</Text
        >
      </template>
    </template>

    <template v-if="!!errorDesc">
      <Box height="$4"></Box>
      <div :class="qrCodeDesc">
        <div ref="measureRef" :class="qrCodeDescContent">
          <p>{{ errorDesc }}</p>
        </div>
        <div
          ref="shadowRef"
          :style="
            overrideManager?.applyOverrides(connectQRCodeShadowOverrides.name)
          "
          :class="qrCodeDescShadow[internalTheme]"
        ></div>
      </div>
    </template>
  </Stack>
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

import { onMounted, onUnmounted, ref, watch } from "vue";

import anime from "animejs";
import type { ConnectModalQRCodeProps } from "./connect-modal-qrcode.types";
import QRCodeSkeleton from "../connect-modal-qrcode-skeleton";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import QRCode from "../qrcode";
import QRCodeError from "../connect-modal-qrcode-error";
import {
  descriptionStyle,
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
  qrCodeDesc,
  qrCodeDescContent,
  qrCodeDescShadow,
} from "./connect-modal-qrcode.css";
import { store } from "../../models/store";
import {
  connectQRCodeOverrides,
  connectQRCodeShadowOverrides,
} from "./connect-modal-qrcode.helper";
import type { AnimeInstance } from "animejs";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";

const props = withDefaults(defineProps<ConnectModalQRCodeProps>(), {
  description: undefined,
  status: undefined,
  link: undefined,
  qrCodeSize: 230,
  onRefresh: undefined,
  errorTitle: undefined,
  errorDesc: undefined,
});
const displayBlur = ref(false);
const internalTheme = ref("light");
const overrideManager = ref(null);

const measureRef = ref<HTMLDivElement>();
const shadowRef = ref<HTMLDivElement>();
const animationRef = ref<AnimeInstance | null>();
const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  overrideManager.value = store.getState().overrideStyleManager;
  if (measureRef.value) {
    if (measureRef.value.clientHeight >= 64) {
      displayBlur.value = true;
    } else {
      displayBlur.value = false;
    }
    const scrollHandler = () => {
      const height = Math.abs(
        measureRef.value.scrollHeight -
          measureRef.value.clientHeight -
          measureRef.value.scrollTop
      );
      if (height < 1) {
        displayBlur.value = false;
      } else {
        displayBlur.value = true;
      }
    };
    measureRef.value.addEventListener("scroll", scrollHandler);
    const storeUnsub = store.subscribe((newState) => {
      internalTheme.value = newState.theme;
      overrideManager.value = newState.overrideStyleManager;
    });
    cleanupRef.value = () => {
      storeUnsub();
      if (measureRef.value) {
        measureRef.value.removeEventListener("scroll", scrollHandler);
      }
    };
  }
});
onUnmounted(() => {
  if (typeof cleanupRef.value === "function") cleanupRef.value();
});

watch(
  () => [displayBlur.value, shadowRef.value],
  () => {
    if (!shadowRef.value) return;

    // Animation not init yet
    if (shadowRef.value && !animationRef.value) {
      animationRef.value = anime({
        targets: shadowRef.value,
        opacity: [0, 1],
        height: [0, 28],
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }
    if (displayBlur.value) {
      animationRef.value?.restart();
    } else {
      animationRef.value?.reverse();
    }
  },
  { immediate: true }
);
</script>