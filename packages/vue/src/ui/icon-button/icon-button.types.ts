import { ButtonProps } from "../button/button.types";
import type { IconProps } from "../icon/icon.types";

type OmittedProps = "leftIcon" | "rightIcon";

// Extract event handler types from ButtonProps
type ButtonEventHandlers = Pick<
  ButtonProps,
  | "onClick"
  | "onDoubleClick"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onMouseOver"
  | "onMouseOut"
  | "onKeyDown"
  | "onKeyUp"
  | "onKeyPress"
  | "onFocus"
  | "onBlur"
  | "onInput"
  | "onChange"
  | "onSubmit"
  | "onReset"
  | "onScroll"
  | "onWheel"
  | "onDragStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
  | "onTouchCancel"
>;

interface BaseButtonProps extends Omit<ButtonProps, OmittedProps> {}

export interface IconButtonProps extends BaseButtonProps, ButtonEventHandlers {
  isRound?: boolean;
  icon: IconProps["name"];
}
