import { Coin } from "../pool-list-item/pool-list-item.types";
export interface PoolInfoHeaderProps {
  id: string;
  liquidity: number | string;
  swapFee: number | string;
  volume24H: number | string;
  coins: Coin[]
}
