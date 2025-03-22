import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import NobleButton from "./noble-button";
import NobleTokenAvatar from "./noble-token-avatar";
import { store } from "../../models/store";
import type { NobleSelectTokenButtonProps } from "./noble.types";

function NobleSelectTokenButton(props: NobleSelectTokenButtonProps) {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [theme, setTheme] = useState(() => "light");

  function buttonProps() {
    const { size, ...otherProps } = props;
    return otherProps;
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
    <NobleButton
      variant="outlined"
      size="xl"
      {...buttonProps()}
      borderless={props.borderless}
      isActive={props.isActive}
    >
      <Box display="flex" gap="$8" flex="1">
        <NobleTokenAvatar {...props.token} />
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          flex="1"
          alignItems="flex-start"
        >
          <Box display="flex" justifyContent="space-between" width="$full">
            <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
              {props.token.symbol}
            </Text>
            <Text as="span" color="$text" fontSize="$xl" fontWeight="$semibold">
              {props.token.tokenAmount}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between" width="$full">
            <Text
              as="span"
              color="$textSecondary"
              fontSize="$sm"
              fontWeight="$normal"
            >
              {props.token.network}
            </Text>
            <Text
              as="span"
              color="$textSecondary"
              fontSize="$sm"
              fontWeight="$normal"
            >
              {props.token.notionalValue}
            </Text>
          </Box>
        </Box>
      </Box>
    </NobleButton>
  );
}

export default NobleSelectTokenButton;
