import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pool-info-header.css";
import { PoolInfoHeaderProps } from "./pool-info-header.types";

function PoolsHeader(props: PoolInfoHeaderProps) {
  return (
    <Box className={styles.poolInfoHeader}>
      <Stack direction="vertical" space="$0">
        <Text
          color="$textSecondary"
          attributes={{
            marginTop: "$3",
            marginBottom: "$13",
          }}
        >
          Pool #{props.id}
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box className={styles.imageBox}>
          <img src={props.coins[0]?.imgSrc} className={styles.image1} />
          <img src={props.coins[1]?.imgSrc} className={styles.image2} />
        </Box>
        <Stack space="$0" direction="vertical" className={styles.longText}>
          <Text color="$textSecondary">Pool liquidity</Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text
              attributes={{
                marginRight: "$1",
              }}
            >
              $
            </Text>
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store.getState()?.formatNumber?.({
                value: props.liquidity,
              })}
            </Text>
          </Stack>
        </Stack>
        <Box width="$full" height="$8" className={styles.onlysm} />
        <Stack direction="vertical" space="$0" className={styles.shortText}>
          <Text color="$textSecondary">Swap fee</Text>
          <Stack
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text fontSize="$4xl" fontWeight="$semibold">
              {props.swapFee}
            </Text>
            <Text>%</Text>
          </Stack>
        </Stack>
        <Stack direction="vertical" space="$0" className={styles.longText}>
          <Text color="$textSecondary">24h trading volume</Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text
              attributes={{
                marginRight: "$1",
              }}
            >
              $
            </Text>
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store.getState()?.formatNumber?.({
                value: props.volume24H,
              })}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PoolsHeader;
