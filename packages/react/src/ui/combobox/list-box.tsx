import * as React from "react";
import clx from "clsx";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { ListState } from "react-stately";
import type { Node } from "@react-types/shared";

import { useListBox, useListBoxSection, useOption } from "react-aria";
import Text from "@/ui/text";
import Box from "@/ui/box";
import type { BoxProps } from "@/ui/box/box.types";

import ListItem from "@/ui/list-item";
import useTheme from "@/ui/hooks/use-theme";
import { listboxStyle } from "./combobox.css";
import { ComboboxContext } from "./combobox.context";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
  styleProps?: BoxProps;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  const { theme } = useTheme();

  return (
    <Box
      as="ul"
      attributes={listBoxProps}
      ref={listBoxRef}
      width="$full"
      overflow="auto"
      outline="none"
      padding="$0"
      {...props.styleProps}
      marginTop="$5"
      className={clx(listboxStyle[theme], props.styleProps.className)}
    >
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        ),
      )}
    </Box>
  );
}

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <Box as="li" attributes={itemProps} paddingTop="$4">
        {section.rendered && (
          <Text
            as="span"
            domAttributes={headingProps}
            fontSize="$xs"
            fontWeight="$bold"
            textTransform="uppercase"
          >
            {section.rendered}
          </Text>
        )}

        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </Box>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );
  const comboboxContext = React.useContext(ComboboxContext);

  return (
    <li ref={ref} {...optionProps}>
      <ListItem
        size={comboboxContext.size}
        isSelected={isSelected}
        isActive={isFocused}
        isDisabled={isDisabled}
      >
        {item.rendered}
      </ListItem>
    </li>
  );
}
