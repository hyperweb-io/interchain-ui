import * as React from "react";
import clsx from "clsx";
import Icon from "../icon";
import Button from "../button";
import * as styles from "./icon-button.css";
import type { IconButtonProps } from "./icon-button.types";

function IconButton(props: IconButtonProps) {
  function eventHandlers() {
    const handlers: Record<string, (event: any) => void> = {};
    const eventProps = [
      "onClick",
      "onDoubleClick",
      "onMouseDown",
      "onMouseUp",
      "onMouseEnter",
      "onMouseLeave",
      "onMouseMove",
      "onMouseOver",
      "onMouseOut",
      "onKeyDown",
      "onKeyUp",
      "onKeyPress",
      "onFocus",
      "onBlur",
      "onInput",
      "onChange",
      "onSubmit",
      "onReset",
      "onScroll",
      "onWheel",
      "onDragStart",
      "onDrag",
      "onDragEnd",
      "onDragEnter",
      "onDragLeave",
      "onDragOver",
      "onDrop",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onTouchCancel",
    ];
    eventProps.forEach((eventName) => {
      if (props[eventName]) {
        handlers[eventName] = (event: any) => props[eventName](event);
      }
    });
    return handlers;
  }

  return (
    <Button
      attributes={{
        ...props.attributes,
        borderRadius: props.isRound ? "$full" : undefined,
      }}
      variant={props.variant}
      intent={props.intent}
      size={props.size}
      disabled={props.disabled}
      {...eventHandlers()}
      className={clsx(styles.container, props.className)}
    >
      <Icon name={props.icon} size={props.iconSize} />
    </Button>
  );
}

export default IconButton;
