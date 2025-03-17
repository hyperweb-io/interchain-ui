import * as React from "react";
import Box from "../box";
import type { CenterProps } from "./center.types";
import { getAxisStyles } from "./center.helper";

function Center(props: CenterProps) {
  const { as = "div", axis = "both" } = props;
  return (
    <Box {...props} {...getAxisStyles(axis)}>
      {props.children}
    </Box>
  );
}

export default Center;
