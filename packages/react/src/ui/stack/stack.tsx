import * as React from "react";
import Box from "../box";
import type { StackProps } from "./stack.types";

function Stack(props: StackProps) {
  const { as = "div", direction = "horizontal", space = "$0" } = props;
  return (
    <Box
      display="flex"
      as={as}
      {...props.attributes}
      boxRef={props.boxRef}
      flexDirection={direction === "horizontal" ? "row" : "column"}
      gap={space}
      attributes={props.domAttributes}
      className={props.className}
    >
      {props.children}
    </Box>
  );
}

export default Stack;
