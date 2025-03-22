import * as React from "react";
import { useState, useEffect } from "react";
import Box from "../box";
import ScrollIndicator from "../scroll-indicator";
import { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { CarouselProps } from "./carousel.types";
import * as styles from "./carousel.css";
const INDICATOR_HEIGHT = 40;
const VERTICAL_ALIGN: Record<
  CarouselProps["verticalAlign"],
  Sprinkles["alignItems"]
> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

function Carousel(props: CarouselProps) {
  const {
    gap = "20px",
    width = "100%",
    scrollOffset = 0,
    indicatorsXOffset = 20,
    showIndicatorsShadow = true,
    verticalAlign = "start",
    initialPosition = 0,
    showIndicators = true,
    showFadeOut = false,
    fadeOutWidth = 156,
  } = props;
  const [scrollLeft, setScrollLeft] = useState(() => 0);
  const [showLeftIndicator, setShowLeftIndicator] = useState(() => true);
  const [showRightIndicator, setShowRightIndicator] = useState(() => true);
  const [containerHeight, setContainerHeight] = useState(() => 0);
  const [containerRef, setContainerRef] = useState(() => null);
  function calcYOffset(_containerHeight: number, indicatorHeight: number) {
    return _containerHeight / 2 - indicatorHeight / 2;
  }
  function assignRef(ref: HTMLElement) {
    setContainerRef(ref);
  }
  function handleScroll(scrollDirection: "left" | "right") {
    if (!containerRef) return;
    const isScrollRight = scrollDirection === "right";
    const scrollDistance = containerRef.clientWidth - scrollOffset;
    const scrollValue = isScrollRight ? scrollDistance : -scrollDistance;
    const newPosition = containerRef.scrollLeft + scrollValue;
    setScrollLeft(newPosition);
    containerRef.scrollLeft = newPosition;
  }
  useEffect(() => {
    if (!containerRef) return;
    setTimeout(() => {
      setScrollLeft(initialPosition);
      setContainerHeight(containerRef.offsetHeight);
      containerRef.scrollLeft = initialPosition;
    }, 100);
  }, [containerRef]);
  useEffect(() => {
    if (!containerRef || !containerHeight) return;
    setShowLeftIndicator(scrollLeft > 0);
    setShowRightIndicator(
      scrollLeft + containerRef.clientWidth < containerRef.scrollWidth
    );
  }, [containerRef, scrollLeft, containerHeight]);
  return (
    <Box position="relative" width={width}>
      {showIndicators && showLeftIndicator ? (
        <Box
          position="absolute"
          zIndex="$100"
          top={`${
            props.indicatorsYOffset ||
            calcYOffset(containerHeight, INDICATOR_HEIGHT)
          }px`}
          left={`${indicatorsXOffset}px`}
        >
          <ScrollIndicator
            direction="left"
            onClick={(event) => handleScroll("left")}
            showShadow={showIndicatorsShadow}
          />
        </Box>
      ) : null}
      {showFadeOut ? (
        <Box
          zIndex="$50"
          position="absolute"
          width={`${fadeOutWidth}px`}
          height={`${containerHeight}px`}
          left={0}
          top={0}
          className={styles.fadeOutGradient}
        />
      ) : null}
      <Box
        display="flex"
        width="100%"
        height="100%"
        overflow="hidden"
        alignItems={VERTICAL_ALIGN[verticalAlign]}
        gap={gap}
        boxRef={assignRef}
        className={styles.innerContainer}
      >
        {props.children?.map((element) => (
          <Box flex="0 0 auto" key={element?.key}>
            {element}
          </Box>
        ))}
      </Box>
      {showFadeOut ? (
        <Box
          transform="rotate(180deg)"
          zIndex="$50"
          position="absolute"
          width={`${fadeOutWidth}px`}
          height={`${containerHeight}px`}
          right={0}
          top={0}
          className={styles.fadeOutGradient}
        />
      ) : null}
      {showIndicators && showRightIndicator ? (
        <Box
          position="absolute"
          zIndex="$100"
          top={`${
            props.indicatorsYOffset ||
            calcYOffset(containerHeight, INDICATOR_HEIGHT)
          }px`}
          right={`${indicatorsXOffset}px`}
        >
          <ScrollIndicator
            direction="right"
            onClick={(event) => handleScroll("right")}
            showShadow={showIndicatorsShadow}
          />
        </Box>
      ) : null}
    </Box>
  );
}

export default Carousel;
