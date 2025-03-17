import * as React from "react";
import Box from "../box";
import type { ContainerProps } from "./container.types";

function Container(props: ContainerProps) {
  const { maxWidth = "prose" } = props;
  return (
    <Box
      width="$full"
      marginX="auto"
      paddingX="$8"
      maxWidth={maxWidth}
      attributes={props.attributes}
    >
      {props.children}
    </Box>
  );
}

export default Container;
