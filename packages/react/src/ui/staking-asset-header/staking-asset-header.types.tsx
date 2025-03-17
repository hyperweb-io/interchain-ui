import type { BoxProps } from "../box/box.types";
import type { NumberFormatOptions } from "../../models/components.model";

export interface StakingAssetHeaderProps extends BoxProps {
  imgSrc: string;
  symbol: string;
  // ==== Numeric props
  totalAmount: number;
  totalPrice: number;
  available: number;
  availablePrice: number;
  // ==== Labels
  totalLabel?: string;
  availableLabel?: string;
  priceformatOptions?: NumberFormatOptions;
}
