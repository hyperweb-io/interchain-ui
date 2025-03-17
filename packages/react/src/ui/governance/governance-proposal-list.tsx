import * as React from "react";
import Box from "../box";
import Text from "../text";
import GovernanceProposalItem from "./governance-proposal-item";
import type { GovernanceProposalListProps } from "./governance.types";

function GovernanceProposalList(props: GovernanceProposalListProps) {
  return (
    <>
      {props.list?.map((proposalItem) => (
        <Box
          display="flex"
          flexDirection="column"
          key={proposalItem.title}
          gap={{
            mobile: "$10",
            tablet: "$12",
            desktop: "$12",
          }}
          paddingBottom={{
            mobile: "$10",
            tablet: "$12",
            desktop: "$12",
          }}
        >
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            fontSize={{
              mobile: "$md",
              tablet: "$lg",
              desktop: "$lg",
            }}
          >
            {proposalItem.title}
          </Text>
          {proposalItem.proposals?.map((proposal, index) => (
            <GovernanceProposalItem
              status={proposal.status}
              title={proposal.title}
              id={proposal.id}
              endTime={proposal.endTime}
              endTimeLabel={proposal.endTimeLabel}
              votes={proposal.votes}
              key={`${proposal.id}-${index}`}
              formatLegend={props.formatLegend}
              voteTypeLabels={props.voteTypeLabels}
            />
          ))}
        </Box>
      ))}
    </>
  );
}

export default GovernanceProposalList;
