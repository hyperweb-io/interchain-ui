import * as React from "react";
import Box from "../box";
import { BreadcrumbProps } from "./breadcrumb.types";

function Breadcrumb(props: BreadcrumbProps) {
  const {
    width = {
      tablet: "90%",
      desktop: "80%",
    },
    gapRight = "22px",
  } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={gapRight}
      width={width}
      mt={props.mt}
      mb={props.mb}
    >
      {props.children}
    </Box>
  );
}

export default Breadcrumb;
