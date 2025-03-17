import {
  style,
  keyframes,
  styleVariants,
  createVar,
} from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

const logoFrameColorDisconnectedVar = createVar();
const logoFrameColorConnectingVar = createVar();
const logoFrameColorNotExistVar = createVar();

const modalStatusContainerBase = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: themeVars.font.body,
  paddingTop: themeVars.space[12],
  paddingBottom: 0,
});

export const modalStatusContainer = styleVariants({
  light: [
    modalStatusContainerBase,
    style({
      backgroundColor: themeVars.colors.white,
    }),
  ],
  dark: [
    modalStatusContainerBase,
    style({
      backgroundColor: themeVars.colors.gray700,
    }),
  ],
});

export const statusLogo = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginInlineStart: "auto",
  marginInlineEnd: "auto",
  width: themeVars.space[19],
  height: themeVars.space[19],
});

const disconnectedLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorDisconnectedVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const disconnectedLogoFrame = styleVariants({
  light: [
    disconnectedLogoFrameBase,
    style({
      vars: {
        [logoFrameColorDisconnectedVar]: themeVars.colors.orange300,
      },
    }),
  ],
  dark: [
    disconnectedLogoFrameBase,
    style({
      vars: {
        [logoFrameColorDisconnectedVar]: themeVars.colors.orange400,
      },
    }),
  ],
});

const disconnectedDescBase = style({
  fontWeight: themeVars.fontWeight.semibold,
  marginBottom: themeVars.space[7],
});

export const disconnectedDesc = styleVariants({
  light: [
    disconnectedDescBase,
    style({
      color: themeVars.colors.orange300,
    }),
  ],
  dark: [
    disconnectedDescBase,
    style({
      color: themeVars.colors.orange500,
    }),
  ],
});

export const statusLogoImage = style({
  padding: themeVars.space[7],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const statusLogoImageSvg = style({
  width: themeVars.space[19],
  height: themeVars.space[19],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const rotateAnim = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const connectingLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderLeftColor: logoFrameColorConnectingVar,
  borderRightColor: logoFrameColorConnectingVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
  animationName: rotateAnim,
  animationDuration: "3s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
});

export const connectingLogoFrame = styleVariants({
  light: [
    connectingLogoFrameBase,
    style({
      vars: {
        [logoFrameColorConnectingVar]: themeVars.colors.purple300,
      },
    }),
  ],
  dark: [
    connectingLogoFrameBase,
    style({
      vars: {
        [logoFrameColorConnectingVar]: themeVars.colors.purple400,
      },
    }),
  ],
});

const connectingHeaderBase = style({
  marginBottom: themeVars.space[1],
  fontSize: themeVars.fontSize.md,
  fontWeight: themeVars.fontWeight.semibold,
});

export const connectingHeader = styleVariants({
  light: [
    connectingHeaderBase,
    style({
      color: themeVars.colors.gray700,
    }),
  ],
  dark: [
    connectingHeaderBase,
    style({
      color: themeVars.colors.white,
    }),
  ],
});

const notExistLogoFrameBase = style({
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: logoFrameColorNotExistVar,
  top: `calc(${themeVars.space[4]} * -1)`,
  bottom: `calc(${themeVars.space[4]} * -1)`,
  left: `calc(${themeVars.space[4]} * -1)`,
  right: `calc(${themeVars.space[4]} * -1)`,
});

export const notExistLogoFrame = styleVariants({
  light: [
    notExistLogoFrameBase,
    style({
      vars: {
        [logoFrameColorNotExistVar]: themeVars.colors.red300,
      },
    }),
  ],
  dark: [
    notExistLogoFrameBase,
    style({
      vars: {
        [logoFrameColorNotExistVar]: themeVars.colors.red400,
      },
    }),
  ],
});

export const errorDescription = style([
  {
    lineHeight: 1.3,
    opacity: 0.7,
    whiteSpace: "pre-line",
    overflowY: "scroll",
    paddingInlineStart: themeVars.space[8],
    paddingInlineEnd: themeVars.space[8],
    paddingTop: themeVars.space[2],
    paddingBottom: themeVars.space[2],
    marginBottom: themeVars.space[8],
    fontSize: themeVars.fontSize.sm,
    maxHeight: themeVars.space[22],
    scrollbarWidth: "none",
    selectors: {
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  },
]);

export const widthContainer = style({
  width: "100%",
  paddingLeft: themeVars.space[8],
  paddingRight: themeVars.space[8],
});

const connectedInfoBase = style({
  fontSize: themeVars.fontSize.md,
  fontWeight: themeVars.fontWeight.semibold,
  marginLeft: themeVars.space[4],
});

export const connectedInfo = styleVariants({
  light: [
    connectedInfoBase,
    style({
      color: themeVars.colors.gray700,
    }),
  ],
  dark: [
    connectedInfoBase,
    style({
      color: themeVars.colors.white,
    }),
  ],
});

export const dangerText = styleVariants({
  light: [
    style({
      fontWeight: themeVars.fontWeight.semibold,
      marginBottom: themeVars.space[2],
      color: themeVars.colors.red300,
    }),
  ],
  dark: [
    style({
      fontWeight: themeVars.fontWeight.semibold,
      marginBottom: themeVars.space[2],
      color: themeVars.colors.red400,
    }),
  ],
});

export const descMaxWidth = style({
  maxWidth: "224px",
});

const descBase = style({
  fontSize: themeVars.fontSize.sm,
  marginBottom: themeVars.space[4],
  fontWeight: themeVars.fontWeight.normal,
  textAlign: "center",
});

export const desc = styleVariants({
  light: [descBase, descMaxWidth, style({ color: themeVars.colors.gray600 })],
  dark: [
    descBase,
    descMaxWidth,
    style({ color: themeVars.colors.whiteAlpha700 }),
  ],
});

export const flexImg = style({
  maxHeight: "96px",
  width: "100%",
  height: "100%",
});

export const bottomLink = style({
  fontSize: themeVars.fontSize.sm,
  color: themeVars.colors.body,
  fontWeight: themeVars.fontWeight.normal,
});

export const copyText = style({
  marginBottom: themeVars.space[7],
});
