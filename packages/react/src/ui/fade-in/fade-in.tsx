import * as React from "react";
import { useRef, useEffect } from "react";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import type { FadeInProps } from "./fade-in.types";

function FadeIn(props: FadeInProps) {
  const fadeInAnimationRef = useRef<AnimeInstance | null>(null);
  const fadeOutAnimationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const delaySetting = props.delayMs || 100;
    const durationSetting = props.durationMs || 250;

    // Animation not init yet
    if (
      elementRef.current &&
      !fadeInAnimationRef.current &&
      !fadeOutAnimationRef.current
    ) {
      fadeInAnimationRef.current = anime({
        targets: elementRef.current,
        opacity: [0, 1],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });
      fadeOutAnimationRef.current = anime({
        targets: elementRef.current,
        opacity: [1, 0],
        delay: delaySetting,
        duration: durationSetting,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: "spring(1, 80, 10, 0)",
      });
    }
    if (props.isVisible) {
      fadeInAnimationRef.current?.restart();
    } else {
      fadeOutAnimationRef.current?.restart();
    }
  }, [props.delayMs, props.durationMs, props.isVisible]);

  return <div ref={elementRef}>{props.children}</div>;
}

export default FadeIn;
