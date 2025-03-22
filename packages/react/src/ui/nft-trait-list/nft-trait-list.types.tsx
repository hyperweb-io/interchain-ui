import type { BaseComponentProps } from "../../models/components.model";
import type { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";

export interface NftTraitListProps extends BaseComponentProps {
  list: NftTraitListItemProps[];
  attributes?: any;
}
