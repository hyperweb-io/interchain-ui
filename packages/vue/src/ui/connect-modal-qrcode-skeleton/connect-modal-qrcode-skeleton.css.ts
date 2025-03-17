import {
  style,
  keyframes,
  styleVariants,
  createVar,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const skeletonStartVar = createVar();
export const skeletonEndVar = createVar();

export const pulsingAnim = keyframes({
  "0%": {
    borderColor: skeletonStartVar,
    background: skeletonEndVar,
  },
  "100%": {
    borderColor: skeletonEndVar,
    background: skeletonStartVar,
  },
});

const qrcodeSkeletonBase = style({
  boxShadow: "none",
  userSelect: "none",
  backgroundClip: "padding-box",
  cursor: "default",
  color: "transparent",
  width: "192px",
  height: "192px",
  opacity: 0.7,
  borderRadius: themeVars.radii.base,
  background: skeletonStartVar,
  borderColor: skeletonEndVar,
  animationName: pulsingAnim,
  animationDuration: "0.8s",
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",
  animationDirection: "alternate",
});

export const qrcodeSkeleton = styleVariants({
  light: [
    qrcodeSkeletonBase,
    style({
      vars: {
        [skeletonStartVar]: themeVars.colors.gray100,
        [skeletonEndVar]: themeVars.colors.gray400,
      },
    }),
  ],
  dark: [
    qrcodeSkeletonBase,
    style({
      vars: {
        [skeletonStartVar]: themeVars.colors.gray800,
        [skeletonEndVar]: themeVars.colors.gray600,
      },
    }),
  ],
});
