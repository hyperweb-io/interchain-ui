import * as React from "react";
import Box from "../box";
import type { TableColumnHeaderCellProps } from "./table.types";

function TableColumnHeaderCell(props: TableColumnHeaderCellProps) {
  return <Box as="th" paddingX="$2" paddingY="$5" {...props} />;
}

export default TableColumnHeaderCell;
