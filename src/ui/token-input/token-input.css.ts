import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { themeVars } from "../../styles/themes.css";
import { breakpoints } from "../../styles/tokens";

export const progressContainer = style([
  sprinkles({
    marginRight: "10",
  }),
  {
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
        justifyContent: "space-between",
        marginBottom: themeVars.space[7],
        marginRight: 0,
      },
    },
  },
]);

export const iconBox = style([
  {
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {},
    },
  },
]);

export const denom = sprinkles({
  fontSize: "xs",
});

export const icon = sprinkles({
  width: "13",
  height: "13",
  borderRadius: "base",
  backgroundColor: "cardBg",
  marginLeft: "9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const inputBox = style([
  sprinkles({
    borderColor: "inputBorder",
    borderRadius: "md",
    backgroundColor: "cardBg",
    position: "relative",
  }),
  {
    borderWidth: "1px",
    borderStyle: "solid",
    height: "68px",
    flex: 1,
    "@media": {
      [`screen and (max-width: ${breakpoints.tablet}px)`]: {
        width: "100%",
      },
    },
  },
]);

export const imgBox = style([
  sprinkles({
    width: "18",
    height: "full",
    borderColor: "inputBorder",
  }),
  {
    borderRightWidth: "1px",
    borderRightStyle: "solid",
  },
]);

export const img = sprinkles({
  width: "14",
  height: "14",
});

export const token = style([
  sprinkles({
    width: "full",
    backgroundColor: "cardBg",
    borderRadius: "lg",
  }),
  {
    border: 0,
    outline: 0,
  },
]);

export const caulator = style([
  sprinkles({
    position: "absolute",
    height: "full",
    right: "9",
  }),
]);

export const disabled = style({
  opacity: 0.6,
  cursor: "not-allowed",
});

export const inputTitle = style({
  flex: 1,
});
