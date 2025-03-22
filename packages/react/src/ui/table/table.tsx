import * as React from "react";
import clx from "clsx";
import Box from "../box";
import * as styles from "./table.css";
import type { TableProps } from "./table.types";

function Table(props: TableProps) {
  const { gridLayout = "auto" } = props;
  return (
    <Box
      as="table"
      py="$9"
      px="$11"
      tableLayout={gridLayout === "auto" ? "auto" : "fixed"}
      {...props}
      className={clx(props.className, styles.table)}
    />
  );
}

export default Table;
