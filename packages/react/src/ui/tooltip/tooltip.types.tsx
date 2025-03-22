import type { Placement } from "@floating-ui/core";
import type { BaseComponentProps } from "../../models/components.model";

export interface TooltipProps extends BaseComponentProps {
  title: BaseComponentProps["children"];
  placement?: Placement;
  offset?: number;
  surroundPadding?: number;
  children: BaseComponentProps["children"];
}
