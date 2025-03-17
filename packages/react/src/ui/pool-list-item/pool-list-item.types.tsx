import type { AddLiquidityProps } from "../add-liquidity/add-liquidity.types";
import type { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";
import type { ManageLiquidityCardProps } from "../manage-liquidity-card/manage-liquidity-card.types";
import type { RemoveLiquidityProps } from "../remove-liquidity/remove-liquidity.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";
import type { BaseComponentProps } from "../../models/components.model";

export type APR = {
  totalApr: string;
  swapFeeApr: {
    swapFeeValuePerDay: string;
    apr: string;
  };
  bondedShares: string | number;
  bondedValue: string | number; // unbond should be disabled when bondedValue < 0
  superfluidApr?: string;
  amount?: string;
};

export interface Coin {
  symbol: string;
  imgSrc: string;
  displayAmount?: string;
}

export interface PoolListItemProps extends BaseComponentProps {
  id: string;
  poolAssets: AvailableItem[];
  liquidity: number | string;
  apr: string;
  fees7D?: number;
  volume24H?: number | string;
  onClick?: (event?: any) => void;
}

export interface PoolDetailProps {
  bonded: number | string;
  myLiquidity: string; // Remove liquidity should be disabled when myLiquidty < 0
  swapFee: number | string;
  totalBalance: string; // Your pool balance
  totalShares: string;
  lpTokenBalance: string;
  lpTokenShares: string;
  totalBalanceCoins: Coin[]; // show in pool detail
  unbondedBalance: string; // pass to remove liquiditypage
  unbondedShares: string; // pass to remove liquiditypage
  myLiquidityCoins: Coin[]; // pass to remove liquiditypage

  // function
  onAddLiquidity: AddLiquidityProps["onAddLiquidity"];
  onRemoveLiquidity: RemoveLiquidityProps["onRemoveLiquidity"];
  onBond: BondingListItemSmProps["onBond"];
  onUnbond: BondingListItemSmProps["onUnbond"];
  onStartEarning: ManageLiquidityCardProps["onStartEarning"];
}
