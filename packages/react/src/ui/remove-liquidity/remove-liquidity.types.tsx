import {
  Coin,
  PoolDetailProps,
} from "../pool-list-item/pool-list-item.types";

export interface OnRemoveLiquidityDetail {}
export interface RemoveLiquidityProps {
  unbondedBalance: PoolDetailProps["unbondedBalance"];
  unbondedShares: PoolDetailProps["unbondedShares"];
  myLiquidityCoins: Coin[];
  isLoading?: boolean;
  onRemoveLiquidity: (event?: any) => void;
  onChange: (progress: number) => void;
}
