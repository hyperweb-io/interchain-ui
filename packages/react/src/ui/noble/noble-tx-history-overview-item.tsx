import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import { NobleTxHistoryOverviewItemProps, NobleTxStatus } from "./noble.types";

function NobleTxHistoryOverviewItem(props: NobleTxHistoryOverviewItemProps) {
  const {
    mainLogoSrc = "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
    amountUnit = "USDC",
    isExpanded = false,
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  function statusText() {
    const statusTextMap: Record<NobleTxStatus, string> = {
      processing: "Processing",
      successful: "Successful",
    };
    return props?.customStatus?.text ?? statusTextMap[props.status];
  }
  function statusColor() {
    const statusColorMap: Record<NobleTxStatus, string> = {
      processing: theme === "light" ? "$blue500" : "$blue700",
      successful: "$textSuccess",
    };
    return props?.customStatus?.color ?? statusColorMap[props.status];
  }
  function chevronColor() {
    return theme === "light" ? "$gray400" : "$blue500";
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
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
    >
      <Box display="flex" alignItems="center" gap="$9">
        <Box
          as="img"
          borderRadius="$full"
          width="$13"
          height="$13"
          attributes={{ src: mainLogoSrc, alt: "main logo" }}
        />
        <Box display="flex" alignItems="center" gap="5px">
          <Box
            as="img"
            borderRadius="$full"
            width="$9"
            height="$9"
            attributes={{
              src: props.sourceChainLogoSrc,
              alt: "from chain logo",
            }}
          />
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              as="path"
              fill="$blue700"
              attributes={{
                d: "M15.2156 4.91559L10.4101 0.241548C10.079 -0.0805161 9.54355 -0.0805161 9.22844 0.241548C8.89732 0.563613 8.89732 1.08441 9.22844 1.3909L12.6159 4.68572L1.33518 4.68572C0.878514 4.68572 0.5 5.05327 0.5 5.49805C0.5 5.94223 0.877883 6.31039 1.33518 6.31039L12.6005 6.31039L9.22844 9.6052C8.89732 9.92727 8.89732 10.4481 9.22844 10.7546C9.38599 10.9078 9.60632 11 9.82728 11C10.0476 11 10.2526 10.9234 10.4261 10.7546L15.2477 6.06489C15.4052 5.91164 15.5 5.69734 15.5 5.48242C15.468 5.28368 15.3731 5.06884 15.2156 4.91559Z",
              }}
            />
          </svg>
          <Box
            as="img"
            borderRadius="$full"
            width="$9"
            height="$9"
            attributes={{
              src: props.destinationChainLogoSrc,
              alt: "to chain logo",
            }}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="$9">
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Text
            color="$text"
            fontSize="$md"
            fontWeight="$semibold"
            lineHeight="1.4"
          >{`${props.amount} ${amountUnit}`}</Text>
          <Text fontSize="$sm" lineHeight="1.4" color={statusColor()}>
            {statusText()}
          </Text>
        </Box>
        <Icon
          name="arrowDropDown"
          size="$4xl"
          color={chevronColor()}
          attributes={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
        />
      </Box>
    </Box>
  );
}

export default NobleTxHistoryOverviewItem;
