import * as React from "react";
import Stack from "../stack";
import BigNumber from "bignumber.js";
import Button from "../button";
import Text from "../text";
import Box from "../box";
import { store } from "../../models/store";
import * as styles from "./bonding-list-item.css";
import { BondingListItemProps } from "./bonding-list-item.types";

function BondingListItem(props: BondingListItemProps) {
  return (
    <Box display="grid" gridTemplateColumns="repeat(5, minmax(100px, 1fr))">
      <Text
        color="$textSecondary"
        fontWeight="$semibold"
        className={styles.textItem}
      >
        {props.title}
      </Text>
      <Text
        color="$textSecondary"
        fontSize="$xs"
        className={styles.numericItem}
      >
        {new BigNumber(props.totalApr || 0).decimalPlaces(2).toString()}%
      </Text>
      <Text
        color="$textSecondary"
        fontSize="$xs"
        className={styles.numericItem}
      >
        $
        {store.getState().formatNumber({
          value: props.amount || 0,
        })}
      </Text>
      <Text
        color="$textSecondary"
        fontSize="$xs"
        className={styles.numericItem}
      >
        {new BigNumber(props.superfluidApr || 0).decimalPlaces(2).toString()}%
      </Text>
      <Stack
        attributes={{
          width: "$25",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="xs"
          variant="unstyled"
          onClick={(event) => props.onUnbond?.(event)}
          isLoading={props.isLoading}
        >
          Unbond All
        </Button>
      </Stack>
    </Box>
  );
}

export default BondingListItem;
