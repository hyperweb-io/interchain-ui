import * as React from "react";
import { useState, useRef, useEffect } from "react";
import BigNumber from "bignumber.js";
import Box from "../box";
import Stack from "../stack";
import Button from "../button";
import Text from "../text";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import * as styles from "./manage-liquidity-card.css";
import { ManageLiquidityCardProps } from "./manage-liquidity-card.types";

function ManageLiquidityCard(props: ManageLiquidityCardProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  function hasTotalShares() {
    return new BigNumber(props.totalShares || 0).gt(0);
  }

  function hasLPTokenShares() {
    return new BigNumber(props.lpTokenShares || 0).gt(0);
  }

  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <Stack
      space="$0"
      attributes={{
        px: "$10",
        py: "$9",
        borderRadius: "$lg",
        ...props.attributes,
      }}
      className={styles.container}
    >
      <Box
        width="100%"
        maxWidth={{
          mobile: "100%",
          tablet: "330px",
        }}
        flexGrow={{
          mobile: "1",
          tablet: "0",
          desktop: "0",
        }}
        flexBasis={{
          mobile: "100%",
          tablet: "50%",
          desktop: "50%",
        }}
      >
        <Text color="$textSecondary" fontWeight="$semibold">
          Your pool balance
        </Text>
        <Box
          display="flex"
          gap="$12"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Stack
            direction="horizontal"
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-start",
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
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store.getState().formatNumber({
                value: props.totalBalance || 0,
              })}
            </Text>
          </Stack>
          <Stack
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={props.totalBalanceCoins[0]?.imgSrc}
              className={styles.image}
            />
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                px: "$4",
              }}
            >
              {new BigNumber(props.totalBalanceCoins[0]?.displayAmount || 0)
                .decimalPlaces(4)
                .toString()}
            </Text>
            <Text color="$textSecondary">
              {props.totalBalanceCoins[0]?.symbol}
            </Text>
          </Stack>
        </Box>
        <Box
          display="flex"
          gap="$12"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Box flex="0 0 calc(50% - 20px)" justifyContent="flex-start">
            {hasTotalShares() ? (
              <Text>{`${new BigNumber(props.totalShares)
                .decimalPlaces(6)
                .toString()} pool shares`}</Text>
            ) : null}
            {!hasTotalShares() ? <Text>No pool shares yet</Text> : null}
          </Box>
          <Stack
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={props.totalBalanceCoins[1]?.imgSrc}
              className={styles.image}
            />
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                px: "$4",
              }}
            >
              {new BigNumber(props.totalBalanceCoins[1]?.displayAmount || 0)
                .decimalPlaces(4)
                .toString()}
            </Text>
            <Text color="$textSecondary">
              {props.totalBalanceCoins[1]?.symbol}
            </Text>
          </Stack>
        </Box>
        <Box
          display="flex"
          gap="$8"
          justifyContent="space-between"
          alignItems="baseline"
          paddingTop="$11"
          flexWrap={{
            mobile: "wrap",
            tablet: "nowrap",
            desktop: "nowrap",
          }}
        >
          <Box
            justifyContent="flex-start"
            flex={{
              mobile: "0 0 calc(50% - 20px)",
              desktop: "auto",
            }}
          >
            <Button
              intent="tertiary"
              fluidWidth
              onClick={(event) => {
                props?.onAdd?.();
              }}
            >
              Add Liquidity
            </Button>
          </Box>
          <Box
            justifyContent="flex-end"
            flex={{
              mobile: "0 0 calc(50% - 20px)",
              desktop: "auto",
            }}
          >
            <Button
              intent="tertiary"
              fluidWidth
              onClick={(event) => {
                props?.onRemove?.();
              }}
            >
              Remove Liquidity
            </Button>
          </Box>
        </Box>
      </Box>
      <Stack
        direction="vertical"
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
        className={styles.tokenContainer}
      >
        <Text color="$textSecondary" fontWeight="$semibold">
          Available LP Tokens
        </Text>
        <Stack
          space="$0"
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
          <Text fontSize="$4xl" fontWeight="$semibold">
            {store.getState().formatNumber({
              value: props.lpTokenBalance || 0,
            })}
          </Text>
        </Stack>
        {hasLPTokenShares() ? (
          <Text>{`${new BigNumber(props.lpTokenShares)
            .decimalPlaces(6)
            .toString()} pool shares`}</Text>
        ) : null}
        {!hasLPTokenShares() ? <Text>No pool shares yet</Text> : null}
        <Box pt="$10" width="100%">
          <Button
            intent="secondary"
            variant="outlined"
            fluidWidth
            onClick={(event) => props?.onStartEarning()}
            isLoading={props.isEarningLoading}
          >
            Start earning
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

export default ManageLiquidityCard;
