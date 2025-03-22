import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import { store } from "../../models/store";
import { NoblePageTitleBarProps } from "./noble.types";
import NobleButton from "./noble-button";

function NoblePageTitleBar(props: NoblePageTitleBarProps) {
  const { showBackButton = true } = props;
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
    <Box
      display="flex"
      alignItems="center"
      gap="$8"
      mb={props.mb}
      mt={props.mt}
      mx={props.mx}
    >
      {showBackButton ? (
        <NobleButton
          variant="text"
          leftIcon="arrowRightRounded"
          iconSize="$sm"
          onClick={(event) => props.onBackButtonClick?.(event)}
          color={theme === "light" ? "$gray500" : "$gray600"}
          attributes={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme === "light" ? "$gray700" : "$blue300",
            borderRadius: "$base",
            bg: theme === "light" ? "$white" : "$blue200",
            width: "$12",
            height: "$12",
            transform: "rotate(180deg)",
          }}
        />
      ) : null}
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        lineHeight="1.4"
      >
        {props.title}
      </Text>
    </Box>
  );
}

export default NoblePageTitleBar;
