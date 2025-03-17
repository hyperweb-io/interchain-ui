import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import Box from "../box";
import AvatarImage from "../avatar-image";
import { store } from "../../models/store";
import { avatarSize } from "./avatar.helper";
import { avatarSizeVar, avatar } from "./avatar.css";
import type { AvatarProps } from "./avatar.types";

function Avatar(props: AvatarProps) {
  const { size = "md", rounded = true, fallbackMode = "initials" } = props;
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  const [isLoaded, setIsLoaded] = useState(() => false);
  const [sizeValue, setSizeValue] = useState(() => avatarSize(size));
  function cssVars() {
    return assignInlineVars({ [avatarSizeVar]: sizeValue });
  }
  useEffect(() => {
    setInternalTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    setSizeValue(avatarSize(size));
  }, [size]);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      as="span"
      display="inline-flex"
      borderWidth={props.showBorder ? "$sm" : undefined}
      borderColor={props.borderColor}
      borderRadius={rounded ? "$full" : "none"}
      backgroundColor={props.backgroundColor}
      attributes={props.attributes}
      className={props.className}
    >
      <span
        data-loaded={isLoaded}
        data-custom-bg={!!props.backgroundColor}
        style={cssVars()}
        className={avatar[internalTheme]}
      >
        <AvatarImage
          src={props.src}
          srcSet={props.srcSet}
          loading={props.loading}
          fallbackMode={fallbackMode}
          onLoad={(event) => {
            props.onLoad?.(event);
            setIsLoaded(true);
          }}
          width={sizeValue}
          height={sizeValue}
          onError={(event) => props.onError}
          getInitials={props.getInitials}
          name={props.name}
          borderRadius={props.borderRadius}
          ignoreFallback={props.ignoreFallback}
          crossOrigin={props.crossOrigin}
          referrerPolicy={props.referrerPolicy}
        />
        {props.children}
      </span>
    </Box>
  );
}

export default Avatar;
