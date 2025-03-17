import type { BaseComponentProps } from "../../models/components.model";

export interface NftMakeOfferProps extends BaseComponentProps {
  imgSrc: string;
  tokenName: string;
  onChange?: (value: number) => void;
  onMakeOffer?: (event?: any) => void;
  onCancel?: (event?: any) => void;
  value?: number;
  attributes?: any;
  // === Labels
  makeOfferLabel?: string;
  cancelLabel?: string;
  symbol?: string;
}
