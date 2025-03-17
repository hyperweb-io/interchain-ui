import type { BaseComponentProps } from "../../models/components.model";
import type { ChainListItemProps } from "../chain-list-item/chain-list-item.types";

export type ComboboxListItem = {
  iconUrl?: string;
  name: string;
  tokenName: string;
  amount?: string;
  notionalValue?: string;
};

export type ComboboxList = Array<ComboboxListItem>;

export type AvailableItem = {
  imgSrc: string;
  symbol: string;
  name: string;
  denom?: string;
  /**
   * Available amount
   */
  available?: number;
  /**
   * Dollar price for per token
   */
  priceDisplayAmount?: number;
};

export type PartialAmount = {
  label: string;
  percentage: number;
};

export interface TransferItemProps extends BaseComponentProps {
  /**
   * Drop down list of available items
   */
  dropdownList: AvailableItem[];
  /**
   * If show the available amount
   */
  hasAvailable?: boolean;
  availableLabel?: string;
  partials?: PartialAmount[];
  /**
   * Title of the transfer-item
   */
  title?: string;
  placeholder?: string;
  onChange?: (item: AvailableItem, value: number) => void;
  onInput?: (item: AvailableItem, rawValue: string) => void;
  /**
   * Disabled status of input
   */
  disabled?: boolean;
  /**
   * Callback when value changed of dropdown
   * @param selectItem
   * @returns
   */
  onItemSelected?: (selectItem: AvailableItem) => void;
  selectedItem: AvailableItem;
  defaultSelectedItem?: AvailableItem;
  amount?: number;
  defaultAmountPrice?: string;
  availableAsMax?: boolean;
  // Use the super tight spacing version for use as a widget
  isSmall?: boolean;
  filterFn?: (
    options: Array<ChainListItemProps>,
    query: string,
  ) => Array<ChainListItemProps>;
}
