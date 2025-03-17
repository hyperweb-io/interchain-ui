import type { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export interface BondingListSmProps {
  list: BondingListItemSmProps[];
  title?: string;
  description?: string;
  unbondedTitle?: string;
  unbondedSharesTitle?: string;
  // ====
  unbondedBalance: number | string;
  unbondedShares: number | string;
}
