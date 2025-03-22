import autoAnimate, { getTransitionSizes } from "@formkit/auto-animate";
import { isSSR } from "../../helpers/platform";
type KeyframeStep = Record<string, string | number>;

const easing = "cubic-bezier(0.25,0.1,0.25,1)";

export function animateLayout(element: HTMLElement) {
  if (isSSR()) return;

  autoAnimate(element, (el, action, oldCoords, newCoords) => {
    let keyframes: Array<KeyframeStep>;

    if (action === "add") {
      keyframes = [
        { opacity: 0 },
        { opacity: 0.5, offset: 0.5 },
        { opacity: 1 },
      ];
      return new KeyframeEffect(el, keyframes, {
        duration: 250,
        easing: easing,
      });
    }

    if (action === "remove") {
      keyframes = [
        {
          transform: "scale(1)",
          opacity: 1,
        },
        {
          transform: "scale(0.97)",
          opacity: 0,
          offset: 0.5,
        },
        {
          transform: "scale(0)",
          opacity: 0,
        },
      ];

      return new KeyframeEffect(el, keyframes, {
        duration: 150,
        easing: easing,
      });
    }

    if (action === "remain") {
      // use the getTransitionSizes() helper function to
      // get the old and new widths of the elements
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords,
        newCoords
      );
      // set up our steps with our positioning keyframes
      let start: KeyframeStep = {};
      let mid: KeyframeStep = {};
      let end: KeyframeStep = {};

      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`;
        end.width = `${widthTo}px`;
      }

      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`;
        end.height = `${heightTo}px`;
      }

      start.opacity = 0;
      mid.opacity = 0.5;
      mid.offset = 0.5;
      end.opacity = 1;

      return new KeyframeEffect(el, [start, mid, end], {
        duration: 350,
        easing: easing,
      });
    }
  });
}
