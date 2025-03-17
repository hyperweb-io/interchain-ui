import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type {
  GovernanceVoteBreakdownProps,
  GovernanceVoteType,
} from "./governance.types";

function GovernanceVoteBreakdown(props: GovernanceVoteBreakdownProps) {
  function getMeterColor() {
    const COLORS: Record<GovernanceVoteType, Sprinkles["color"]> = {
      yes: "$green200",
      no: "#FE4A4A",
      abstain: "#486A94",
      noWithVeto: "#8F2828",
    };
    return COLORS[props.voteType];
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      {...props.attributes}
      className={props.className}
    >
      <Stack
        direction="horizontal"
        attributes={{
          justifyContent: "space-between",
          marginBottom: "$6",
        }}
      >
        <Text color="$text" fontSize="$md" fontWeight="$semibold">
          {props.title}
        </Text>
        <Text
          color="$text"
          fontSize="$md"
          fontWeight="$semibold"
        >{`${props.votePercentage}%`}</Text>
      </Stack>
      <Box
        backgroundColor="$trackBg"
        width="100%"
        height="$4"
        borderRadius="$base"
        marginBottom="$4"
      >
        <Box
          height="$4"
          borderTopLeftRadius="4px"
          borderBottomLeftRadius="4px"
          backgroundColor={getMeterColor()}
          width={`${props.votePercentage}%`}
          borderTopRightRadius={props.votePercentage === 100 ? "4px" : "0px"}
          borderBottomRightRadius={props.votePercentage === 100 ? "4px" : "0px"}
        />
      </Box>
      <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
        {props.description}
      </Text>
    </Box>
  );
}

export default GovernanceVoteBreakdown;
