import * as React from "react";
import Box from "../box";
import type { TableBodyProps } from "./table.types";

function TableBody(props: TableBodyProps) {
  return <Box as="tbody" {...props} />;
}

export default TableBody;
