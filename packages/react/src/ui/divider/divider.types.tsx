import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
} & Partial<Sprinkles>;
