import type { BaseComponentProps } from "../../models/components.model";
import { NftFeesProps } from "../nft-fees/nft-fees.types";

export interface NftMinimumOfferProps extends BaseComponentProps {
  floorPrice: number;
  highestOffer: number;
  onList?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  onChange?: (value: number) => void;
  value?: number;
  fees: NftFeesProps;
}
