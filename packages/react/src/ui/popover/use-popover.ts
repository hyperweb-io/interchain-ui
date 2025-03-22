import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  flip,
  shift,
  useHover,
  useInteractions,
  useClick,
  arrow,
  safePolygon,
  useDismiss,
  useRole,
} from "@floating-ui/react";
import * as React from "react";
import type { PopoverOptions } from "./popover.types";

export const usePopover = (props: PopoverOptions) => {
  const {
    modal = false,
    triggerType = "hover",
    placement = "top",
    isOpen: controlledOpen,
    setIsOpen: setControlledOpen,
    initialOpen = false,
    offset,
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const arrowRef = React.useRef<SVGSVGElement>(null);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const isHover = triggerType === "hover";

  const hover = useHover(data.context, {
    handleClose: safePolygon({
      buffer: -Infinity,
      blockPointerEvents: true,
    }),
    enabled: isHover,
  });

  const click = useClick(data.context, {
    enabled: !isHover,
  });

  const dismiss = useDismiss(data.context, {
    enabled: !isHover,
  });

  const role = useRole(data.context);

  const interactions = useInteractions([role, hover, click, dismiss]);

  return React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      arrowRef,
      modal,
      ...data,
      ...interactions,
    }),
    [isOpen, setIsOpen, arrowRef, modal, data, interactions],
  );
};
