import * as React from "react";
import { useState, useRef } from "react";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import anime from "animejs";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import IconButton from "../icon-button";
import { store } from "../../models/store";
import * as styles from "./swap-price.css";
import type { SwapPriceProps, SwapPriceDetailRoute } from "./swap-price.types";
import type { AnimeInstance } from "animejs";

function SwapPrice(props: SwapPriceProps) {
  const {
    title = "Price",
    priceImpactLabel = "Price Impact",
    swapFeeLabel = "Swap Fee",
    expectedOutputLabel = "Expected Output",
    minimumReceivedLabel = "Minimum received after slippage",
    routeLabel = "Route",
  } = props;
  const priceRef = useRef(null);
  const animationRef = useRef<AnimeInstance | null>(null);
  const [isExpanded, setIsExpanded] = useState(() => false);
  function toggleExpand() {
    const curStatus = !isExpanded;
    setIsExpanded(curStatus);
    if (curStatus) {
      anime({
        targets: [priceRef.current],
        maxHeight: "1000px",
        easing: "easeInQuint",
        duration: 250,
      });
    } else {
      anime({
        targets: [priceRef.current],
        maxHeight: "0",
        easing: "easeOutQuint",
        duration: 250,
      });
    }
  }
  function routesPath() {
    let hasOsmo: boolean =
      props?.fromItem?.symbol === "OSMO" || props?.toItem?.symbol === "OSMO";
    const osmoImgSrc =
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png";
    const osmo = "OSMO";
    let path = [];
    if (hasOsmo) {
      path = [
        {
          swapFee: props?.swapFee?.percentage,
          baseLogo: props?.fromItem?.imgSrc,
          baseSymbol: props?.fromItem?.symbol,
          quoteLogo: props?.toItem?.imgSrc,
          quoteSymbol: props?.toItem?.symbol,
        },
      ];
    } else {
      path = [
        {
          swapFee: props?.swapFee?.percentage,
          baseLogo: props?.fromItem?.imgSrc,
          baseSymbol: props?.fromItem?.symbol,
          quoteLogo: osmoImgSrc,
          quoteSymbol: osmo,
        },
        {
          swapFee: props.swapFee.percentage,
          baseLogo: osmoImgSrc,
          baseSymbol: osmo,
          quoteLogo: props?.toItem?.imgSrc,
          quoteSymbol: props?.toItem?.symbol,
        },
      ];
    }
    return path;
  }
  return (
    <Box className={props.className}>
      <Stack
        attributes={{
          position: "relative",
          py: "$9",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className={styles.swapPriceContainer}
      >
        <Text color="$text" fontSize={{ mobile: "$xs", tablet: "$sm" }}>
          {title}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          rowGap="$0"
          columnGap="$9"
          paddingRight={{ mobile: "$14", mdMobile: "$19" }}
        >
          <Text
            fontWeight="$semibold"
            fontSize={{ mobile: "$xs", tablet: "$sm" }}
            attributes={{ flexShrink: "0" }}
          >{`1 ${props?.fromItem?.symbol} = ${new BigNumber(
            props?.fromItem?.priceDisplayAmount
          )
            .dividedBy(props?.toItem?.priceDisplayAmount)
            .decimalPlaces(6)
            .toString()} ${props?.toItem?.symbol}`}</Text>
          <Text
            color="$textSecondary"
            fontSize={{ mobile: "$xs", tablet: "$sm" }}
          >{`~ $${props?.fromItem?.priceDisplayAmount}`}</Text>
        </Box>
        <Box
          transform="translateY(-50%)"
          position={{ mobile: "absolute" }}
          top={{ mobile: "50%" }}
          right={{ mobile: "$0" }}
        >
          <IconButton
            size="sm"
            icon="arrowDownS"
            disabled={props.disabled}
            intent={isExpanded ? "tertiary" : "text"}
            onClick={(e) => toggleExpand()}
          />
        </Box>
      </Stack>
      <div ref={priceRef} className={styles.priceContainer}>
        <Stack direction="vertical" attributes={{ paddingBottom: "$14" }}>
          <Stack
            attributes={{
              marginBottom: "$7",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">{priceImpactLabel}</Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {props.priceImpact}
            </Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$10",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">
              {swapFeeLabel} ({props?.swapFee?.percentage})
            </Text>
            <Text
              color="$textSecondary"
              fontWeight="$bold"
            >{`~ ${props?.swapFee?.value}`}</Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$7",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">{expectedOutputLabel}</Text>
            <Text color="$textSecondary" fontWeight="$bold">{`~ ${store
              .getState()
              .formatNumber({ value: props.toAmount })} ${
              props?.toItem?.symbol
            }`}</Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$10",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">{minimumReceivedLabel}</Text>
            <Text color="$textSecondary" fontWeight="$bold">{`${
              props?.minimumReceived ?? 0
            } ${props?.toItem?.symbol}`}</Text>
          </Stack>
          {props?.hasRoute ? (
            <>
              <Text color="$textSecondary" attributes={{ py: "$10" }}>
                {routeLabel}
              </Text>
              <Stack
                attributes={{
                  height: "$12",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box marginRight="$6">
                  <img
                    alt={props?.fromItem?.symbol}
                    src={props?.fromItem?.imgSrc}
                    className={styles.img}
                  />
                </Box>
                <Box className={styles.routeDivider} />
                {routesPath()?.map((item, index) => (
                  <>
                    <Box
                      width="$16"
                      height="$12"
                      marginLeft="$6"
                      marginRight="$5"
                      position="relative"
                    >
                      <img
                        alt={item?.baseSymbol}
                        src={item?.baseLogo}
                        className={styles.img}
                      />
                      <img
                        alt={item?.quoteSymbol}
                        src={item?.quoteLogo}
                        className={clsx(styles.img, styles.absImg)}
                      />
                    </Box>
                    <Text
                      color="$textSecondary"
                      fontWeight="$bold"
                      attributes={{ marginRight: "$5" }}
                    >
                      {item?.swapFee}
                    </Text>
                    <Box className={styles.routeDivider} />
                  </>
                ))}
                <Box marginLeft="$6">
                  <img
                    alt={props?.toItem?.symbol}
                    src={props?.toItem?.imgSrc}
                    className={styles.img}
                  />
                </Box>
              </Stack>
            </>
          ) : null}
        </Stack>
      </div>
    </Box>
  );
}
export default SwapPrice;
