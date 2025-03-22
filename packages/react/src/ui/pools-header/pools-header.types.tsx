import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

export type TokenDataCard = {
  title: string;
  price: string;
  iconUrl: string;
};

export type RewardCountdownCard = {
  title: string;
  seconds: string;
  minutes: string;
  hours: string;
};

export type RewardDataCard = {
  title: string;
  rewardAmount: string;
  rewardTokenName: string;
  rewardNotionalValue: string;
};

export interface PoolsHeaderProps extends BaseComponentProps {
  title?: string;
  tokenData: TokenDataCard;
  rewardCountdownData: RewardCountdownCard;
  rewardData: RewardDataCard;
  attributes?: Sprinkles;
}
