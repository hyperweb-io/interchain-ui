import type { BaseComponentProps } from "../../models/components.model";
import type { NftDetailActivityListItemProps } from "../nft-detail-activity-list-item/nft-detail-activity-list-item.types";

export interface NftDetailActivityListProps extends BaseComponentProps {
  title?: string;
  list: NftDetailActivityListItemProps[];
}
