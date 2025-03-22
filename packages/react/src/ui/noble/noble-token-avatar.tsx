import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import { store } from "../../models/store";
import type { NobleTokenAvatarProps } from "./noble.types";

function NobleTokenAvatar(props: NobleTokenAvatarProps) {
  const { isRound = true } = props;
  const cleanupRef = useRef<(() => void) | null>(null);
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
    <Box
      position="relative"
      width="$15"
      height="$15"
      attributes={{ "data-part-id": "noble-token-avatar" }}
    >
      <Box
        as="img"
        width="$15"
        height="$15"
        borderRadius={isRound ? "$full" : undefined}
        attributes={{
          src: props.mainLogoUrl,
          alt: props.mainLogoAlt ?? "Token logo",
        }}
      />
      {props.isLoadingSubLogo ? (
        <Box
          width="$9"
          height="$9"
          position="absolute"
          bottom="-4px"
          right="-2px"
          borderRadius="$full"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="$cardBg"
          bg={theme === "light" ? "$gray800" : "$blue500"}
        />
      ) : (
        <>
          <Box
            as="img"
            width="$9"
            height="$9"
            position="absolute"
            bottom="-4px"
            right="-2px"
            borderRadius="$full"
            borderWidth="2px"
            borderStyle="solid"
            borderColor="$cardBg"
            bg="$cardBg"
            attributes={{
              src: props.subLogoUrl,
              alt: props.subLogoAlt ?? "Token logo",
            }}
          />
        </>
      )}
    </Box>
  );
}

export default NobleTokenAvatar;
