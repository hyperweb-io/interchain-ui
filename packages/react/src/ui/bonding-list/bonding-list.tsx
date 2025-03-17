import * as React from "react";
import Stack from "../stack";
import Box from "../box";
import BondingListItem from "../bonding-list-item";
import { BondingListProps } from "./bonding-list.types";
import { BondingListItemProps } from "../bonding-list-item/bonding-list-item.types";

function BondingList(props: BondingListProps) {
  return (
    <Box position="relative" overflowX="auto">
      <Stack direction="vertical" space="$10">
        {props.list?.map((item, index) => (
          <BondingListItem
            key={item.title}
            title={item.title}
            totalApr={item.totalApr}
            amount={item.amount}
            superfluidApr={item.superfluidApr}
            onUnbond={(event) => item?.onUnbond?.()}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default BondingList;
