import type { BaseComponentProps } from "../../models/components.model";

export interface NftTransferProps extends BaseComponentProps {
  onChange?: (event?: any) => void;
  onTransfer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  id?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  transferLabel?: string;
  cancelLabel?: string;
}
