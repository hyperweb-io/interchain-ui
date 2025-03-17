import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type BoxProps = Sprinkles & {
  as?: any;
  className?: string;
  class?: string;
  children?: any;
  attributes?: any;
  rawCSS?: any;
  boxRef?: any;

  // Common DOM events with 'any' type for event parameters
  onClick?: (event: any) => void;
  onDoubleClick?: (event: any) => void;
  onMouseDown?: (event: any) => void;
  onMouseUp?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  onMouseMove?: (event: any) => void;
  onMouseOver?: (event: any) => void;
  onMouseOut?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onInput?: (event: any) => void;
  onChange?: (event: any) => void;
  onSubmit?: (event: any) => void;
  onReset?: (event: any) => void;
  onScroll?: (event: any) => void;
  onWheel?: (event: any) => void;
  onDragStart?: (event: any) => void;
  onDrag?: (event: any) => void;
  onDragEnd?: (event: any) => void;
  onDragEnter?: (event: any) => void;
  onDragLeave?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDrop?: (event: any) => void;
  onTouchStart?: (event: any) => void;
  onTouchMove?: (event: any) => void;
  onTouchEnd?: (event: any) => void;
  onTouchCancel?: (event: any) => void;
};

export const DEFAULT_VALUES = {
  as: "div",
};
