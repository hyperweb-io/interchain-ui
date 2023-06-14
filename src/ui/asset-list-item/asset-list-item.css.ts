import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const imageContainer = sprinkles({
  width: "19",
  paddingLeft: "5",
});
export const lgImg = style([
  sprinkles({
    width: "14",
    height: "14",
  }),
]);
export const smImg = style([
  sprinkles({
    width: "10",
    height: "10",
  }),
]);

export const fieldContainer = sprinkles({
  width: "1/4",
});
