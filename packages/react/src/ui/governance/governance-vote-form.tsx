import * as React from "react";
import { useState } from "react";
import { noop } from "lodash";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import Button from "../button";
import { fullWidth } from "../shared/shared.css";
import type {
  GovernanceVoteFormProps,
  GovernanceVoteType,
} from "./governance.types";
import GovernanceRadio from "../governance-radio";
import GovernanceRadioGroup from "../governance-radio-group";

function GovernanceVoteForm(props: GovernanceVoteFormProps) {
  const [showRadios, setShowRadios] = useState(() => false);

  const [selectedVote, setSelectedVote] = useState(() => undefined);

  function shouldShowRadios() {
    if (props.status === "expired" || props.status === "voted") {
      return true;
    }
    return showRadios;
  }

  function getIsDisabled() {
    return (
      props.isDisabled || props.status === "expired" || props.status === "voted"
    );
  }

  function getButtonLabel() {
    if (props.status === "pending" && showRadios) {
      return props.confirmButtonLabels.needsConfirm;
    }
    return props.confirmButtonLabels[props.status];
  }

  function handleShowRadios() {
    setShowRadios(true);
  }

  function handleConfirm() {
    if (!selectedVote) return;
    props.onConfirmVote(selectedVote);
  }

  function handleVoteChange(vote: GovernanceVoteType) {
    setSelectedVote(vote);
  }

  return (
    <Box
      backgroundColor="$cardBg"
      display="flex"
      flexDirection="column"
      gap="$10"
      borderRadius="$lg"
      {...props.attributes}
      p={{
        mobile: "$9",
        tablet: "$10",
        desktop: "$10",
      }}
      className={props.className}
    >
      <Box display="flex" justifyContent="space-between">
        {props.timepoints?.map((timepoint) => (
          <Stack direction="vertical" space="$1">
            <Text color="$textSecondary" fontSize="$sm" fontWeight="$semibold">
              {timepoint.label}
            </Text>
            <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
              {timepoint.timestamp}
            </Text>
          </Stack>
        ))}
      </Box>
      <Box display={shouldShowRadios() ? "block" : "none"}>
        <GovernanceRadioGroup
          value={selectedVote}
          defaultValue={props.defaultVote}
          isDisabled={getIsDisabled()}
          onChange={(selected) =>
            handleVoteChange(selected as GovernanceVoteType)
          }
        >
          <Box
            display="flex"
            gap="$6"
            flexDirection={{
              mobile: "column",
              tablet: "row",
              desktop: "row",
            }}
            justifyContent={{
              mobile: "flex-start",
              tablet: "space-between",
              desktop: "flex-start",
            }}
          >
            <GovernanceRadio value="yes">Yes</GovernanceRadio>
            <GovernanceRadio value="no">No</GovernanceRadio>
            <GovernanceRadio value="noWithVeto">No with veto</GovernanceRadio>
            <GovernanceRadio value="abstain">Abstain</GovernanceRadio>
          </Box>
        </GovernanceRadioGroup>
      </Box>
      <Button
        intent="tertiary"
        disabled={getIsDisabled()}
        onClick={(event) => {
          if (
            props.isDisabled ||
            props.status === "expired" ||
            props.status === "voted"
          ) {
            return noop();
          }
          if (props.status === "pending" && !showRadios) {
            return handleShowRadios();
          }
          if (showRadios) {
            return handleConfirm();
          }
        }}
        className={fullWidth}
      >
        {getButtonLabel()}
      </Button>
    </Box>
  );
}

export default GovernanceVoteForm;
