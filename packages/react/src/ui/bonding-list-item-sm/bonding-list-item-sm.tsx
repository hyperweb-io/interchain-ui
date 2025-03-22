import * as React from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import { store } from "../../models/store";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";

function BondingListItemSm(props: BondingListItemSmProps) {
  function unbondDisabled() {
    return new BigNumber(props.bondedValue || 0).lte(0);
  }

  return (
    <Box
      px="$8"
      py="$10"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      minWidth={{
        tablet: "350px",
      }}
    >
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Box flexShrink="0">
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.title}
          </Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                marginRight: "$5",
              }}
            >
              APR
            </Text>
            <Text
              fontSize="$4xl"
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                marginRight: "$3",
              }}
            >
              {new BigNumber(props.totalApr || 0).decimalPlaces(2).toString()}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              %
            </Text>
          </Stack>
          <Button
            size="sm"
            intent="secondary"
            variant="outlined"
            disabled={unbondDisabled()}
            onClick={(event) => props?.onUnbond?.()}
            isLoading={props.isUnbondLoading}
          >
            Unbond
          </Button>
        </Box>
        <Stack
          direction="vertical"
          space="$0"
          attributes={{
            flexShrink: "0",
          }}
        >
          <Stack
            space="0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text
              fontWeight="$semibold"
              attributes={{
                marginRight: "$1",
              }}
            >
              $
            </Text>
            <Text fontWeight="$semibold" fontSize="$4xl">
              {store.getState().formatNumber({
                value: props.bondedValue,
              })}
            </Text>
          </Stack>
          <Stack
            space="$0"
            attributes={{
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text fontWeight="$semibold">{props.bondedShares}</Text>
            <Text>pool shares</Text>
          </Stack>
          <Button
            size="sm"
            intent="tertiary"
            onClick={(event) => props.onBond?.()}
            isLoading={props.isBondLoading}
          >
            Bond more
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default BondingListItemSm;
