import type { BaseComponentProps } from "../../models/components.model";
import type { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";

export interface NftProfileCardListProps extends BaseComponentProps {
  thumbnailBehavior?: NftProfileCardProps["thumbnailBehavior"];
  list: NftProfileCardProps[];
  attributes?: any;
}
