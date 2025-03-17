import { NftFeesProps } from "../nft-fees/nft-fees.types";

export interface NftSellNowProps {
  bestOffer: number;
  offerToFloorPriceRatio: string;
  floorPrice: number;
  fees?: NftFeesProps;
  onList?: (event?: any) => void;
  onCancel?: (event?: any) => void;
}
