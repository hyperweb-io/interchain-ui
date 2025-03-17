<template>
  <div :class="clx(container, className)">
    <div
      ref="measureRef"
      :data-has-list-wallets="getListShapeWallets().length > 0"
      :class="walletList"
    >
      <template v-if="showSquareShapeWallets()">
        <FadeIn :isVisible="showSquareShapeWallets()"
          ><Box display="grid" :class="squareWallets"
            ><template
              :key="`${wallet.name}-${index}`"
              v-for="(wallet, index) in wallets.slice(0, 2)"
            >
              <WalletButton
                variant="square"
                :name="wallet.prettyName ?? wallet.name"
                :logo="wallet.logo"
                :subLogo="wallet.subLogo"
                :btmLogo="wallet.btmLogo"
                :onClick="
                  (event) =>
                    onWalletItemClickAsync(async () =>
                      onWalletItemClick?.(wallet.originalWallet)
                    )
                "
              ></WalletButton> </template></Box
        ></FadeIn>
      </template>

      <template v-if="getListShapeWallets().length > 0">
        <FadeIn :isVisible="getListShapeWallets().length > 0"
          ><Box display="grid" :class="listWallets"
            ><template
              :key="`${wallet.name}-${index}`"
              v-for="(wallet, index) in getListShapeWallets()"
            >
              <WalletButton
                variant="list"
                :name="wallet.prettyName ?? wallet.name"
                :logo="wallet.logo"
                :badge="wallet.badge"
                :subLogo="wallet.subLogo"
                :btmLogo="wallet.btmLogo"
                :onClick="
                  (event) =>
                    onWalletItemClickAsync(async () =>
                      onWalletItemClick?.(wallet.originalWallet)
                    )
                "
              ></WalletButton> </template></Box
        ></FadeIn>
      </template>
    </div>
    <div ref="shadowRef" :class="bottomShadow[internalTheme]"></div>
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

import { onMounted, onUnmounted, ref, watch } from "vue";

import anime from "animejs";
import type { AnimeInstance } from "animejs";
import clx from "clsx";
import Box from "../box";
import FadeIn from "../fade-in";
import WalletButton from "../connect-modal-wallet-button";
import {
  walletList,
  squareWallets,
  listWallets,
  container,
} from "./connect-modal-wallet-list.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ConnectModalWalletListProps } from "./connect-modal-wallet-list.types";

const props = defineProps<ConnectModalWalletListProps>();
const displayBlur = ref(false);
const internalTheme = ref("light");

const measureRef = ref<HTMLDivElement>();
const shadowRef = ref<HTMLDivElement>();
const animationRef = ref<AnimeInstance | null>();
const cleanupRef = ref<() => void>();

onMounted(() => {
  internalTheme.value = store.getState().theme;
  const unsubTheme = store.subscribe((newState) => {
    internalTheme.value = newState.theme;
  });
  if (measureRef.value) {
    if (measureRef.value.clientHeight >= 320) {
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
    cleanupRef.value = () => {
      unsubTheme();
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
        height: [0, 36],
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
function onWalletItemClickAsync(exec) {
  void (async function () {
    await exec();
  })();
}
function getListShapeWallets() {
  return props.wallets.filter((w) => w.shape === "list");
}
function showSquareShapeWallets() {
  return props.wallets.slice(0, 2).every((wallet) => wallet.shape === "square");
}
</script>