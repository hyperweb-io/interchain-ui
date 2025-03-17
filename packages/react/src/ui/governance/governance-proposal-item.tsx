import * as React from "react";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import Divider from "../divider";
import Tooltip from "../tooltip";
import type {
  GovernanceProposalItemProps,
  GovernanceProposalStatus,
  GovernanceVoteType,
} from "./governance.types";
import GovernanceCheckbox from "../governance-checkbox";

function GovernanceProposalItem(props: GovernanceProposalItemProps) {
  const {
    endTimeLabel = "Voting end time",
    voteTypeLabels = {
      yes: "Yes",
      no: "No",
      abstain: "Abstain",
      noWithVeto: "No with veto",
    },
    formatLegend = (
      voteType: GovernanceVoteType,
      votes: number,
      totalVotes: number
    ) => {
      const defaultLabels: Record<GovernanceVoteType, string> = {
        yes: "Yes",
        no: "No",
        abstain: "Abstain",
        noWithVeto: "No with veto",
      };
      return `${defaultLabels[voteType]} (${(
        (votes / totalVotes) *
        100
      ).toFixed(2)}%)`;
    },
  } = props;
  function getStatusLabel() {
    if (typeof props.statusLabel === "string") {
      return props.statusLabel;
    }
    const defaultLabels: Record<GovernanceProposalStatus, string> = {
      pending: "Pending",
      passed: "Passed",
      rejected: "Rejected",
    };
    return defaultLabels[props.status];
  }
  function getVoteTypeLabel(voteKind: GovernanceVoteType) {
    const vote = props.votes[voteKind];
    if (typeof formatLegend === "function") {
      const total =
        props.votes.abstain +
        props.votes.no +
        props.votes.noWithVeto +
        props.votes.yes;
      return formatLegend(voteKind, vote, total);
    }
    return voteTypeLabels[voteKind];
  }
  function getWidthFor(voteKind: GovernanceVoteType) {
    const total =
      props.votes.abstain +
      props.votes.no +
      props.votes.noWithVeto +
      props.votes.yes;
    return `${(props.votes[voteKind] / total) * 100}%`;
  }
  return (
    <Box
      borderRadius="$lg"
      borderColor="$inputBorder"
      borderStyle="$solid"
      borderWidth="$sm"
      {...props.attributes}
      minHeight={{ tablet: "104px" }}
      px={{ mobile: "$9", tablet: "$12" }}
      py={{ mobile: "$6", tablet: "$10" }}
      attributes={{ "data-part-id": "root" }}
      className={props.className}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        gap="$10"
        height="100%"
        minWidth="$0"
        flexDirection={{ mobile: "column", tablet: "row", desktop: "row" }}
        alignItems={{
          mobile: "flex-start",
          tablet: "center",
          desktop: "center",
        }}
        attributes={{ "data-part-id": "content" }}
      >
        <Box
          flexShrink="0"
          width="84px"
          display={{ mobile: "none", tablet: "block", desktop: "block" }}
          attributes={{ "data-part-id": "checkboxes" }}
        >
          {props.status === "pending" ? (
            <GovernanceCheckbox isIndeterminate>
              {getStatusLabel()}
            </GovernanceCheckbox>
          ) : null}
          {props.status === "passed" ? (
            <GovernanceCheckbox isSelected>
              {getStatusLabel()}
            </GovernanceCheckbox>
          ) : null}
          {props.status === "rejected" ? (
            <GovernanceCheckbox isRejected>
              {getStatusLabel()}
            </GovernanceCheckbox>
          ) : null}
        </Box>
        <Stack
          direction="horizontal"
          space="$10"
          attributes={{
            width: { mobile: "100%", tablet: "auto", desktop: "auto" },
            flex: 1,
            overflow: "hidden",
            justifyContent: "flex-start",
            alignItems: {
              mobile: "flex-start",
              tablet: "center",
              desktop: "center",
            },
          }}
          domAttributes={{ "data-part-id": "mid" }}
        >
          <Stack
            direction="vertical"
            space="$2"
            attributes={{
              display: { mobile: "flex", tablet: "none", desktop: "none" },
            }}
          >
            <Box flexShrink="0" width="84px">
              {props.status === "pending" ? (
                <GovernanceCheckbox isIndeterminate>
                  {getStatusLabel()}
                </GovernanceCheckbox>
              ) : null}
              {props.status === "passed" ? (
                <GovernanceCheckbox isSelected>
                  {getStatusLabel()}
                </GovernanceCheckbox>
              ) : null}
              {props.status === "rejected" ? (
                <GovernanceCheckbox isRejected>
                  {getStatusLabel()}
                </GovernanceCheckbox>
              ) : null}
            </Box>
            <Stack
              direction="vertical"
              space="$1"
              attributes={{ flexGrow: "0" }}
            >
              <Text color="$textSecondary" fontSize="$2xs" fontWeight="$normal">
                {props.endTime}
              </Text>
            </Stack>
          </Stack>
          <Box
            alignItems="center"
            justifyContent="center"
            height="44px"
            display={{ mobile: "none", tablet: "flex", desktop: "flex" }}
          >
            <Divider orientation="vertical" />
          </Box>
          <Stack direction="vertical" space="$4" attributes={{ width: "100%" }}>
            <Text
              color="$text"
              fontSize="$sm"
              fontWeight="$normal"
              as={typeof props.title === "string" ? "p" : "div"}
              attributes={{ whiteSpace: "pre-wrap" }}
            >
              {props.title}
            </Text>
            {props.id ? (
              <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
                {props.id}
              </Text>
            ) : null}
            <Box
              backgroundColor="transparent"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1px"
              height="$2"
              width="100%"
            >
              <Box
                height="$2"
                backgroundColor="$green200"
                borderTopLeftRadius="4px"
                borderBottomLeftRadius="4px"
                width={getWidthFor("yes")}
              >
                <Tooltip
                  placement="bottom"
                  title={
                    <Text fontSize="$xs" color="$textInverse">
                      {getVoteTypeLabel("yes")}
                    </Text>
                  }
                >
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
              <Box
                height="$2"
                backgroundColor="#486A94"
                width={getWidthFor("abstain")}
              >
                <Tooltip
                  placement="bottom"
                  title={
                    <Text fontSize="$xs" color="$textInverse">
                      {getVoteTypeLabel("abstain")}
                    </Text>
                  }
                >
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
              <Box
                height="$2"
                backgroundColor="$red600"
                width={getWidthFor("no")}
              >
                <Tooltip
                  placement="bottom"
                  title={
                    <Text fontSize="$xs" color="$textInverse">
                      {getVoteTypeLabel("no")}
                    </Text>
                  }
                >
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
              <Box
                height="$2"
                backgroundColor="$inputBorder"
                borderTopRightRadius="4px"
                borderBottomRightRadius="4px"
                width={getWidthFor("noWithVeto")}
              >
                <Tooltip
                  placement="bottom"
                  title={
                    <Text fontSize="$xs" color="$textInverse">
                      {getVoteTypeLabel("noWithVeto")}
                    </Text>
                  }
                >
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction="vertical"
          space="$1"
          attributes={{
            display: { mobile: "none", tablet: "flex", desktop: "flex" },
            flexGrow: "0",
          }}
        >
          <Text color="$textSecondary" fontSize="$sm" fontWeight="$semibold">
            {endTimeLabel}
          </Text>
          <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
            {props.endTime}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default GovernanceProposalItem;
