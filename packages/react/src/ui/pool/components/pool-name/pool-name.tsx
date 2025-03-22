import * as React from "react";
import Stack from "../../../stack";
import Box from "../../../box";
import Text from "../../../text";
import type { PoolNameProps } from "./pool-name.types";
import * as styles from "./pool-name.css";

function PoolName(props: PoolNameProps) {
  return (
    <Stack
      space="$0"
      attributes={{
        alignItems: "center",
      }}
      className={props.className}
    >
      <Box className={styles.imageBox}>
        <img src={props?.coins[0]?.imgSrc} className={styles.image1} />
        <img src={props?.coins[1]?.imgSrc} className={styles.image2} />
      </Box>
      <Stack
        direction="vertical"
        space="$0"
        attributes={{
          justifyContent: "center",
          paddingLeft: "$8",
        }}
        className={styles.nameContainer}
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          attributes={{
            marginBottom: "$2",
          }}
        >{`${props.coins[0]?.symbol} / ${props.coins[1].symbol}`}</Text>
        <Text color="$textSecondary">Pool #{props.id}</Text>
      </Stack>
    </Stack>
  );
}

export default PoolName;
