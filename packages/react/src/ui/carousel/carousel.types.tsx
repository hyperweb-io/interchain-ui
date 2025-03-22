export interface CarouselProps {
  children: any;
  width?: string;
  gap?: string;
  verticalAlign?: "start" | "center" | "end";
  scrollOffset?: number;
  showIndicators: boolean;
  showIndicatorsShadow?: boolean;
  indicatorsXOffset?: number;
  indicatorsYOffset?: number;
  initialPosition?: number;
  showFadeOut?: boolean;
  fadeOutWidth?: number;
}
