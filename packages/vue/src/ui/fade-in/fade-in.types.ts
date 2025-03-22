import { BaseComponentProps } from "../../models/components.model";

export interface FadeInProps {
  isVisible: boolean;
  durationMs?: number;
  delayMs?: number;
  children: BaseComponentProps["children"];
}
