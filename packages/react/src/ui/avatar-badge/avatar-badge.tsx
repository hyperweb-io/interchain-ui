import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Box from "../box";
import { store } from "../../models/store";
import { avatarBadge, avatarBadgePlacement } from "../avatar/avatar.css";
import type { AvatarBadgeProps } from "../avatar/avatar.types";

function AvatarBadge(props: AvatarBadgeProps) {
  const {
    placement = "bottom-right",
    size = "1.25em",
    borderWidth = "0.2em",
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  useEffect(() => {
    setInternalTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState, prevState) => {
      setInternalTheme(newState.theme);
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
      position="absolute"
      alignItems="center"
      justifyContent="center"
      borderRadius="$full"
      boxRef={props.boxRef}
      borderWidth={borderWidth}
      {...props.attributes}
      width={size}
      height={size}
      className={clx(
        avatarBadge[internalTheme],
        avatarBadgePlacement[placement],
        props.className
      )}
    >
      {props.children}
    </Box>
  );
}

export default AvatarBadge;
