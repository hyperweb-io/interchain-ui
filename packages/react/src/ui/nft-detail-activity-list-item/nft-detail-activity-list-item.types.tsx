import type { BaseComponentProps } from "../../models/components.model";

export interface NftDetailActivityListItemProps extends BaseComponentProps {
  event: string;
  price: number;
  from?: string;
  to?: string;
  date: string;
  tokenName: string;
  // ==== Labels
  fromLabel?: string;
  toLabel?: string;
}
