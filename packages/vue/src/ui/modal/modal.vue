<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import * as styles from "./modal.css";
import useTheme from "@/ui/hooks/use-theme/use-theme";

interface ModalProps {
  isOpen?: boolean;
  initialOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  initialFocusRef?: HTMLElement | null;
  renderTrigger?: (props: any) => any;
  header: any;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  root?: HTMLElement | null;
  className?: string;
  themeClassName?: string;
  contentStyles?: Record<string, string>;
  contentClassName?: string;
  backdropClassName?: string;
  childrenClassName?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: undefined,
  initialOpen: false,
  closeOnClickaway: true,
  preventScroll: true,
  role: "dialog",
});

const emit = defineEmits(["update:isOpen"]);

const defaultRoot = ref<HTMLElement | null>(null);
const isOpen = ref(props.isOpen ?? props.initialOpen);
const { theme, themeClass, getThemeRef } = useTheme();

const modalContentClass = computed(() => {
  return styles.modalContent[theme.value];
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue !== undefined) {
      isOpen.value = newValue;
    }
  },
);

watch(isOpen, (newValue) => {
  emit("update:isOpen", newValue);
  if (newValue) {
    props.onOpen?.();
  } else {
    props.onClose?.();
  }
});

onMounted(() => {
  if (!props.root) {
    defaultRoot.value = document.body;
  }
});

const closeModal = () => {
  isOpen.value = false;
};

const onCloseButtonClick = () => {
  closeModal();
};

// Expose isOpen for v-model binding
defineExpose({ isOpen });
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      :class="[styles.modalRoot, themeClassName, themeClass]"
      @close="closeModal"
      :role="role"
    >
      <div :class="styles.modalContainer" ref="getThemeRef">
        <TransitionChild
          as="template"
          :enter="styles.backdropTransitionEnter"
          :enter-from="styles.backdropTransitionEnterFrom"
          :enter-to="styles.backdropTransitionEnterTo"
          :leave="styles.backdropTransitionLeave"
          :leave-from="styles.backdropTransitionLeaveFrom"
          :leave-to="styles.backdropTransitionLeaveTo"
        >
          <div
            :class="[styles.modalBackdrop, backdropClassName, themeClass]"
            @click="closeOnClickaway ? closeModal : undefined"
          />
        </TransitionChild>

        <div :class="[styles.modalWrapper, themeClass]">
          <TransitionChild
            as="template"
            :enter="styles.transitionEnter"
            :enter-from="styles.transitionEnterFrom"
            :enter-to="styles.transitionEnterTo"
            :leave="styles.transitionLeave"
            :leave-from="styles.transitionLeaveFrom"
            :leave-to="styles.transitionLeaveTo"
          >
            <DialogPanel
              :class="[
                styles.modalPanel,
                modalContentClass,
                className,
                themeClass,
              ]"
              :style="[
                {
                  '--modal-bg': styles.modalBgVar,
                  '--modal-shadow': styles.modalShadowVar,
                },
                contentStyles,
              ]"
            >
              <div
                :class="[
                  styles.modalContent[theme],
                  contentClassName,
                  themeClass,
                ]"
                data-modal-part="content"
              >
                <div :class="[styles.modalHeader, themeClass]">
                  <slot
                    name="header"
                    :closeButtonProps="{
                      onClick: onCloseButtonClick,
                      class: [styles.modalCloseButton, themeClass],
                    }"
                  >
                    <component
                      v-if="header"
                      :is="header"
                      :closeButtonProps="{
                        onClick: onCloseButtonClick,
                        class: [styles.modalCloseButton, themeClass],
                      }"
                    />
                  </slot>
                </div>

                <div
                  :class="[styles.modalChildren, childrenClassName, themeClass]"
                  data-modal-part="children"
                >
                  <slot></slot>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <slot name="trigger" :open="() => (isOpen = true)"></slot>
</template>
