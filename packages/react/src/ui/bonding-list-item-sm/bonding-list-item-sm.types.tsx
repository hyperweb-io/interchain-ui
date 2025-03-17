import { APR } from "../pool-list-item/pool-list-item.types";

export interface BondingListItemSmProps {
  title: string;
  bondedValue: APR["bondedShares"];
  bondedShares: APR["bondedShares"];
  totalApr: APR["totalApr"];
  isUnbondLoading?: boolean;
  isBondLoading?: boolean;
  onBond?: (event?: any) => void;
  onUnbond?: (event?: any) => void;
}
