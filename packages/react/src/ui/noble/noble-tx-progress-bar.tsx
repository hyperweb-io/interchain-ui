import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import Box from "../box";
import { NobleTxProgressBarProps } from "./noble.types";

function NobleTxProgressBar(props: NobleTxProgressBarProps) {
  const { width = "$full", mx = "$0", mt = "$0", mb = "$0" } = props;
  const resizeHandlerRef = useRef<() => void>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(() => 0);
  const [barWidth, setBarWidth] = useState(() => 0);
  function calcBarWidth() {
    const MAX_PROGRESS = 100;
    const MIN_PROGRESS = 0;
    const progress = Math.min(
      Math.max(props.progress, MIN_PROGRESS),
      MAX_PROGRESS
    );
    return (progress / MAX_PROGRESS) * trackWidth;
  }
  useEffect(() => {
    resizeHandlerRef.current = debounce(() => {
      if (!progressTrackRef.current) return;
      setTrackWidth(progressTrackRef.current.clientWidth);
    }, 100);
    window.addEventListener("resize", resizeHandlerRef.current);
    resizeHandlerRef.current();
  }, []);
  useEffect(() => {
    setBarWidth(calcBarWidth());
  }, [trackWidth, props.progress]);
  useEffect(() => {
    return () => {
      if (window) {
        window.removeEventListener("resize", resizeHandlerRef.current);
      }
    };
  }, []);
  return (
    <Box
      height="$6"
      borderRadius="$md"
      bg="$progressBg"
      position="relative"
      width={width}
      mx={mx}
      mt={mt}
      mb={mb}
      ref={progressTrackRef}
    >
      <Box
        height="$full"
        transition="width 0.3s ease-out"
        bg="$progressValue"
        borderRadius="$md"
        position="absolute"
        left="0"
        top="0"
        width={`${barWidth}px`}
      />
    </Box>
  );
}

export default NobleTxProgressBar;
