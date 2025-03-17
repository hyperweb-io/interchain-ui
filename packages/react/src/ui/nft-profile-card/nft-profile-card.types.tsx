import type { BaseComponentProps } from "../../models/components.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export type ProfileCardPriceItem = {
  label: string;
  value: string | number;
  iconSrc?: string;
  tokenName?: string;
  onClick?: (event?: any) => void;
};

export interface NftProfileCardProps extends BaseComponentProps {
  // ==== Controls the thumbnail display behavior
  // "full" means the img will have its original aspect ratio fit within the square
  // "contain" means the img will have a fixed aspect ratio to fit the square
  thumbnailBehavior?: "full" | "contain";
  width?: Sprinkles["width"];
  imgSrc: string;
  name: string;
  priceItems: [ProfileCardPriceItem, ProfileCardPriceItem];
  onClick?: (event?: any) => void;
  attributes?: any;
}
