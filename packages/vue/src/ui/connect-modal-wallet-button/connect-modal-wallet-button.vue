<template>
  <button
    :class="
      clx(
        connectButtonStyle[internalTheme],
        connectButtonVariants({
          variant: variant,
        })
      )
    "
    :style="overrideManager?.applyOverrides(buttonOverrides.name)"
    :title="name"
    @click="onClick($event)"
  >
    <template v-if="!!logo">
      <Box
        as="span"
        position="relative"
        display="block"
        :class="
          clx(
            logoVariants({
              variant: variant,
            })
          )
        "
        ><Box position="relative">
          <template v-if="logo && !btmLogo">
            <img
              referrerPolicy="no-referrer"
              :alt="name"
              :src="logo"
              :width="variant === 'square' ? '56px' : '32px'"
              :height="variant === 'square' ? '56px' : '32px'"
              :style="{
                objectFit: 'contain',
              }"
            />
          </template>

          <template v-if="btmLogo && variant === 'list'">
            <Avatar
              backgroundColor="transparent"
              size="sm"
              :name="name"
              :src="logo"
              :rounded="false"
              ><AvatarBadge
                size="1.2em"
                borderWidth="0.1em"
                :attributes="{
                  backgroundColor:
                    internalTheme === 'dark' ? '$gray300' : '$white',
                }"
                ><img
                  width="100%"
                  height="100%"
                  :style="{
                    borderRadius: '9999px',
                    objectFit: 'contain',
                  }"
                  :alt="
                    ['MetaMask'].includes(btmLogo) ? btmLogo : `${name} logo`
                  "
                  :src="
                    ['MetaMask'].includes(btmLogo)
                      ? WalletPluginSystem[btmLogo].logo
                      : btmLogo
                  " /></AvatarBadge
            ></Avatar>
          </template>

          <template v-if="btmLogo && !subLogo && variant === 'square'">
            <Avatar
              backgroundColor="transparent"
              size="md"
              :name="name"
              :src="logo"
              :rounded="false"
              ><AvatarBadge
                size="1.2em"
                borderWidth="0.1em"
                :attributes="{
                  backgroundColor:
                    internalTheme === 'dark' ? '$gray300' : '$white',
                }"
                ><img
                  width="100%"
                  height="100%"
                  :style="{
                    borderRadius: '9999px',
                    objectFit: 'contain',
                  }"
                  :alt="
                    ['MetaMask'].includes(btmLogo) ? btmLogo : `${name} logo`
                  "
                  :src="
                    ['MetaMask'].includes(btmLogo)
                      ? WalletPluginSystem[btmLogo].logo
                      : btmLogo
                  " /></AvatarBadge
            ></Avatar>
          </template>
        </Box>
        <template
          v-if="variant === 'square' && typeof subLogo === 'string' && !btmLogo"
        >
          <span
            :style="
              overrideManager?.applyOverrides(buttonSublogoOverrides.name)
            "
            :class="subLogoSquare[internalTheme]"
          >
            <template v-if="subLogo === 'walletConnect'">
              <Icon name="mobileWalletCircle" size="2xl"></Icon>
            </template>

            <template v-if="subLogo !== 'walletConnect'">
              <img
                width="24px"
                height="24px"
                :src="subLogo"
                :alt="`${name} sub logo`"
                :style="{
                  objectFit: 'contain',
                }"
              />
            </template>
          </span>
        </template>
      </Box>
    </template>

    <Box
      :rawCSS="{
        ...overrideManager?.applyOverrides(buttonLabelOverrides.name),
        width: variant === 'square' ? 'calc(80%)' : 'auto',
      }"
      :class="
        clx(
          buttonTextStyle[internalTheme],
          buttonTextVariants({
            variant: variant,
          })
        )
      "
    >
      <template v-if="!badge">
        <Text
          as="span"
          :ellipsis="true"
          :textAlign="variant === 'square' ? 'center' : 'left'"
          :attributes="{
            width: '100%',
            display: 'inline-block',
          }"
          >{{ name }}</Text
        >
      </template>

      <template v-if="badge">
        <Text
          as="p"
          :attributes="{
            display: 'inline-block',
            position: 'relative',
            pr: '$2',
          }"
          ><Text
            as="span"
            :ellipsis="true"
            :textAlign="variant === 'square' ? 'center' : 'left'"
            :attributes="{
              width: '100%',
              display: 'inline-block',
            }"
            >{{ name }}</Text
          ><Text
            as="span"
            fontSize="$3xs"
            fontWeight="$semibold"
            :attributes="{
              px: '$3',
              py: '4px',
              borderRadius: '$md',
              textTransform: 'uppercase',
              position: 'absolute',
              top: '$-3',
              left: '$full',
              color: internalTheme === 'dark' ? '$gray300' : '$gray800',
              backgroundColor:
                internalTheme === 'dark' ? '$gray600' : '$gray200',
            }"
            >{{ badge }}</Text
          ></Text
        >
      </template>
    </Box>
    <template v-if="variant === 'list' && typeof subLogo === 'string'">
      <span :class="subLogoList">
        <template v-if="subLogo === 'walletConnect'">
          <Icon name="mobileWallet" size="xl"></Icon>
        </template>

        <template v-if="subLogo !== 'walletConnect'">
          <img
            width="20px"
            height="20px"
            :src="subLogo"
            :alt="`${name} sub logo`"
            :style="{
              objectFit: 'contain',
            }"
          />
        </template>
      </span>
    </template>
  </button>
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
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  connectButtonStyle,
  buttonTextStyle,
  logoVariants,
  buttonTextVariants,
  subLogoSquare,
  subLogoList,
} from "./connect-modal-wallet-button.css";
import { store } from "../../models/store";
import Box from "../box";
import Avatar from "../avatar";
import AvatarBadge from "../avatar-badge";
import Icon from "../icon";
import {
  buttonOverrides,
  buttonLabelOverrides,
  buttonSublogoOverrides,
} from "./connect-modal-wallet-button.helper";
import Text from "../text";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import { WalletPluginSystem } from "../connect-modal-wallet-list";

const props = defineProps<ConnectModalWalletButtonProps>();
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