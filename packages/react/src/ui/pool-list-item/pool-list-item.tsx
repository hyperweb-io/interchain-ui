import * as React from "react";
import { useState, useRef, useEffect } from "react";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import APR from "./apr";
import CellWithTitle from "./cell-with-title";
import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";
import { standardTransitionProperties } from "../shared/shared.css";
import type { PoolListItemProps } from "./pool-list-item.types";
import type { ThemeVariant } from "../../models/system.model";

function PoolListItem(props: PoolListItemProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  function apr() {
    return new BigNumber(props?.apr || 0).decimalPlaces(2).toString();
  }

  function isInteractive() {
    return !!props.onClick && typeof props.onClick === "function";
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
    <Box
      alignItems="center"
      attributes={{
        onClick: () => props?.onClick?.(),
      }}
      className={clsx(styles.container, standardTransitionProperties, {
        [styles.hoverStyle]: !!props.onClick,
      })}
    >
      <PoolName
        id={props.id}
        coins={props.poolAssets}
        className={styles.nameContainer}
      />
      <Box className={clsx(styles.responsiveText, styles.onlySm)}>
        <APR
          title="APR"
          apr={apr()}
          innerClassName={styles.iconContainer[theme]}
          className={styles.onlySm}
        />
      </Box>
      <Box width="$full" height="$9" className={styles.onlySm} />
      <CellWithTitle
        title="Liquidity"
        innerClassName={styles.onlySm}
        className={styles.responsiveText}
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store.getState().formatNumber({
            value: props?.liquidity,
            style: "currency",
          })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        title="24H Volume"
        innerClassName={styles.onlySm}
        className={styles.responsiveText}
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store.getState().formatNumber({
            value: props?.volume24H,
            style: "currency",
          })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        title="7D Fees"
        innerClassName={styles.onlySm}
        className={styles.responsiveText}
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store.getState().formatNumber({
            value: props?.fees7D,
            style: "currency",
          })}
        </Text>
      </CellWithTitle>
      <APR
        apr={apr()}
        innerClassName={styles.iconContainer[theme]}
        className={clsx(styles.responsiveText, styles.lgAPR)}
      />
      <Box width="$full" height="$4" className={styles.onlySm} />
    </Box>
  );
}

export default PoolListItem;
