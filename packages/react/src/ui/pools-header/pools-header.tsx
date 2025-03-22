import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pools-header.css";
import { standardTransitionProperties } from "../shared/shared.css";
import type { PoolsHeaderProps } from "./pools-header.types";
import type { ThemeVariant } from "../../models/system.model";

function PoolsHeader(props: PoolsHeaderProps) {
  const { title = "Liquidity Pools" } = props;
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
    <Box {...props.attributes} className={props.className}>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {title}
      </Text>
      <Box
        gap="$10"
        display="grid"
        gridTemplateAreas={{
          mobile: `
            "a"
            "b"
            "c"
          `,
          mdMobile: `
            "a b"
            "c c"
          `,
          tablet: `
            "a b c"
          `,
        }}
        gridTemplateColumns={{
          mobile: "1fr",
          mdMobile: "repeat(auto-fill, minmax(180px, 1fr))",
          tablet: "repeat(3, 1fr)",
        }}
        className={standardTransitionProperties}
      >
        <Box gridArea="a" className={styles.baseBox}>
          <Stack attributes={{ overflow: "hidden", alignItems: "center" }}>
            <img
              src={props.tokenData.iconUrl}
              alt={props.tokenData.title}
              className={styles.image}
            />
            <Box lineHeight="$shorter">
              <Text
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize="$sm"
                className={styles.mb3}
              >
                {props.tokenData.title}
              </Text>
              <Stack space="$0" attributes={{ alignItems: "flex-end" }}>
                <Text
                  color="$text"
                  fontWeight="$semibold"
                  lineHeight="$shorter"
                  className={styles.dollar}
                >
                  $
                </Text>
                <Text
                  color="$text"
                  fontWeight="$semibold"
                  fontSize={{ mobile: "$2xl", tablet: "$4xl", desktop: "$4xl" }}
                >
                  {store
                    .getState()
                    ?.formatNumber?.({ value: props.tokenData.price })}
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box gridArea="b" className={styles.baseBox}>
          <Stack
            space="$0"
            direction="vertical"
            attributes={{ justifyContent: "center", flexWrap: "nowrap" }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              {props.rewardCountdownData.title}
            </Text>
            <Text
              color="$text"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize={{ mobile: "$2xl", tablet: "$4xl", desktop: "$4xl" }}
            >
              {props.rewardCountdownData.hours}
              <Text
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize={{ mobile: "$2xl", tablet: "$4xl", desktop: "$4xl" }}
                className={styles.semocolon}
              >
                :
              </Text>
              {props.rewardCountdownData.minutes}
              <Text
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize={{ mobile: "$2xl", tablet: "$4xl", desktop: "$4xl" }}
                className={styles.semocolon}
              >
                :
              </Text>
              {props.rewardCountdownData.seconds}
            </Text>
          </Stack>
        </Box>
        <Box gridArea="c" className={styles.rewardBox}>
          <Stack
            direction="vertical"
            space="$0"
            attributes={{ justifyContent: "center" }}
          >
            <Text
              color="$rewardContent"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              {props.rewardData.title}
            </Text>
            <Stack space="$0" attributes={{ alignItems: "flex-end" }}>
              <Text
                color="$rewardContent"
                fontSize="$4xl"
                fontWeight="$semibold"
              >
                {props.rewardData.rewardAmount}
              </Text>
              <Text
                color="$rewardContent"
                fontWeight="$semibold"
                className={styles.osom}
              >
                {props.rewardData.rewardTokenName}
              </Text>
              <Text color="$rewardContent" className={styles.mb3}>
                $
                {store
                  .getState()
                  .formatNumber({
                    value: props.rewardData.rewardNotionalValue,
                  })}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
export default PoolsHeader;
