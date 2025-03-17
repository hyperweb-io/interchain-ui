import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  computePosition,
  offset,
  shift,
  flip,
  arrow,
  inline,
  size,
} from "@floating-ui/dom";
import Box from "../box";
import { standardTransitionProperties } from "../shared/shared.css";
import type { TooltipProps } from "./tooltip.types";

function Tooltip(props: TooltipProps) {
  const { placement = "top" } = props;
  const anchorRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const [isMounted, setIsMounted] = useState(() => false);
  const [isShown, setIsShown] = useState(() => false);
  function setTooltip(shouldShow) {
    if (shouldShow) {
      setIsShown(true);
      compute();
    } else {
      setIsShown(false);
    }
  }
  function getLatestRefs() {
    return {
      arrow: arrowRef.current,
      anchor: anchorRef.current,
      tooltip: tooltipRef.current,
    };
  }
  function compute() {
    const latestRefs = getLatestRefs();
    if (latestRefs.anchor == null || latestRefs.tooltip == null) {
      return;
    }
    computePosition(latestRefs.anchor, latestRefs.tooltip, {
      placement: placement ?? "top-start",
      middleware: [
        inline(),
        offset(props.offset ?? 12),
        flip(),
        shift({ padding: props.surroundPadding ?? 4 }),
        arrow({ element: arrowRef.current }),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            // Do things with the data, e.g.
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
        }),
      ],
    }).then((result) => {
      const x = result.x;
      const y = result.y;
      const placement = result.placement;
      const arrowData = result.middlewareData.arrow;
      const { x: arrowX, y: arrowY } = arrowData;
      Object.assign(latestRefs.tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];
      const endSide = { start: "start", end: "end" }[placement.split("-")[1]];
      const deltaX = endSide === "start" ? -12 : endSide === "end" ? 12 : 0;
      Object.assign(latestRefs.arrow.style, {
        left: arrowX != null ? `${arrowX + deltaX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    });
  }
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) {
      return;
    }
    compute();
  }, [isMounted, isShown, placement, props.offset, props.surroundPadding]);
  return (
    <>
      <Box attributes={{ "data-part-id": "tooltip-container" }}>
        <Box
          display="flex"
          alignItems="center"
          cursor="help"
          boxRef={anchorRef}
          attributes={{
            tabIndex: "0",
            onMouseEnter: () => setTooltip(true),
            onMouseLeave: () => setTooltip(false),
            onFocus: () => setTooltip(true),
            onBlur: () => setTooltip(false),
          }}
        >
          {props.children}
        </Box>
      </Box>
      <Box
        px="$5"
        py="$3"
        backgroundColor="$text"
        borderRadius="$md"
        position="absolute"
        width="max-content"
        zIndex="1"
        attributes={{ role: "tooltip" }}
        display={isShown ? "block" : "none"}
        boxRef={tooltipRef}
        rawCSS={{ left: "0", top: "0" }}
        className={standardTransitionProperties}
      >
        {props.title}
        <Box
          position="absolute"
          transform="rotate(45deg)"
          width="$5"
          height="$5"
          backgroundColor="$text"
          boxRef={arrowRef}
          attributes={{ "data-part-id": "tooltip-arrow" }}
        />
      </Box>
    </>
  );
}

export default Tooltip;
