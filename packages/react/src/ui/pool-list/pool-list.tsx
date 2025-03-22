import * as React from "react";
import { useState } from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import PoolListItem from "../pool-list-item";
import * as styles from "./pool-list.css";
import type { PoolListProps } from "./pool-list.types";

function PoolList(props: PoolListProps) {
  const [titles, setTitles] = useState(() => [
    "Pool",
    "Liquidity",
    "24H Volume",
    "7D Fees",
    "APR",
  ]);

  return (
    <Box p="$6" className={styles.container}>
      <Text color="$textSecondary" fontSize="$xl" fontWeight="$semibold">
        {props.title}
      </Text>
      <Stack space="$0" className={styles.titleContainer}>
        {titles?.map((item, index) => (
          <Text color="$textSecondary" key={index} className={styles.title}>
            {item}
          </Text>
        ))}
      </Stack>
      <Box overflowX="auto">
        {props.list?.map((item, index) => (
          <PoolListItem
            key={item.id}
            id={item?.id}
            poolAssets={item.poolAssets}
            liquidity={item.liquidity}
            apr={item.apr}
            fees7D={item.fees7D}
            volume24H={item.volume24H}
            onClick={(event) => item.onClick()}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PoolList;
