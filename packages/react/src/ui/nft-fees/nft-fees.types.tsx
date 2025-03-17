import type { BaseComponentProps } from "../../models/components.model";

export type NftFeeItemProps = {
  feeName: string;
  amount: number | string | undefined;
  desc: string;
  show?: boolean;
  amountKey?: string;
};

export interface NftFeesProps extends BaseComponentProps {
  title: string;
  listFee?: number | string;
  royalities?: number | string;
  fairBurn?: number | string;
  proceeds?: number | string;
  symbol: string;
}
