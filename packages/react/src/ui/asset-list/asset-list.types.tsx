import type { BaseComponentProps } from "../../models/components.model";
import type { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export interface AssetListProps extends BaseComponentProps {
  isOtherChains: boolean;
  needChainSpace: boolean;
  list: AssetListItemProps[];
  titles?: [string, string];
  attributes?: any;
}
