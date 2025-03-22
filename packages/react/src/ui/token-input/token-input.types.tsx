import { BoxProps } from "../box/box.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";
import type { IconName } from "../icon/icon.types";
import type { LiteralUnion } from "../../helpers/types";

export interface TokenInputProps {
  attributes?: BoxProps["attributes"];
  progress?: number;
  amount?: number;
  symbol?: AvailableItem["symbol"];
  name?: AvailableItem["name"];
  available?: AvailableItem["available"];
  priceDisplayAmount?: AvailableItem["priceDisplayAmount"];
  tokenIcon?: LiteralUnion<IconName, string>;
  title?: string | undefined;
  hasProgressBar?: boolean;
  minValue?: number;
  maxValue?: number;
  // Formatted value for the token amount in stablecoin value
  notionalValue?: string;
  formatNotionalValue?: (tokenAmount: number, pricePerToken: number) => string;
  onProgressChange?: (progress: number) => void;
  onAmountChange?: (value: number) => void;
  onFocus?: (e?: any) => void;
  inputClass?: string;
  imgClass?: string;
}
