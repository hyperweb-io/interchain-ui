import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import * as styles from "./pool-card.css";
import type { PoolCardProps } from "./pool-card.types";
import type { ThemeVariant } from "../../models/system.model";

function PoolCard(props: PoolCardProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

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
    <Box
      attributes={{
        onClick: () => props?.onClick?.(),
      }}
      className={clsx(styles.container, {
        [styles.hoverStyle]: !!props.onClick,
      })}
    >
      <Box marginBottom="$13">
        <PoolName id={props.id} coins={props.poolAssets} />
      </Box>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$text">APR</Text>
        <Text
          color="$text"
          fontSize="$2xl"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          {new BigNumber(props.apr).decimalPlaces(2).toString()}%
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$textSecondary">Liquidity</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          $
          {store.getState().formatNumber({
            value: props.liquidity,
          })}
        </Text>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="$textSecondary">7D Fees</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          $
          {store.getState().formatNumber({
            value: props.fees7D,
          })}
        </Text>
      </Stack>
      <Box
        width="$full"
        height="$1"
        my="$6"
        className={styles.divider[theme]}
      />
      {!!props.myLiquidity ? (
        <Stack
          space="$0"
          attributes={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "$6",
          }}
        >
          <Text color="$text">Your Liquidity</Text>
          <Text color="$text" fontWeight="$semibold">
            $
            {store.getState().formatNumber({
              value: props.myLiquidity,
            })}
          </Text>
        </Stack>
      ) : null}
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$text">Bonded</Text>
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          $
          {store.getState().formatNumber({
            value: props.unbondedBalance,
          })}
        </Text>
      </Stack>
    </Box>
  );
}

export default PoolCard;
