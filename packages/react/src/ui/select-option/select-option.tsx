import * as React from "react";
import clx from "clsx";
import { useListItem } from "@floating-ui/react";
import ListItem from "@/ui/list-item";
import { baseButton } from "@/ui/button/button.css";
import { SelectContext } from "../select/select.context";

export interface SelectOptionProps {
  optionKey: string;
  label: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function SelectOption(props: SelectOptionProps) {
  const { activeIndex, selectedItem, getItemProps, handleSelect } =
    React.useContext(SelectContext);

  const { ref, index } = useListItem({ label: props.label });

  const selectedIndex = selectedItem?.index ?? null;
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      data-select-key={props.optionKey}
      data-select-label={props.label}
      disabled={props.isDisabled}
      tabIndex={isActive ? 0 : -1}
      className={clx(baseButton, props.className)}
      style={{
        padding: 0,
        display: "block",
        background: "transparent",
        textAlign: "left",
        fontWeight: "normal",
      }}
      {...getItemProps({
        onClick: () =>
          handleSelect({
            key: props.optionKey,
            label: props.label,
            index,
          }),
      })}
    >
      <ListItem isDisabled={props.isDisabled} isActive={isActive}>
        {props.children ?? props.label}
      </ListItem>
    </button>
  );
}
