import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import NobleButton from "./noble-button";
import { store } from "../../models/store";
import type { NobleSelectNetworkButtonProps } from "./noble.types";

function NobleSelectNetworkButton(props: NobleSelectNetworkButtonProps) {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [theme, setTheme] = useState(() => "light");

  function buttonProps() {
    const { size, title, subTitle, actionLabel, logoUrl, ...otherProps } =
      props;
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
      {...buttonProps()}
      size={props.size ?? "xl"}
    >
      <Box display="flex" gap="$7" flex="1" alignItems="center" px="$4" py="$4">
        <Box
          as="img"
          width="26px"
          height="26px"
          borderRadius="$full"
          attributes={{
            src: props.logoUrl,
            alt: props.title,
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text color="$text" fontWeight="$semibold" fontSize="$sm">
            {props.title}
          </Text>
          <Text color="$textSecondary" fontWeight="$normal" fontSize="$2xs">
            {props.subTitle}
          </Text>
        </Box>
        <Box textAlign="right" flex={1}>
          <Text color="$inputBorderFocus" fontWeight="$medium" fontSize="$xs">
            {props.actionLabel}
          </Text>
        </Box>
      </Box>
    </NobleButton>
  );
}

export default NobleSelectNetworkButton;
