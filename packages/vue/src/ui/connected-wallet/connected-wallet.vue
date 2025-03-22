<template>
  <Box width="$fit" px="$8" py="$15"
    ><Stack
      direction="vertical"
      :attributes="{
        alignItems: 'center',
      }"
    >
      <template v-if="avatar">
        <Box
          as="img"
          borderRadius="$full"
          width="$18"
          height="$18"
          marginTop="$5"
          :attributes="{
            src: avatar,
          }"
        ></Box>
      </template>

      <template v-else>
        <Icon
          name="astronaut"
          size="$13xl"
          :attributes="{
            borderRadius: '$full',
            marginTop: '$5',
          }"
        ></Icon>
      </template>
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        :attributes="{
          marginTop: '$8',
          marginBottom: '$8',
        }"
        >{{ name }}</Text
      ><Box marginBottom="$8"
        ><ClipboardCopyText
          :text="address"
          :truncate="truncate"
          :midTruncateLimit="midTruncateLimit"
          :onCopied="(event) => onCopied?.()"
        ></ClipboardCopyText></Box
      ><Button :onClick="(event) => onClick?.()">{{ btnText }}</Button></Stack
    ></Box
  >
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

import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import ClipboardCopyText from "../clipboard-copy-text";
import type { ConnectedWalletProps } from "./connected-wallet.types";

const props = withDefaults(defineProps<ConnectedWalletProps>(), {
  avatar: undefined,
  name: undefined,
  address: undefined,
  truncate: "middle",
  midTruncateLimit: "sm",
  onClick: undefined,
  btnText: "My Wallet",
});
</script>