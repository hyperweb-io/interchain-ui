import { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import { CenterProps } from "./center.types";

const baseStyles: Sprinkles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const centerStyles: Record<CenterProps["axis"], Sprinkles> = {
  horizontal: {
    insetInlineStart: "50%",
    transform: "translateX(-50%)",
  },
  vertical: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  both: {
    insetInlineStart: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export function getAxisStyles(axis: CenterProps["axis"]): Sprinkles {
  return {
    ...baseStyles,
    ...centerStyles[axis ?? "both"],
  };
}
