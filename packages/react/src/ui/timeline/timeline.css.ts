import { style, createContainer } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const timelineContainer = createContainer();

const DOT_SIZE_PX = 14;

export const timeline = style({
  containerType: "size",
  containerName: timelineContainer,
});

export const eventItemsContainer = style({
  position: "relative",
  selectors: {
    '&[data-is-even="false"]': {
      flexDirection: "row-reverse",
    },
  },
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      flexDirection: "column",
      alignItems: "flex-start",
      selectors: {
        '&[data-is-even="false"]': {
          flexDirection: "column",
          alignItems: "flex-start",
        },
      },
    },
  },
});

export const eventItem = style({
  width: "50%",
  maxWidth: "50%",
  flex: "0 0 50%",
  alignSelf: "flex-start",
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      width: "100%",
      maxWidth: "100%",
      flex: "0 0 100%",
      paddingLeft: themeVars.space["12"],
    },
  },
});

export const eventItemSecondary = style({
  width: "50%",
  maxWidth: "50%",
  flex: "0 0 50%",
  alignSelf: "flex-start",
  selectors: {
    '&[data-direction="left"]': {
      justifyContent: "flex-end",
    },
    '&[data-direction="right"]': {
      justifyContent: "flex-start",
    },
  },
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      width: "100%",
      maxWidth: "100%",
      flex: "0 0 100%",
      paddingLeft: themeVars.space["12"],
      paddingTop: themeVars.space["6"],
      selectors: {
        '&[data-direction="left"]': {
          justifyContent: "flex-start",
        },
        '&[data-direction="right"]': {
          justifyContent: "flex-start",
        },
      },
    },
  },
});

export const eventContent = style({
  position: "relative",
  width: "100%",
  selectors: {
    "&:after": {
      content: `""`,
      position: "absolute",
      borderRadius: "2px",
      backgroundColor: themeVars.colors.cardBg,
      transform: "rotate(45deg)",
      width: themeVars.space["8"],
      height: themeVars.space["8"],
      top: themeVars.space["8"],
      zIndex: 1,
    },
  },
});

export const eventContentLeft = style({
  marginLeft: themeVars.space["11"],
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      marginLeft: themeVars.space["11"],
      marginRight: 0,
    },
  },
});

export const eventContentRight = style({
  marginRight: themeVars.space["11"],
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      marginLeft: themeVars.space["11"],
      marginRight: 0,
    },
  },
});

export const eventContentArrowLeft = style({
  selectors: {
    "&:after": {
      left: "-9px",
      borderTopLeftRadius: "0px",
      borderBottomRightRadius: "0px",
      borderRight: "none",
      borderTop: "none",
      borderLeft: `1px solid ${themeVars.colors.divider}`,
      borderBottom: `1px solid ${themeVars.colors.divider}`,
    },
  },
});

export const eventContentArrowRight = style({
  "@container": {
    [`${timelineContainer} (max-width: 480px)`]: {
      selectors: {
        // Collapse the arrow on mobile
        "&:after": {
          left: "-9px",
          borderTopLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          borderRight: "none",
          borderTop: "none",
          borderLeft: `1px solid ${themeVars.colors.divider}`,
          borderBottom: `1px solid ${themeVars.colors.divider}`,
        },
      },
    },
  },
  selectors: {
    "&:after": {
      right: "-9px",
      borderTopLeftRadius: "0px",
      borderBottomRightRadius: "0px",
      borderRight: `1px solid ${themeVars.colors.divider}`,
      borderTop: `1px solid ${themeVars.colors.divider}`,
      borderLeft: "none",
      borderBottom: "none",
    },
  },
});

export const rowSeparator = style({
  position: "absolute",
  height: "100%",
  width: "50px",
});

const barAndDotPosition = style({
  position: "absolute",
  left: "50%",
});

export const eventCircle = style([
  {
    transform: "translate(calc(-50% + 0.5px), -50%)",
    backgroundColor: themeVars.colors.purple100,
    borderRadius: "50%",
    height: `${DOT_SIZE_PX}px`,
    width: `${DOT_SIZE_PX}px`,
    top: themeVars.space["10"],
    zIndex: 2,
  },
  barAndDotPosition,
]);

export const eventCircleInner = style({
  borderRadius: "50%",
  height: `${DOT_SIZE_PX / 2}px`,
  width: `${DOT_SIZE_PX / 2}px`,
  transform: "translate(50%, 50%)",
  selectors: {
    '&[data-theme="light"]': {
      backgroundColor: themeVars.colors.white,
    },
    '&[data-theme="dark"]': {
      backgroundColor: themeVars.colors.black,
    },
  },
});

export const eventBar = style([
  {
    backgroundColor: themeVars.colors.divider,
    borderRadius: themeVars.radii.md,
    height: "calc(100% + 70px)",
    width: "1px",
    top: themeVars.space["8"],
    zIndex: 0,
    selectors: {
      '&[data-is-last="true"]': {
        height: "0px",
      },
    },
  },
  barAndDotPosition,
]);
