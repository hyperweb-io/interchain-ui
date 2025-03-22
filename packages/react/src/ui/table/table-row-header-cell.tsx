import * as React from "react";
import Box from "../box";
import type { TableRowHeaderCellProps } from "./table.types";

function TableRowHeaderCell(props: TableRowHeaderCellProps) {
  return <Box as="th" paddingX="$2" paddingY="$5" {...props} />;
}

export default TableRowHeaderCell;
