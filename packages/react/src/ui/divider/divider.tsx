import * as React from "react";
import Box from "../box";
import { DividerProps } from "./divider.types";

function Divider(props: DividerProps) {
  const { orientation = "horizontal" } = props;
  return (
    <Box
      backgroundColor="$divider"
      width={props?.orientation === "horizontal" ? "100%" : "1px"}
      height={props?.orientation === "horizontal" ? "1px" : "100%"}
      {...props}
    />
  );
}

export default Divider;
