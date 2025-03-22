import type { BaseComponentProps } from "../../models/components.model";
import type { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import type { NftDetailInfoProps } from "../nft-detail-info/nft-detail-info.type";
import type { NftDetailTopOfferProps } from "../nft-detail-top-offers/nft-detail-top-offers.types";
import type { NftDetailActivityListProps } from "../nft-detail-activity-list/nft-detail-activity-list.types";

export type DetailType = "listForSale" | "makeOffer" | "buyNow" | "custom";

export type TokenInfo = {
  tokenName?: string;
  iconSrc?: string;
};

interface BaseNftDetailProps extends BaseComponentProps {
  collectionName: string;
  name: string;
  creatorName: string;
  collectionDesc: string;
  mintPrice?: string;
  rarityOrder: number;
  tokensCount: number;
  ownerName: string;
  imgSrc: string;
  price?: number;
  tokenInfo?: TokenInfo;
  traits?: NftTraitListItemProps[];
  detailInfo?: NftDetailInfoProps;
  detailTopOffer?: NftDetailTopOfferProps;
  detailActivity?: NftDetailActivityListProps;
  onDownload: (event?: any) => void;
  onShare: (event?: any) => void;
  attributes?: any;
  children?: BaseComponentProps["children"];
}

export type ListForSale = {
  type: "listForSale";
  onTransfer: (event?: any) => void;
  onBurn: (event?: any) => void;
  onListForSale: (event?: any) => void;
};

export type MakeOffer = {
  type: "makeOffer";
  onMakeOffer: (event?: any) => void;
};

export type BuyNow = {
  type: "buyNow";
  onBuyNow: (event?: any) => void;
  onMakeOffer: (event?: any) => void;
};

export type Custom = {
  type: "custom";
};

export type NftDetailVariant = ListForSale | MakeOffer | BuyNow | Custom;

export type NftDetailProps = NftDetailVariant & BaseNftDetailProps;
