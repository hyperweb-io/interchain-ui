<template>
  <div :class="clx(modalStatusContainer[internalTheme], className)">
    <template v-if="status === 'Disconnected'">
      <Box marginBottom="$5" :class="statusLogo"
        ><div :class="disconnectedLogoFrame[internalTheme]"></div>
        <div :class="statusLogoImage">
          <img
            :src="getWallet().logo"
            :alt="getWallet().name"
            :class="flexImg"
          /></div
      ></Box>
      <p :class="disconnectedDesc[internalTheme]">Wallet is disconnected</p>
      <div :class="widthContainer">
        <Button
          leftIcon="walletFilled"
          :fluidWidth="true"
          :onClick="(event) => onConnect?.()"
          :attributes="{
            marginBottom: '$3',
          }"
        >
          Connect wallet
        </Button>
      </div>

      <template v-if="!!bottomLink">
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            :href="bottomLink"
            :class="bottomLink"
          >
            Don't have a wallet?
          </a>
        </div>
      </template>
    </template>

    <template v-if="status === 'Connecting'">
      <Box marginBottom="$8" :class="statusLogo"
        ><div :class="connectingLogoFrame[internalTheme]"></div>
        <div :class="statusLogoImage">
          <img
            :src="getWallet().logo"
            :alt="getWallet().name"
            :class="flexImg"
          /></div
      ></Box>
      <p :class="connectingHeader[internalTheme]">{{ contentHeader }}</p>
      <Box
        as="p"
        fontSize="$sm"
        color="$body"
        fontWeight="$normal"
        textAlign="center"
        :class="descMaxWidth"
        >{{ contentDesc }}</Box
      >
    </template>

    <template v-if="status === 'Connected'">
      <Box marginBottom="$8" :class="statusLogo">
        <template v-if="typeof getConnectedInfo().avatar === 'string'">
          <div :class="statusLogoImage">
            <img
              :src="getConnectedInfo().avatar"
              :alt="getConnectedInfo().name"
              :class="flexImg"
            />
          </div>
        </template>

        <template
          v-if="
            !!getConnectedInfo().avatar &&
            typeof getConnectedInfo().avatar !== 'string'
          "
        >
          <div :class="statusLogoImageSvg">{{ getConnectedInfo().avatar }}</div>
        </template>
      </Box>
      <Box display="flex" alignItems="center" marginBottom="$5"
        ><img
          width="16px"
          height="16px"
          :src="getWallet().logo"
          :alt="getWallet().name"
        />
        <template v-if="!!getConnectedInfo().name">
          <p :class="connectedInfo[internalTheme]">
            {{ getConnectedInfo().name }}
          </p>
        </template>
      </Box>
      <div :class="widthContainer">
        <Box maxWidth="$29" mx="auto" marginBottom="$6"
          ><ClipboardCopyText
            truncate="middle"
            :text="getConnectedInfo().address"
            :class="copyText"
          ></ClipboardCopyText
        ></Box>
      </div>
      <div :class="widthContainer">
        <Box
          maxWidth="$29"
          mx="auto"
          :attributes="{
            'data-part-id': 'ConnectModalStatus-disconnect',
          }"
          ><Button
            intent="primary"
            variant="solid"
            leftIcon="walletFilled"
            :fluidWidth="true"
            :onClick="(event) => onDisconnect?.()"
          >
            Disconnect
          </Button></Box
        >
      </div>
    </template>

    <template v-if="status === 'NotExist'">
      <Box marginBottom="$7" :class="statusLogo"
        ><div :class="notExistLogoFrame[internalTheme]"></div>
        <div :class="statusLogoImage">
          <img
            :src="getWallet().logo"
            :alt="getWallet().name"
            :class="flexImg"
          /></div
      ></Box>
      <p :class="dangerText[internalTheme]">{{ contentHeader }}</p>
      <p :class="clx(baseTextStyles, desc[internalTheme])">{{ contentDesc }}</p>
      <div :class="widthContainer">
        <Box mt="$7"
          ><InstallButton
            :fluidWidth="true"
            :onClick="(event) => onInstall?.()"
            :disabled="!!disableInstall"
            ><Box
              as="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
              ><span>{{ installIcon }}</span
              ><Box as="span" marginLeft="$4">
                Install
                {{ getWallet().prettyName ?? getWallet().name }}</Box
              ></Box
            ></InstallButton
          ></Box
        >
      </div>
    </template>

    <template v-if="status === 'Rejected'">
      <Box marginBottom="$7" :class="statusLogo"
        ><div :class="notExistLogoFrame[internalTheme]"></div>
        <div :class="statusLogoImage">
          <img
            :src="getWallet().logo"
            :alt="getWallet().name"
            :class="flexImg"
          /></div
      ></Box>
      <p :class="dangerText[internalTheme]">{{ contentHeader }}</p>
      <p :class="desc[internalTheme]">{{ contentDesc }}</p>
      <div :class="widthContainer">
        <Button
          leftIcon="walletFilled"
          :fluidWidth="true"
          :onClick="(event) => onConnect?.()"
          :attributes="{
            marginBottom: '$3',
          }"
        >
          Reconnect
        </Button>
      </div>
    </template>

    <template v-if="status === 'Error'">
      <Box marginBottom="$7" :class="statusLogo"
        ><div :class="notExistLogoFrame[internalTheme]"></div>
        <div :class="statusLogoImage">
          <img
            :src="getWallet().logo"
            :alt="getWallet().name"
            :class="flexImg"
          /></div
      ></Box>
      <p :class="dangerText[internalTheme]">{{ contentHeader }}</p>
      <Box position="relative"
        ><div :class="errorDescription">
          <p :class="desc[internalTheme]">{{ contentDesc }}</p>
        </div>
        <div :class="bottomShadow[internalTheme]"></div
      ></Box>
      <div :class="widthContainer">
        <Button
          leftIcon="walletFilled"
          :fluidWidth="true"
          :onClick="(event) => onChangeWallet?.()"
          :attributes="{
            marginBottom: '$3',
          }"
        >
          Change wallet
        </Button>
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

import { onMounted, onUnmounted, ref } from "vue";

import clx from "clsx";
import Box from "../box";
import Button from "../button";
import ClipboardCopyText from "../clipboard-copy-text";
import InstallButton from "../connect-modal-install-button";
import {
  statusLogo,
  disconnectedLogoFrame,
  disconnectedDesc,
  statusLogoImage,
  modalStatusContainer,
  connectingLogoFrame,
  connectingHeader,
  notExistLogoFrame,
  dangerText,
  errorDescription,
  statusLogoImageSvg,
  widthContainer,
  connectedInfo,
  desc,
  descMaxWidth,
  flexImg,
  bottomLink,
  copyText,
} from "./connect-modal-status.css";
import { baseTextStyles } from "../text/text.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

const props = defineProps<ConnectModalStatusProps>();
const internalTheme = ref("light");

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

function getConnectedInfo() {
  return props.connectedInfo;
}
function getWallet() {
  return props.wallet;
}
</script>