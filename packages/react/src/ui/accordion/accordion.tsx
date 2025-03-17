import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import type { AccordionProps } from "./accordion.types";

function Accordion(props: AccordionProps) {
  const {
    width = "$full",
    isExpanded: defaultIsExpanded = false,
    transition = "all 0.2s ease-out",
  } = props;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(() => defaultIsExpanded);
  function toggleExpanded() {
    if (typeof props.onToggle === "function") {
      props.onToggle();
      return;
    }
    setIsExpanded(!isExpanded);
  }
  useEffect(() => {
    setIsExpanded(defaultIsExpanded);
  }, [defaultIsExpanded]);
  return (
    <Box width={width}>
      <div onClick={(event) => toggleExpanded()}>
        {typeof props.renderTrigger === "function" ? (
          <>{props.renderTrigger({ isExpanded: isExpanded })}</>
        ) : null}
        {typeof props.renderTrigger !== "function" ? (
          <>{props.renderTrigger}</>
        ) : null}
      </div>
      <Box
        overflow="hidden"
        transition={transition}
        opacity={isExpanded ? 1 : 0}
        height={`${isExpanded ? contentRef.current?.scrollHeight : 0}px`}
        ref={contentRef}
      >
        {props.renderContent}
      </Box>
    </Box>
  );
}

export default Accordion;
