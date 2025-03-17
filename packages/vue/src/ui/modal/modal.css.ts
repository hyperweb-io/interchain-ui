import {
  style,
  globalStyle,
  styleVariants,
  createVar,
} from "@vanilla-extract/css";
import { themeVars } from "@/styles/themes.css";

export const modalRoot = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
});

export const modalContainer = style({
  position: "fixed",
  inset: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const modalBackdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

// New styles for backdrop transition
export const backdropTransitionEnter = style({
  transitionProperty: "opacity",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const backdropTransitionEnterFrom = style({
  opacity: "0",
});

export const backdropTransitionEnterTo = style({
  opacity: "1",
});

export const backdropTransitionLeave = style({
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const backdropTransitionLeaveFrom = style({
  opacity: "1",
});

export const backdropTransitionLeaveTo = style({
  opacity: "0",
});

export const modalWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const modalPanel = style({
  position: "relative",
  backgroundColor: "white",
  borderRadius: "0.5rem",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  overflow: "hidden",
  display: "inline-block",
  minWidth: "280px",
  width: "fit-content",
  margin: "0 auto",
});

// Define the CSS variables
export const modalBgVar = createVar();
export const modalShadowVar = createVar();

const modalContentBase = style({
  boxShadow: modalShadowVar,
  backgroundColor: modalBgVar,
  display: "flex",
  height: "auto",
  flexDirection: "column",
  borderRadius: themeVars.radii.xl,
  width: "auto",
  maxWidth: "100%",
});

export const modalContent = styleVariants({
  light: [
    style({
      vars: {
        [modalBgVar]: themeVars.colors.white,
        [modalShadowVar]:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    }),
    modalContentBase,
  ],
  dark: [
    style({
      vars: {
        [modalBgVar]: themeVars.colors.gray700,
        [modalShadowVar]:
          "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
      },
    }),
    modalContentBase,
  ],
});

export const modalAnimateContainer = style({
  minHeight: `clamp(100%, ${themeVars.space[30]}px, ${themeVars.space[30]}px)`,
});

export const modalChildren = style({
  width: "100%",
  minWidth: "280px",
  boxSizing: "border-box",
  paddingLeft: themeVars.space[7],
  paddingRight: themeVars.space[7],
  paddingTop: themeVars.space[3],
  paddingBottom: themeVars.space[10],
});

export const modalHeader = style({
  position: "relative",
});

export const modalCloseButton = style({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  padding: "0.5rem",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1.5rem",
  lineHeight: 1,
});

export const modalBody = style({
  marginTop: "1rem",
});

export const transitionEnter = style({
  transitionProperty: "opacity, transform",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const transitionEnterFrom = style({
  opacity: "0",
  transform: "scale(0.95)",
});

export const transitionEnterTo = style({
  opacity: "1",
  transform: "scale(1)",
});

export const transitionLeave = style({
  transitionProperty: "opacity, transform",
  transitionDuration: "200ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

export const transitionLeaveFrom = style({
  opacity: "1",
  transform: "scale(1)",
});

export const transitionLeaveTo = style({
  opacity: "0",
  transform: "scale(0.95)",
});

globalStyle(
  `${modalContainer} *, ${modalContainer} *::before, ${modalContainer} *::after`,
  {
    boxSizing: "border-box",
  },
);
