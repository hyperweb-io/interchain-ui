import { PoolListItemProps } from "../pool-list-item/pool-list-item.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";

export interface onAddLiquidityItem extends AvailableItem {
  addAmount: string;
}

export type AddItem = {
  progress: number;
  value: string;
}

export interface AddLiquidityProps {
  poolAssets: PoolListItemProps["poolAssets"];
  onAddLiquidity: (event?:any) => void;
  onChange: (values: AddItem[]) => void;
  isLoading?: boolean;
}
