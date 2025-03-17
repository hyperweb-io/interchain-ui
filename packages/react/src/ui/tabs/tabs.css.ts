import { style, createVar } from "@vanilla-extract/css";

export const selectedWidth = createVar();
export const selectedLeft = createVar();

export const tabsBase = style([
  {
    listStyle: "none",
    display: "flex",
    borderRadius: "50px",
  },
]);

export const tabsHorizontal = style([
  tabsBase,
  {
    flexDirection: "row",
  },
]);

export const tabButton = style(
  {
    all: "unset",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    borderRadius: "50px",
  },
);

export const tabSelection = style({
  zIndex: -1,
  height: '100%',
  position: 'absolute',
  left: 0,
  borderRadius: '50px',
  willChange: `transform, width`,
  transition: `transform 150ms, width 100ms`,
})
