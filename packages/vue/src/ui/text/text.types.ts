import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";
import type { Variant } from "./text.helper";

export interface TextProps extends BaseComponentProps {
  as?:
    | "code"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "p"
    | "span";
  color?: Sprinkles["color"];
  fontFamily?: Sprinkles["fontFamily"];
  fontSize?: Sprinkles["fontSize"];
  fontWeight?: Sprinkles["fontWeight"];
  letterSpacing?: Sprinkles["letterSpacing"];
  lineHeight?: Sprinkles["lineHeight"];
  textAlign?: Sprinkles["textAlign"];
  textTransform?: Sprinkles["textTransform"];
  whiteSpace?: Sprinkles["whiteSpace"];
  wordBreak?: Sprinkles["wordBreak"];
  variant?: Variant;
  ellipsis?: boolean;
  underline?: boolean;
  attributes?: Sprinkles;
  domAttributes?: any;
}
