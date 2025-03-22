import * as React from "react";
import { useState } from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import ProgressBar from "../progress-bar";
import { store } from "../../models/store";
import * as styles from "./remove-liquidity.css";
import type { RemoveLiquidityProps } from "./remove-liquidity.types";

function RemoveLiquidity(props: RemoveLiquidityProps) {
  const [progress, setProgress] = useState(() => 50);

  function handeProgressClick(value: number) {
    setProgress(value);
    props?.onChange(value);
  }

  function removedBalance() {
    return new BigNumber(progress)
      .dividedBy(100)
      .multipliedBy(props.unbondedBalance)
      .decimalPlaces(6)
      .toString();
  }

  function removedShares() {
    return new BigNumber(progress)
      .dividedBy(100)
      .multipliedBy(props.unbondedShares)
      .decimalPlaces(6)
      .toString();
  }

  function removedAmount0() {
    return new BigNumber(progress)
      .dividedBy(100)
      .multipliedBy(props.myLiquidityCoins[0]?.displayAmount || 0)
      .decimalPlaces(6)
      .toString();
  }

  function removedAmount1() {
    return new BigNumber(progress)
      .dividedBy(100)
      .multipliedBy(props.myLiquidityCoins[1]?.displayAmount || 0)
      .decimalPlaces(6)
      .toString();
  }

  return (
    <Box className={styles.container}>
      <Stack direction="vertical">
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[0]?.symbol}
          </Text>
          <Text
            color="$textSecondary"
            attributes={{
              px: "$3",
            }}
          >
            /
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[1]?.symbol}
          </Text>
        </Stack>
      </Stack>
      <Stack
        attributes={{
          marginTop: "$9",
          marginBottom: "$5",
          alignItems: "baseline",
          justifyContent: "center",
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
        <Text fontSize="$7xl" fontWeight="$semibold">
          {store.getState().formatNumber({
            value: removedBalance() || 0,
          })}
        </Text>
      </Stack>
      <Stack
        attributes={{
          marginBottom: "$10",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          attributes={{
            marginRight: "$3",
          }}
        >
          {removedBalance()}
        </Text>
        <Text>pool shares</Text>
      </Stack>
      <Stack
        space="$13"
        attributes={{
          marginBottom: "$11",
          justifyContent: "center",
        }}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img
            src={props?.myLiquidityCoins[0]?.imgSrc}
            className={styles.img}
          />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              mx: "$4",
            }}
          >
            {removedAmount0()}
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[0]?.symbol}
          </Text>
        </Stack>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img
            src={props?.myLiquidityCoins[1]?.imgSrc}
            className={styles.img}
          />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              mx: "$4",
            }}
          >
            {removedAmount1()}
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[1]?.symbol}
          </Text>
        </Stack>
      </Stack>
      <ProgressBar
        progress={progress}
        onProgressChange={(v) => handeProgressClick(v)}
      />
      <Stack
        space="$8"
        attributes={{
          marginTop: "$12",
          justifyContent: "center",
        }}
      >
        {[25, 50, 75, 100]?.map((value, index) => (
          <Button
            size="xs"
            intent="text"
            onClick={(event) => handeProgressClick(value)}
          >
            {value}%
          </Button>
        ))}
      </Stack>
      <Box height="$18" />
      <Button
        size="lg"
        intent="tertiary"
        fluidWidth
        onClick={(event) => props.onRemoveLiquidity()}
        isLoading={props.isLoading}
      >
        Remove Liquidity
      </Button>
    </Box>
  );
}

export default RemoveLiquidity;
