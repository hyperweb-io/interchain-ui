import type { BaseComponentProps } from "../../models/components.model";
import type { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";

type NftMeta = {
  label: string;
  value: string;
};

export interface NftProfileProps extends BaseComponentProps {
  title: string;
  headerButtonLabel: string;
  meta: Array<NftMeta>;
  name: string;
  isVerified: boolean;
  list: NftProfileCardProps[];
  thumbnailBehavior?: NftProfileCardProps["thumbnailBehavior"];
  onView: (event?: any) => void;
  attributes?: any;
}
