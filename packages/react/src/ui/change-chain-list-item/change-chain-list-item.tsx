import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import ListItem from "../list-item";
import Text from "../text";
import Stack from "../stack";
import Avatar from "../avatar";
import { changeChainListItem } from "./change-chain-list-item.css";
import type { AvatarSize } from "../avatar/avatar.types";
import type { ChangeChainListItemProps } from "./change-chain-list-item.types";

function ChangeChainListItem(props: ChangeChainListItemProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  function avatarSize() {
    const sizeMap = {
      sm: "xs",
      md: "sm",
    };
    return sizeMap[props.size ?? "sm"] as AvatarSize;
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
    <ListItem
      isActive={props.isActive}
      size={props.size}
      attributes={props.attributes}
      itemRef={props.itemRef}
      className={clx(changeChainListItem, props.className)}
    >
      <Stack
        direction="horizontal"
        space="$4"
        attributes={{
          alignItems: "center",
        }}
      >
        <Avatar
          fallbackMode="bg"
          name={props.label}
          getInitials={name[0]}
          size={avatarSize()}
          src={props.iconUrl}
        />
        <Text fontSize="$lg" fontWeight="$normal" color="$text">
          {props.label}
        </Text>
      </Stack>
    </ListItem>
  );
}

export default ChangeChainListItem;
