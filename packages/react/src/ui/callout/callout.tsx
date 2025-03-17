import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import { getIntentColors } from "./callout.helpers";
import type { CalloutProps } from "./callout.types";

function Callout(props: CalloutProps) {
  const { intent = "none" } = props;
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  function colorsProperties() {
    return getIntentColors(intent, internalTheme as ThemeVariant);
  }
  function isValidIconName() {
    return ALL_ICON_NAMES.includes(props.iconName);
  }
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
      borderRadius="$md"
      p="$6"
      {...colorsProperties()}
      {...props.attributes}
      className={props.className}
    >
      <Box display="flex" gap="$6" flexDirection="column">
        <Box display="flex" flexWrap="nowrap" gap="$5">
          {!!props.iconName && isValidIconName() ? (
            <Icon size="$3xl" color="inherit" name={props.iconName} />
          ) : null}
          {!props.iconName && !isValidIconName() && props.iconRender ? (
            <>{props.iconRender}</>
          ) : null}
          <Text as="h5" fontSize="$md" fontWeight="$semibold" color="inherit">
            {props.title}
          </Text>
        </Box>
        <Text as="div" fontSize="$sm" fontWeight="$normal" color="inherit">
          {props.children}
        </Text>
      </Box>
    </Box>
  );
}

export default Callout;
