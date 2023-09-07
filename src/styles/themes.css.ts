import {
  createThemeContract,
  createTheme,
  globalFontFace,
} from "@vanilla-extract/css";
import {
  colors,
  SYSTEM_FONT_STACK,
  letterSpacing,
  lineHeight,
  fontSize,
  fontWeight,
  radii,
  borderStyle,
  borderWidth,
  space,
  zIndex,
} from "./tokens";

const fontInterName = "Inter";

globalFontFace(fontInterName, {
  src: `url(https://fonts.googleapis.com/css?family=Inter)`,
  fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  fontStyle: `normal`,
  fontDisplay: `swap`,
});

export const boxShadow = {
  xs: `0 0 0 1px rgba(0, 0, 0, 0.05)`,
  sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
  base: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
  md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
  lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
  xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
  "2xl": `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
  inset: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
  primaryOutline: `0 0 0 2px ${colors.primary200}`,
  none: `none`,
  "dark-lg": `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
};

export const themeContractTemplate = {
  colors: {
    primary: ``,
    body: ``,
    background: ``,
    link: ``,
    linkHover: ``,
    text: ``,
    textSecondary: ``,
    textDanger: ``,
    textWarning: ``,
    textPlaceholder: ``,
    rewardBg: ``,
    rewardContent: ``,
    cardBg: ``,
    inputBorder: ``,
    inputBg: ``,
    inputDangerBorder: "",
    inputDangerBg: "",
    inputDisabledBg: "",
    inputDisabledText: "",
    progressBg: ``,
    progressValue: ``,
    progressCursor: ``,
    divider: ``,
    menuItemBg: ``,
    menuItemBgHovered: ``,
    menuItemBgActive: ``,
    skeletonBg: ``,
    ...colors,
  },
  font: {
    body: ``,
  },
  space: {
    "0": ``,
    "1": ``,
    "2": ``,
    "3": ``,
    "4": ``,
    "5": ``,
    "6": ``,
    "7": ``,
    "8": ``,
    "9": ``,
    "10": ``,
    "11": ``,
    "12": ``,
    "13": ``,
    "14": ``,
    "15": ``,
    "16": ``,
    "17": ``,
    "18": ``,
    "19": ``,
    "20": ``,
    "21": ``,
    "22": ``,
    "23": ``,
    "24": ``,
    "25": ``,
    "26": ``,
    "27": ``,
    "28": ``,
    "29": ``,
    "30": ``,
    auto: ``,
    full: ``,
    fit: ``,
    max: ``,
    min: ``,
    viewHeight: ``,
    viewWidth: ``,
    containerSm: ``,
    containerMd: ``,
    containerLg: ``,
    containerXl: ``,
    prose: ``,
    none: ``,
  },
  borderWidth: {
    none: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
  },
  borderStyle: {
    none: ``,
    solid: ``,
    dotted: ``,
    dashed: ``,
    groove: ``,
    ridge: ``,
    hidden: ``,
    double: ``,
    inset: ``,
    outset: ``,
    unset: ``,
  },
  boxShadow: {
    xs: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    inset: ``,
    primaryOutline: ``,
    none: ``,
    "dark-lg": ``,
  },
  radii: {
    none: ``,
    sm: ``,
    base: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    "3xl": ``,
    "4xl": ``,
    full: ``,
  },
  letterSpacing: {
    tighter: ``,
    tight: ``,
    normal: ``,
    wide: ``,
    wider: ``,
    widest: ``,
  },
  lineHeight: {
    normal: ``,
    none: ``,
    shorter: ``,
    short: ``,
    base: ``,
    tall: ``,
    taller: ``,
  },
  fontWeight: {
    hairline: ``,
    thin: ``,
    light: ``,
    normal: ``,
    medium: ``,
    semibold: ``,
    bold: ``,
    extrabold: ``,
    black: ``,
  },
  fontSize: {
    "3xs": ``,
    "2xs": ``,
    xs: ``,
    sm: ``,
    md: ``,
    lg: ``,
    xl: ``,
    "2xl": ``,
    "3xl": ``,
    "4xl": ``,
    "5xl": ``,
    "6xl": ``,
    "7xl": ``,
    "8xl": ``,
    "9xl": ``,
    "10xl": ``,
    "11xl": ``,
    "12xl": ``,
    "13xl": ``,
    "14xl": ``,
    "15xl": ``,
  },
  zIndex: {
    "0": ``,
    "10": ``,
    "20": ``,
    "30": ``,
    "40": ``,
    "50": ``,
    "100": ``,
    auto: ``,
  },
} as const;

export type ThemeContractValues = typeof themeContractTemplate;

// Enforce a theme contract so that light/dark/xxx themes will have the same properties
export const themeVars = createThemeContract(themeContractTemplate);

export const commonVars = {
  font: {
    body: [fontInterName, SYSTEM_FONT_STACK].join(`, `),
  },
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
  boxShadow,
  radii,
  borderWidth,
  borderStyle,
  zIndex,
};

export const lightThemeClass = createTheme(themeVars, {
  ...commonVars,
  colors: {
    primary: colors.primary500,
    body: colors.gray800,
    background: colors.gray100,
    link: colors.blue800,
    linkHover: colors.blue600,
    text: "#2C3137",
    textSecondary: "#697584",
    textDanger: colors.red500,
    textWarning: colors.orange300,
    textPlaceholder: `#A2AEBB`,
    rewardBg: "#E5FFE4",
    rewardContent: "#36BB35",
    cardBg: "#F5F7FB",
    inputBorder: "#D1D6DD",
    inputBg: "#EEF2F8",
    inputDangerBorder: "#FF8080",
    inputDangerBg: "#FFDBDB",
    inputDisabledBg: "#CBD3DD",
    inputDisabledText: "#8895A3",
    progressBg: `#EEF2F8`,
    progressValue: `#697584`,
    progressCursor: `#2C3137`,
    divider: `#D9D9D9`,
    menuItemBg: `#EEF2F8`,
    menuItemBgHovered: `#DDE4ED`,
    menuItemBgActive: `#D0D9E3`,
    skeletonBg: `#DDE4ED`,
    ...colors,
  },
});

export const darkThemeClass = createTheme(themeVars, {
  ...commonVars,
  colors: {
    primary: colors.primary400,
    body: colors.gray300,
    background: colors.gray800,
    link: colors.blue300,
    linkHover: colors.blue400,
    text: "#EEF2F8",
    textSecondary: "#A7B4C2",
    textDanger: colors.red400,
    textWarning: colors.orange200,
    textPlaceholder: `#A2AEBB`,
    rewardBg: "#2F4139",
    rewardContent: "#AEFFAB",
    cardBg: "#1D2024",
    inputBorder: "#434B55",
    inputBg: "#1D2024",
    inputDangerBorder: "#FFD0D0",
    inputDangerBg: "#E17171",
    inputDisabledBg: "#A7B4C2",
    inputDisabledText: "#697584",
    progressBg: `#1D2024`,
    progressValue: `#A7B4C2`,
    progressCursor: `#EEF2F8`,
    divider: colors.gray500,
    menuItemBg: `#1D2024`,
    menuItemBgHovered: `#25292E`,
    menuItemBgActive: `#2C3137`,
    skeletonBg: `#3B434D`,
    ...colors,
  },
});
