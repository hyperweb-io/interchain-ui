import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BaseComponentProps } from "../../models/components.model";

// ==== Data
export type GovernanceProposalStatus = "pending" | "passed" | "rejected";
export type GovernanceVoteType = "yes" | "abstain" | "no" | "noWithVeto";
export type GovernanceVoteStructure = Record<GovernanceVoteType, number>;
export type GovernanceVoteFormStatus = "pending" | "voted" | "expired";

export type LegendFormatter = (
  voteType: GovernanceVoteType,
  votes: number,
  totalVotes: number,
) => string;

export type GovernanceProposalItem = {
  status: GovernanceProposalStatus;
  statusLabel?: string;
  title: string | BaseComponentProps["children"];
  id?: string;
  endTimeLabel?: string;
  endTime: string;
  votes: GovernanceVoteStructure;
  voteTypeLabels?: Record<GovernanceVoteType, string>;
  formatLegend?: LegendFormatter;
};

export type GovernanceProposalListItem = {
  title: string | BaseComponentProps["children"];
  proposals: Array<GovernanceProposalItem>;
};

export type GovernanceProposalList = Array<GovernanceProposalListItem>;

// ==== Component props
export interface GovernanceProposalItemProps
  extends BaseComponentProps,
    GovernanceProposalItem {
  attributes?: Sprinkles;
}

export interface GovernanceProposalListProps extends BaseComponentProps {
  list: GovernanceProposalList;
  voteTypeLabels?: Record<GovernanceVoteType, string>;
  formatLegend?: LegendFormatter;
  attributes?: Sprinkles;
}

export interface GovernanceVoteFormProps extends BaseComponentProps {
  status: GovernanceVoteFormStatus;
  defaultVote?: GovernanceVoteType;
  timepoints: Array<{
    label: string;
    timestamp: string;
  }>;
  radioLabels: Record<GovernanceVoteType, string>;
  isDisabled?: boolean;
  confirmButtonLabels: {
    pending: string;
    needsConfirm: string;
    expired: string;
    voted: string;
  };
  onConfirmVote: (vote: GovernanceVoteType) => void;
  attributes?: Sprinkles;
}

export interface GovernanceVoteBreakdownProps extends BaseComponentProps {
  voteType: GovernanceVoteType;
  title?: string;
  description?: string;
  votePercentage: number;
  attributes?: Sprinkles;
}

export interface GovernanceResultCardProps extends BaseComponentProps {
  resultType: "passed" | "rejected" | "info";
  label: string;
  votePercentage: number;
  attributes?: Sprinkles;
}
