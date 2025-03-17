import * as React from "react";
import Box from "../box";
import type { TableHeadProps } from "./table.types";

function TableHead(props: TableHeadProps) {
  return <Box as="thead" {...props} />;
}

export default TableHead;
