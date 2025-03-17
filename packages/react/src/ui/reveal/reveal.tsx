import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import { debounce } from "lodash";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import type { RevealProps } from "./reveal.types";
import * as styles from "./reveal.css";
import { ThemeVariant } from "../../models/system.model";

function Reveal(props: RevealProps) {
  const {
    hideThresholdHeight = 500,
    showMoreLabel = "Show more",
    showLessLabel = "Show less",
  } = props;
  const eleHeight = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const animationRef = useRef<AnimeInstance | null>(null);
  const elementRef = useRef(null);
  const cleanupRef = useRef<() => void>(null);
  const resizeListenerRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  const [isVisible, setIsVisible] = useState(() => false);
  function toggle() {
    isVisibleRef.current = !isVisible;
    setIsVisible(!isVisible);
  }
  function updateAnimationRef() {
    animationRef.current = anime({
      targets: elementRef.current,
      height: [hideThresholdHeight, eleHeight.current],
      duration: 250,
      direction: `alternate`,
      loop: false,
      autoplay: false,
      easing: `easeInOutSine`,
    });
    setIsVisible(false);
  }
  useEffect(() => {
    setInternalTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState, prevState) => {
      setInternalTheme(newState.theme);
    });
    setTimeout(() => {
      if (!elementRef.current) return;
      const TOGGLE_SPACE = 40;
      if (elementRef.current.offsetHeight > hideThresholdHeight) {
        // Listen the resize event to get container height
        resizeListenerRef.current = debounce(() => {
          if (!elementRef.current) return;
          elementRef.current.style.height = "auto";
          eleHeight.current = elementRef.current.offsetHeight + TOGGLE_SPACE;
          elementRef.current.style.height = isVisibleRef.current
            ? `${eleHeight.current}px`
            : `${hideThresholdHeight}px`;
          updateAnimationRef();
        }, 100);
        window.addEventListener("resize", resizeListenerRef.current); // Simulate useLayoutEffect
        setTimeout(() => {
          if (!eleHeight.current) {
            eleHeight.current = elementRef.current.offsetHeight + TOGGLE_SPACE;
          }
          updateAnimationRef();
        }, 100);
      }
    }, 100);
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
      if (window) {
        window.removeEventListener("resize", resizeListenerRef.current);
      }
    };
  }, []);
  return (
    <div ref={elementRef} className={clsx(styles.container, props.className)}>
      {props.children}
      <Stack
        direction="vertical"
        attributes={{
          display: !isVisible ? "flex" : "none",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "$full",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "$27",
        }}
      >
        <Box
          height="$23"
          flexShrink="0"
          width="$full"
          className={styles.shadow[internalTheme]}
        />
        <Box
          width="$full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="1"
          backgroundColor={internalTheme === "light" ? "$white" : "$gray900"}
          attributes={{
            onClick: () => {
              toggle();
              animationRef.current?.play();
            },
            "data-part-id": "reveal-showmore",
          }}
        >
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ marginRight: "$5" }}
          >
            {showMoreLabel}
          </Text>
          <Icon name="arrowDownS" color="$textSecondary" />
        </Box>
      </Stack>
      <Stack
        attributes={{
          display: !!isVisible ? "flex" : "none",
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "fit-content",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          attributes={{
            onClick: () => {
              toggle();
              animationRef.current?.reverse();
              animationRef.current?.play();
            },
            "data-part-id": "reveal-showless",
          }}
        >
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ marginRight: "$5" }}
          >
            {showLessLabel}
          </Text>
          <Icon name="arrowUpS" color="$textSecondary" />
        </Box>
      </Stack>
    </div>
  );
}

export default Reveal;
