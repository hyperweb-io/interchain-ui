import * as React from "react";
import type { OverlayTriggerState } from "react-stately";
import type { AriaPopoverProps } from "@react-aria/overlays";
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";
import Box from "@/ui/box";
import NobleProvider from "@/ui/noble/noble-provider";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <NobleProvider>
        {!isNonModal && (
          <Box attributes={underlayProps} position="fixed" inset="0" />
        )}

        <Box
          attributes={popoverProps}
          boxRef={popoverRef}
          boxShadow="$lg"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="$inputBorder"
          borderRadius="$lg"
          className={className}
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}

          {children}

          <DismissButton onDismiss={state.close} />
        </Box>
      </NobleProvider>
    </Overlay>
  );
}
