import type { BaseComponentProps } from "../../models/components.model";

export interface AssetListItemProps extends BaseComponentProps {
  isOtherChains?: boolean;
  imgSrc: string;
  symbol: string;
  name: string;
  tokenAmount: string;
  tokenAmountPrice: string;
  chainName?: string;
  needChainSpace?: boolean;
  // Withdraw and deposit button props
  depositLabel?: string;
  withdrawLabel?: string;
  showDeposit?: boolean;
  showWithdraw?: boolean;
  onDeposit?: (event?: any) => void;
  onWithdraw?: (event?: any) => void;
}
