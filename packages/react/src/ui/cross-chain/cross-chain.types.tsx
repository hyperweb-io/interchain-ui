import type { AssetListHeaderProps } from "../asset-list-header/asset-list-header.types";
import type { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export type CrossChainListItemProps = Omit<AssetListItemProps, "isOtherChains">;

export interface CrossChainProps
  extends Omit<AssetListHeaderProps, "singleChainHeader"> {
  list: Array<CrossChainListItemProps>;
  listTitle: string;
  otherList: Array<CrossChainListItemProps>;
  otherListTitle: string;
}
