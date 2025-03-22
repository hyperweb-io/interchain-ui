import type { BaseComponentProps } from "../../models/components.model";
import type { AvailableItem } from "../transfer-item/transfer-item.types";

export type TransferPartial = {
  percentage: number;
  label: string;
};

export interface AssetWithdrawTokensProps extends BaseComponentProps {
  isDropdown?: boolean;
  fromSymbol: AvailableItem["symbol"];
  fromName: AvailableItem["name"];
  fromAddress: string;
  fromImgSrc: AvailableItem["imgSrc"];
  toName: AvailableItem["name"];
  toAddress: string;
  toImgSrc: AvailableItem["imgSrc"];
  available: AvailableItem["available"];
  priceDisplayAmount: AvailableItem["priceDisplayAmount"];
  amount?: string;
  // ==== Labels
  transferLabel?: string;
  cancelLabel?: string;
  timeEstimateLabel: string;
  isSubmitDisabled?: boolean;
  partials?: Array<TransferPartial>;
  onChange?: (value: string) => void;
  onTransfer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  onAddressChange?: (value: string) => void;
  onAddressConfirm?: (event?: any) => void;
}
