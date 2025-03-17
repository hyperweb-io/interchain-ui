import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import NobleButton from "./noble-button";
import { store } from "../../models/store";
import * as styles from "./noble.css";
import type { NobleSelectWalletButtonProps } from "./noble.types";

function NobleSelectWalletButton(props: NobleSelectWalletButtonProps) {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [theme, setTheme] = useState(() => "light");

  function buttonProps() {
    const { logoUrl, logoAlt, title, subTitle, ...otherProps } = props;
    return otherProps;
  }

  function textColor() {
    return props.disabled ? "inherit" : "$text";
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
      width="168px"
      height="152px"
      {...buttonProps()}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap="$4">
        <Box
          attributes={{
            "data-disabled": !!props.disabled,
          }}
          className={styles.walletImgContainer}
        >
          <Box
            as="img"
            width="42px"
            height="42px"
            attributes={{
              src: props.logoUrl,
              alt: props.logoAlt,
            }}
            className={styles.walletImg}
          />
        </Box>
        <Text fontSize="$md" fontWeight="$semibold" color={textColor()}>
          {props.title}
        </Text>
        <Text fontSize="$xs" fontWeight="$medium" color={textColor()}>
          {props.subTitle}
        </Text>
      </Box>
    </NobleButton>
  );
}

export default NobleSelectWalletButton;
