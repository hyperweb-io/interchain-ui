import * as React from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import BondingListItemSm from "../bonding-list-item-sm";
import { BondingListSmProps } from "./bonding-list-sm.types";
import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";
import { store } from "../../models/store";

function BondingListSm(props: BondingListSmProps) {
  const {
    title = "Bond your liquidity",
    description = "Bond your tokens to earn additional OSMO rewards to the swap fees.",
    unbondedTitle = "Unbonded",
    unbondedSharesTitle = "pool shares",
  } = props;
  return (
    <Box width="$full">
      <Text fontSize="$xl" fontWeight="$semibold">
        {title}
      </Text>
      <Text attributes={{ marginTop: "$2" }}>{description}</Text>
      <Text
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{ marginTop: "$10" }}
      >
        {unbondedTitle}
      </Text>
      <Text fontSize="$4xl" fontWeight="$semibold" attributes={{ my: "$2" }}>
        {store
          .getState()
          .formatNumber({ value: props.unbondedBalance, style: "currency" })}
      </Text>
      <Stack space="$2" attributes={{ marginBottom: "$9" }}>
        <Text fontWeight="$semibold">
          {new BigNumber(props.unbondedShares).decimalPlaces(4).toString()}
        </Text>
        <Text>{unbondedSharesTitle}</Text>
      </Stack>
      <Stack space="$10" direction="vertical">
        {props.list?.map((item, index) => (
          <BondingListItemSm
            onBond={(event) => item?.onBond?.()}
            onUnbond={(event) => item?.onUnbond?.()}
            key={item.title}
            title={item.title}
            bondedValue={item.bondedValue}
            bondedShares={item.bondedShares}
            totalApr={item.totalApr}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default BondingListSm;
