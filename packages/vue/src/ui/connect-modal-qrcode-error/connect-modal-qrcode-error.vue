<template>
  <div :class="clx(qrcodeErrorContainer, qrCodeContainer, className)">
    <div
      :style="
        overrideManager?.applyOverrides(connectModalQRCodeErrorOverrides.name)
      "
      :class="qrcodeBlur[internalTheme]"
    ></div>
    <div :class="qrcodeReloadButtonContainer">
      <button
        @click="onRefresh?.($event)"
        :style="
          overrideManager?.applyOverrides(
            connectModalQRCodeErrorButtonOverrides.name
          )
        "
        :class="qrcodeReloadButton[internalTheme]"
      >
        <span><Icon name="restart" size="$lg"></Icon></span>
      </button>
    </div>
    <QRCode
      value="https://"
      level="L"
      :size="qrCodeSize"
      :bgColor="qrCodeBgVar"
      :fgColor="qrCodeFgVar"
      :includeMargin="false"
    ></QRCode>
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
import type { ConnectModalQRCodeErrorProps } from "./connect-modal-qrcode-error.types";
import QRCode from "../qrcode";
import Icon from "../icon";
import {
  qrcodeErrorContainer,
  qrcodeBlur,
  qrcodeReloadButton,
  qrcodeReloadButtonContainer,
} from "./connect-modal-qrcode-error.css";
import {
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
} from "../connect-modal-qrcode/connect-modal-qrcode.css";
import { store } from "../../models/store";
import {
  connectModalQRCodeErrorOverrides,
  connectModalQRCodeErrorButtonOverrides,
} from "./connect-modal-qrcode-error.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";

const props = defineProps<ConnectModalQRCodeErrorProps>();
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
</script>