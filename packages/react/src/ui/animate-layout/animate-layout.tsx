import * as React from "react";
import { useRef, useEffect } from "react";
import { animateLayout } from "./animate-layout.helper";
import type { AnimateLayoutProps } from "./animate-layout.types";

function AnimateLayout(props: AnimateLayoutProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      animateLayout(parentRef.current);
    }
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      animateLayout(parentRef.current);
    }
  }, [parentRef.current, props.children]);

  return (
    <div
      data-part-id="animate-layout"
      ref={parentRef}
      style={{
        backfaceVisibility: "hidden",
      }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default AnimateLayout;
