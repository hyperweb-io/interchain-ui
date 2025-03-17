import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";

export interface SwapPriceType {
  priceRate: string;
  dollarValue: string;
}

export type SwapDetailCoin = {
  logoUrl: string | undefined;
  symbol: string;
};

export type SwapPriceDetailRoute = {
  poolId: string;
  swapFee: string;
  baseLogo: string | undefined;
  baseSymbol: string;
  quoteLogo: string | undefined;
  quoteSymbol: string;
};

export type SwapPriceDetailRouteDetail = {
  tokenIn: SwapDetailCoin;
  routes: SwapPriceDetailRoute[];
  tokenOut: SwapDetailCoin;
};

export interface SwapPriceProps extends BaseComponentProps {
  // ==== Labels
  title?: string;
  priceImpactLabel?: string;
  swapFeeLabel?: string;
  expectedOutputLabel?: string;
  minimumReceivedLabel?: string;
  routeLabel?: string;
  // ====
  hasRoute?: boolean;
  // price: SwapPriceType;
  priceImpact: string;
  swapFee: {
    percentage: string;
    value: string;
  };
  minimumReceived?: number;
  // internal props
  fromItem: AvailableItem;
  toItem: AvailableItem;
  disabled?: boolean;
  fromAmount: number;
  toAmount: number;
  attributes?: BoxProps;
}
