import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import ListItem from "../list-item";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import { store } from "../../models/store";
import * as styles from "./chain-list-item.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ChainListItemProps } from "./chain-list-item.types";

function ChainListItem(props: ChainListItemProps) {
  const { isActive = false, size = "sm" } = props;
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
    <ListItem
      itemRef={props.itemRef}
      isActive={isActive}
      isSelected={props.isSelected}
      size={size}
      attributes={props.attributes}
      className={clx(props.className, styles.listItem[theme])}
    >
      <Box
        height="$full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="horizontal"
          space="$6"
          attributes={{ alignItems: "center" }}
        >
          <img
            src={props.iconUrl}
            alt={props.tokenName}
            className={styles.chainLogoSizes[size]}
          />
          <Stack direction="vertical" space="$0">
            {size === "md" ? (
              <Text color="$text" fontWeight="$semibold" fontSize="$20">
                {props.tokenName}
              </Text>
            ) : null}
            {size === "md" ? (
              <Text color="$text" fontWeight="$normal" fontSize="$xs">
                {props.name}
              </Text>
            ) : null}
            {size === "sm" ? (
              <Text color="$text" fontWeight="$normal" fontSize="$sm">
                {props.name}
              </Text>
            ) : null}
          </Stack>
        </Stack>
        {props.amount !== null &&
        props.notionalValue !== null &&
        size !== "sm" ? (
          <Stack direction="vertical" space="$0">
            <Text
              color="$text"
              fontWeight="$semibold"
              fontSize="$20"
              textAlign="right"
            >
              {props.amount}
            </Text>
            <Text
              color="$text"
              fontWeight="$normal"
              fontSize="$xs"
              textAlign="right"
            >
              {props.notionalValue}
            </Text>
          </Stack>
        ) : null}
      </Box>
    </ListItem>
  );
}

export default ChainListItem;
