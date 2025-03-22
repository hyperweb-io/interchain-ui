import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import { NobleTxChainRouteProps } from "./noble.types";

function NobleTxChainRoute(props: NobleTxChainRouteProps) {
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
    <Box display="flex" alignItems="center" gap="5px" {...props.containerProps}>
      <Box
        as="img"
        width="$9"
        height="$9"
        attributes={{
          src: props.srcChainLogoUrl,
          alt: props.srcChainLogoAlt ?? "source chain logo",
        }}
      />
      <Icon name="arrowRightLine" color="$textSecondary" size="$xs" />
      <Box
        as="img"
        width="$9"
        height="$9"
        attributes={{
          src: props.destChainLogoUrl,
          alt: props.destChainLogoAlt ?? "dest chain logo",
        }}
      />
    </Box>
  );
}

export default NobleTxChainRoute;
