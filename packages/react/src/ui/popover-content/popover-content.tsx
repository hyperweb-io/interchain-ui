import React from "react";
import {
  useTransitionStyles,
  FloatingArrowProps,
  UseTransitionStylesProps,
  FloatingFocusManager,
  FloatingArrow,
} from "@floating-ui/react";

import { usePopoverContext } from "../popover/popover.context";
import * as styles from "./popover-content.css";

export interface PopoverContentProps {
  children: React.ReactNode;
  showArrow?: boolean;
  arrowStyles?: Pick<
    FloatingArrowProps,
    "width" | "height" | "tipRadius" | "fill"
  >;
  transitionStyles?: UseTransitionStylesProps;
}

const PopoverContent = ({
  children,
  showArrow = true,
  arrowStyles,
  transitionStyles,
}: PopoverContentProps) => {
  const { context, refs, floatingStyles, getFloatingProps, arrowRef, modal } =
    usePopoverContext();

  const { isMounted, styles: _transitionStyles } = useTransitionStyles(
    context,
    {
      duration: 200,
      common: {
        transformOrigin: "top",
      },
      initial: {
        opacity: 0,
        transform: "scaleY(0.85)",
      },
      ...transitionStyles,
    },
  );

  if (!isMounted) return null;

  return (
    <FloatingFocusManager context={context} modal={modal}>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={styles.contentWrapper}
        {...getFloatingProps()}
      >
        <div style={_transitionStyles}>
          {showArrow && (
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className={styles.arrow}
              width={24}
              height={12}
              tipRadius={3}
              fill="#fff"
              {...arrowStyles}
            />
          )}
          {children}
        </div>
      </div>
    </FloatingFocusManager>
  );
};

export default PopoverContent;
