import * as React from "react";
import Box from "../box";
import type { TableCellProps } from "./table.types";

function TableCell(props: TableCellProps) {
  return <Box as="td" paddingX="$2" paddingY="$5" {...props} />;
}

export default TableCell;
