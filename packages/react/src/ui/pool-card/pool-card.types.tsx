import { PoolDetailProps, PoolListItemProps } from "../pool-list-item/pool-list-item.types";
export interface PoolCardProps extends PoolListItemProps {
  myLiquidity: PoolDetailProps["myLiquidity"];
  unbondedBalance: PoolDetailProps["unbondedBalance"]
}
