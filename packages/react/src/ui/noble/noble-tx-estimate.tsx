import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import NobleTxChainRoute from "./noble-tx-chain-route";
import { store } from "../../models/store";
import { NobleTxEstimateProps } from "./noble.types";

function NobleTxEstimate(props: NobleTxEstimateProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState, prevState) => {
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
      justifyContent="space-between"
      alignItems="center"
      gap="5px"
      {...props.containerProps}
    >
      <Box display="flex" alignItems="center" gap="$4">
        <NobleTxChainRoute
          srcChainLogoUrl={props.srcChainLogoUrl}
          srcChainLogoAlt={props.srcChainLogoAlt}
          destChainLogoUrl={props.destChainLogoUrl}
          destChainLogoAlt={props.destChainLogoAlt}
        />
        <Box display="flex" gap="$3" alignItems="center">
          <Icon name="timeLine" color="$textSecondary" size="$8" />
          <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
            {props.timeEstimateLabel}
          </Text>
        </Box>
      </Box>
      <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
        {props.feeEstimateLabel}
      </Text>
    </Box>
  );
}

export default NobleTxEstimate;
