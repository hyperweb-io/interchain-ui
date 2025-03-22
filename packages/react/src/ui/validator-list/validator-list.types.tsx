import type { BoxProps } from "../box/box.types";
import type {
  BaseComponentProps,
  GridColumn,
  NumberFormatOptions,
} from "../../models/components.model";

export interface ValidatorListProps extends BaseComponentProps {
  variant?: "solid" | "ghost";
  gridLayout?: "auto" | "fixed";
  columns?: GridColumn[];
  data: Array<unknown>;
  tableProps?: BoxProps;
}

export interface ValidatorNameCellProps extends BoxProps {
  size?: "sm" | "md";
  validatorId?: string;
  validatorName: string;
  validatorImg: string;
}

export interface ValidatorTokenAmountCellProps extends BoxProps {
  amount: number | string;
  symbol?: string;
  formatOptions?: Partial<NumberFormatOptions>;
}
