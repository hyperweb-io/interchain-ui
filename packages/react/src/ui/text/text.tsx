import * as React from "react";
import Box from "../box";
import type { TextProps } from "./text.types";
import { getTextTransformStyles, getVariantStyles } from "./text.helper";

function Text(props: TextProps) {
  const {
    as = "p",
    fontSize = "$sm",
    color = "$text",
    variant = "body",
    wordBreak = "break-word",
    ellipsis = false,
    underline = false,
  } = props;
  function spreadAttributes() {
    return Object.assign(
      { margin: "$0", as: as, className: props.className },
      props.attributes,
      props.domAttributes,
      getVariantStyles(variant ?? "body", props.fontFamily),
      getTextTransformStyles({ ellipsis: ellipsis, underline: underline }),
      {
        color: color,
        fontSize: fontSize,
        fontWeight: props.fontWeight,
        letterSpacing: props.letterSpacing,
        lineHeight: props.lineHeight,
        textAlign: props.textAlign,
        textTransform: props.textTransform,
        wordBreak: wordBreak,
      }
    );
  }
  return <Box {...spreadAttributes()}>{props.children}</Box>;
}

export default Text;
