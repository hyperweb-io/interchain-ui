import { themeVars } from "@/styles/themes.css";
import { style, createVar } from "@vanilla-extract/css";

const thumbColorVar = createVar();

export const slider = style({
  display: "flex",
});

export const sliderHorizontal = style({
  flexDirection: "column",
});

export const sliderVertical = style({
  height: "150px",
});

export const labelContainer = style({
  display: "flex",
  justifyContent: "space-between",
});

const sliderTrackBase = style({
  position: "relative",
  selectors: {
    '&[data-disabled="true"]': {
      opacity: 0.4,
    },
  },
});

export const trackProgress = style({
  height: "6px",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
});

export const trackPreviewProgress = style({
  height: "4px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 0,
  borderLeft: `2px solid ${themeVars.colors.black}`,
  borderRight: `4px solid ${themeVars.colors.black}`,
});

export const horizontalTrack = style([
  sliderTrackBase,
  {
    height: "16px",
    width: "100%",
    selectors: {
      // Track line
      "&:before": {
        content: "attr(x)",
        borderRadius: "4px",
        display: "block",
        position: "absolute",
        background: themeVars.colors.inputBorder,
        height: "4px",
        width: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      },
      "&[data-has-preview-track='true']:before": {
        background: themeVars.colors.gray600,
      },
    },
  },
]);

export const verticalTrack = style([
  sliderTrackBase,
  {
    width: "16px",
    height: "100%",
    selectors: {
      "&:before": {
        content: "attr(x)",
        borderRadius: "4px",
        display: "block",
        position: "absolute",
        background: "gray",
        width: "3px",
        height: "100%",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
  },
]);

export const sliderThumb = style({
  width: themeVars.space["11"],
  height: themeVars.space["11"],
  borderRadius: "50%",
  background: thumbColorVar,
  position: "relative",
  zIndex: 2,
  vars: {
    [thumbColorVar]: themeVars.colors.menuItemBg,
  },
  selectors: {
    '&[data-theme="light"]': {
      vars: {
        [thumbColorVar]: themeVars.colors.inputBg,
      },
    },
    '&[data-dragging="true"]': {
      background: "dimgray",
    },
    '&[data-focus="true"]': {
      background: "orange",
    },
    '&[data-direction="horizontal"]': {
      top: "50%",
    },
    '&[data-direction="vertical"]': {
      left: "50%",
    },
    // Thumb inner circle
    "&:after": {
      content: "attr(x)",
      borderRadius: "50%",
      display: "block",
      position: "absolute",
      background: thumbColorVar,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "10px",
      height: "10px",
    },
    // Thumb outer circle
    "&:before": {
      content: "attr(x)",
      borderRadius: "50%",
      display: "block",
      position: "absolute",
      background: themeVars.colors.text,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "18px",
      height: "18px",
    },
  },
});
