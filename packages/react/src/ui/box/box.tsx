import * as React from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { omit } from "lodash";
import { rainbowSprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BoxProps } from "./box.types";
import { DEFAULT_VALUES } from "./box.types";

const Box = forwardRef<any, BoxProps>(function Box(
  props: BoxProps,
  boxRef: BoxProps["boxRef"]
) {
  function comp() {
    return props.as ?? DEFAULT_VALUES.as;
  }

  function finalPassThroughProps() {
    return boxStyles().passThroughProps;
  }

  function boxStyles() {
    const sprinklesObj = rainbowSprinkles({
      ...omit(props, ["attributes", "as", "boxRef"]),
      ...props.attributes,
    });
    return {
      combinedClassName: clsx(sprinklesObj.className, props.className),
      style: sprinklesObj.style,
      passThroughProps: omit(sprinklesObj.otherProps, [
        "attributes",
        "style",
        "rawCSS",
        "colorScheme",
      ]),
    };
  }

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

  const CompRef = comp();

  return (
    <CompRef
      style={{
        ...boxStyles().style,
        ...props.attributes?.style,
        ...props.rawCSS,
      }}
      {...finalPassThroughProps()}
      {...eventHandlers()}
      ref={boxRef}
      className={boxStyles().combinedClassName}
    >
      {props.children}
    </CompRef>
  );
});

export default Box;
