import type {
  BaseComponentProps,
  NumberFormatOptions,
} from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type DelegationItem = {
  label: string;
  tokenAmount: string;
  tokenName: string;
  isLoading?: boolean;
};

export type InputPartialChange = {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
};

export interface StakingDelegateProps extends BaseComponentProps {
  header?: {
    title?: string;
    subtitle?: string;
    avatarUrl?: string;
  };
  headerExtra?: BaseComponentProps["children"];
  delegationItems?: DelegationItem[];
  footer?: BaseComponentProps["children"];
  inputProps?: StakingDelegateInputProps;
  attributes?: Omit<
    BoxProps,
    "attributes" | "as" | "className" | "children" | "style" | "ref"
  >;
}

export interface StakingDelegateCardProps
  extends BaseComponentProps,
    DelegationItem {
  attributes?: Omit<
    BoxProps,
    "attributes" | "as" | "className" | "children" | "style" | "ref"
  >;
}

export interface StakingDelegateInputProps extends BaseComponentProps {
  value?: number;
  notionalValue?: number;
  inputToken?: {
    tokenName: string;
    tokenIconUrl: string;
  };
  maxValue?: number;
  minValue?: number;
  partials?: InputPartialChange[];
  isLoadingNotionalValue?: boolean;
  onValueChange?: (value: number) => void;
  onValueInput?: (rawValue: string) => void;
  formatOptions?: NumberFormatOptions;
  attributes?: Omit<
    BoxProps,
    "attributes" | "as" | "className" | "children" | "style" | "ref"
  >;
}
