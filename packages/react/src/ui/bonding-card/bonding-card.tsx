import * as React from "react";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import { BondingCardProps } from "./bonding-card.types";

function BondingCard(props: BondingCardProps) {
  return (
    <Box
      p="$9"
      minHeight="$21"
      minWidth="216px"
      borderRadius="$lg"
      backgroundColor="$cardBg"
    >
      <Stack
        direction="vertical"
        attributes={{
          justifyContent: "center",
        }}
      >
        <Text
          fontSize="$2xl"
          fontWeight="$semibold"
          attributes={{
            marginBottom: "$3",
          }}
        >
          {props.title}
        </Text>
        <Text>{props.value}</Text>
      </Stack>
    </Box>
  );
}

export default BondingCard;
