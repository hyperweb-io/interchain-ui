import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";
import type { TextProps } from "../text/text.types";

export type TimelineEvent = {
  timestamp: string;
  title?: string;
  description?: string;
  className?: string;
  customContent?: BaseComponentProps["children"];
  secondaryContent?: BaseComponentProps["children"];
  eventTimestampProps?: TextProps;
  eventTitleProps?: TextProps;
  eventDescriptionProps?: TextProps;
};

export interface TimelineProps extends BaseComponentProps {
  events: TimelineEvent[];
  attributes?: BoxProps;
}
