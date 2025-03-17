import type { BoxProps } from "../box/box.types";

export interface StakingClaimHeaderProps extends BoxProps {
  stakedAmount: number;
  rewardsAmount: number;
  symbol: string;
  // ==== Labels
  stakedLabel?: string;
  claimRewardsLabel?: string;
  claimLabel?: string;
  // ==== button states
  isLoading?: boolean;
  isDisabled?: boolean;
  onClaim?: (event?: any) => void;
}
