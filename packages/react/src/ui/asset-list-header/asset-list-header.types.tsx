import type { BaseComponentProps } from "../../models/components.model";

export type HeaderInfo = {
  label: string;
  value: string;
};

export type MultiChainHeader = [HeaderInfo, HeaderInfo];

export type SingleChainHeader = HeaderInfo;

export interface AssetListHeaderProps extends BaseComponentProps {
  title: string;
  multiChainHeader?: MultiChainHeader;
  singleChainHeader?: SingleChainHeader;
  depositButtonLabel?: string;
  withdrawButtonLabel?: string;
  // ==== Action props
  showDeposit?: boolean;
  showWithdraw?: boolean;
  onDeposit?: (event?: any) => void;
  onWithdraw?: (event?: any) => void;
  attributes?: any;
}
