import { Dispatch, SetStateAction } from "react";
import {
  useInteractions,
  useFloating,
  Placement,
  OffsetOptions,
} from "@floating-ui/react";

// Workaround for TS bug "The inferred type of 'T' cannot be named without a refence to 'X'"
// https://github.com/microsoft/TypeScript/issues/42873
import type {} from "@floating-ui/react-dom";

export interface PopoverOptions {
  modal?: boolean;
  triggerType?: "hover" | "click";
  placement?: Placement;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  initialOpen?: boolean;
  offset?: OffsetOptions;
}

export type UseInteractionsValue = ReturnType<typeof useInteractions>;
export type UseFloatingValue = ReturnType<typeof useFloating>;

export type UsePopoverReturnValue = PopoverOptions & {
  arrowRef?: React.RefObject<SVGSVGElement>;
} & UseFloatingValue &
  UseInteractionsValue;
