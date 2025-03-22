import type { AssetListHeaderProps } from "../asset-list-header/asset-list-header.types";
import type { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export type SingleChainListItemProps = Omit<
  AssetListItemProps,
  "isOtherChains"
>;

export interface SingleChainProps
  extends Omit<AssetListHeaderProps, "multiChainHeader"> {
  isLoading?: boolean;
  list: Array<SingleChainListItemProps>;
  listTitle: string;
}
