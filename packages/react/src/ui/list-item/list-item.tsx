import * as React from "react";
import { useState, useRef, forwardRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import { listItemBase, listItemSizes } from "./list-item.css";
import type { ListItemProps } from "./list-item.types";
import type { ThemeVariant } from "../../models/system.model";

const ComboboxItem = forwardRef<any, ListItemProps>(function ComboboxItem(
  props: ListItemProps,
  itemRef
) {
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
    <div
      {...props.attributes}
      data-is-active={props.isActive}
      data-is-selected={props.isSelected}
      data-is-disabled={props.isDisabled}
      ref={itemRef}
      className={clx(listItemBase, listItemSizes[props.size], props.className)}
    >
      {props.children}
    </div>
  );
});

export default ComboboxItem;
