import * as React from "react";
import Box from "../box";
import type { TableRowProps } from "./table.types";

function TableRow(props: TableRowProps) {
  return <Box as="tr" {...props} />;
}

export default TableRow;
