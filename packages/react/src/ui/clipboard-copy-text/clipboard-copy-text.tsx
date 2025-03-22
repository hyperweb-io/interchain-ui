import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import copy from "copy-to-clipboard";
import Icon from "../icon";
import {
  containerStyle,
  textStyle,
  iconStyle,
  truncateEndStyle,
} from "./clipboard-copy-text.css";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";
import { clipboardCopyTextOverrides } from "./clipboard-copy-text.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import type { ClipboardCopyTextProps } from "./clipboard-copy-text.types";
import Text from "../text";

function ClipboardCopyText(props: ClipboardCopyTextProps) {
  const cleanupRef = useRef<() => void>(null);
  const [idle, setIdle] = useState(() => true);

  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [overrideManager, setOverrideManager] = useState(() => null);

  function transform(text: string) {
    if (props.truncate === "middle") {
      const truncateLength = {
        lg: 14,
        md: 16,
        sm: 18,
      };
      return truncateTextMiddle(
        text,
        truncateLength[props.midTruncateLimit ?? "md"]
      );
    }
    return text;
  }

  function handleOnClick(event?: any) {
    const success = copy(props.text);
    if (success) {
      props.onCopied?.(event);
      setIdle(false);
      setTimeout(() => {
        setIdle(true);
      }, 1000);
    }
  }

  function getTruncateClass() {
    return clx(textStyle, props.truncate === "end" && truncateEndStyle);
  }

  useEffect(() => {
    setInternalTheme(store.getState().theme);
    setOverrideManager(store.getState().overrideStyleManager);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
      setOverrideManager(newState.overrideStyleManager);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <div
      onClick={(event) => handleOnClick(event)}
      style={overrideManager?.applyOverrides(clipboardCopyTextOverrides.name)}
      className={clx(containerStyle[internalTheme], props.className)}
    >
      <Text color="$textSecondary" className={getTruncateClass()}>
        {transform(props.text)}
      </Text>
      {idle ? (
        <Icon name="copy" size="$md" className={iconStyle.idle} />
      ) : (
        <>
          <Icon
            name="checkboxCircle"
            size="$md"
            className={iconStyle.copied[internalTheme]}
          />
        </>
      )}
    </div>
  );
}

export default ClipboardCopyText;
