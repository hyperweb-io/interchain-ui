import type {
  AvailableItem,
  TransferItemProps,
} from "../transfer-item/transfer-item.types";
import type { BaseComponentProps } from "../../models/components.model";
import type { SwapPriceProps } from "../swap-price/swap-price.types";
import type { ChainListItemProps } from "../chain-list-item/chain-list-item.types";

export interface SwapItemProps extends TransferItemProps {}

export type SwapInfo = {
  fromItem: AvailableItem;
  toItem: AvailableItem;
  fromAmount: number;
  toAmount: number;
};

export type SwapItem = {
  label?: string;
  options: Array<AvailableItem>;
  selected: AvailableItem;
  amount: number;
  onItemSelected: (selectedItem: AvailableItem) => void;
  onAmountChange?: (selectedItem: AvailableItem, amount: number) => void;
  onAmountInput?: (selectedItem: AvailableItem, rawValue: string) => void;
};

export type ComboboxOption = {
  iconUrl?: ChainListItemProps["iconUrl"];
  name: ChainListItemProps["name"];
  tokenName: ChainListItemProps["tokenName"];
  amount?: ChainListItemProps["amount"];
  notionalValue?: ChainListItemProps["notionalValue"];
};

export interface SwapTokenProps extends BaseComponentProps {
  swapPrice: {
    hasRoute: SwapPriceProps["hasRoute"];
    priceImpact: SwapPriceProps["priceImpact"];
    swapFee: SwapPriceProps["swapFee"];
    // Route preview props
    routeDisabled?: boolean;
    minimumReceived?: number;
  };
  from: SwapItem;
  to: SwapItem;
  toleranceLimits?: Array<number>;
  filterFn?: (
    options: Array<ComboboxOption>,
    query: string
  ) => Array<ComboboxOption>;
  onToggleDirection: () => void;
  onSwap: (event?: any) => void;
  onToleranceChange: (toterancePercent: number) => void;
  swapDisabled?: boolean;
  // Labels
  swapLabel?: string;
  swapDisabledLabel?: string;
  slippageLabel?: string;
}
