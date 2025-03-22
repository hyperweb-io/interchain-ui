import { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type Variant = "body" | "heading";
export type TextTransform = "ellipsis" | "underline" | "none";

export function getVariantStyles(
  variant: Variant,
  customFontFamily?: Sprinkles["fontFamily"]
): Sprinkles {
  if (variant === "body") {
    return {
      fontFamily: customFontFamily ?? "$body",
      fontSize: "$sm",
      fontWeight: "$normal",
      lineHeight: "$normal",
    };
  }

  if (variant === "heading") {
    return {
      fontFamily: customFontFamily ?? "$body",
      fontSize: "$md",
      fontWeight: "$semibold",
      lineHeight: "$tall",
    };
  }
}

export function getTextTransformStyles({
  ellipsis,
  underline,
}: {
  ellipsis: boolean;
  underline: boolean;
}): Sprinkles {
  if (ellipsis) {
    return {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    };
  }

  if (underline) {
    return {
      textDecoration: "underline",
    };
  }

  return {};
}
