import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export interface BreadcrumbProps {
  children: BaseComponentProps["children"];
  mt?: Sprinkles["mt"];
  mb?: Sprinkles["mb"];
  width?: Sprinkles["width"];
  gapLeft?: Sprinkles["gap"];
  gapRight?: Sprinkles["gap"];
  primaryColor?: Sprinkles["color"];
  secondaryColor?: Sprinkles["color"];
}

export interface BreadcrumbLink {
  name: string;
  href?: string;
  download?: string | boolean;
  linkRef?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  type?: string;
  onClick?: () => void;
}

export type BreadcrumbItemProps = Pick<
  BreadcrumbProps,
  "gapLeft" | "primaryColor" | "secondaryColor"
> &
  BreadcrumbLink & {
    as?: string;
    isLast: boolean;
    separator?: string;
  };
