import type { BaseComponentProps } from "../../models/components.model";

export interface NftMintProps extends BaseComponentProps {
  title: string;
  tag: string;
  name: string;
  description: string;
  quantity: number | string;
  royalties: number | string;
  minted: number | string;
  available: number | string;
  priceDisplayAmount: number | string;
  limited: number | string;
  imgSrc: string;
  // ==== Token props
  tokenName?: string;
  pricePerToken: number | string;
  // ==== Amount to bid for NFT
  amount?: number;
  defaultAmount?: number;
  tokenAmount?: number;
  notionalAmount?: number;
  onChange?: (value: number) => void;
  onInput?: (event?: any) => void;
  // ==== Mint button props
  isMintButtonDisabled?: boolean;
  isMintLoading?: boolean;
  mintButtonLabel?: string;
  mintButtonDisabledLabel?: string;
  onMint: (event?: any) => void;
}
