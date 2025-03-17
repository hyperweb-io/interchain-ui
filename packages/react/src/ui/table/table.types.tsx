import type { BoxProps } from "../box/box.types";

export interface TableProps extends BoxProps {
  gridLayout?: "auto" | "fixed";
}

export interface TableHeadProps extends BoxProps {}

export interface TableRowHeaderCellProps extends BoxProps {}

export interface TableBodyProps extends BoxProps {}

export interface TableRowProps extends BoxProps {}

export interface TableCellProps extends BoxProps {}

export interface TableColumnHeaderCellProps extends BoxProps {}
