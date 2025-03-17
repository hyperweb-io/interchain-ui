import * as React from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Box from "../box";
import BondingCard from "../bonding-card";
import { BondingCardListProps } from "./bonding-card-list.types";
import { BondingCardProps } from "../bonding-card/bonding-card.types";

function PoolCardList(props: BondingCardListProps) {
  return (
    <Box>
      <Stack
        space="$10"
        attributes={{
          flexWrap: "nowrap",
        }}
      >
        {props.list?.map((item, index) => (
          <Box width="33.33%" key={item.title}>
            <BondingCard
              title={item.title}
              value={
                item.value
                  ? `${new BigNumber(item.value).decimalPlaces(2).toString()}%`
                  : "0%"
              }
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default PoolCardList;
