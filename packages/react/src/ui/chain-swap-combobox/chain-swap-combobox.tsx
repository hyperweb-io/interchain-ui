import * as React from "react";
import clx from "clsx";
import {
  autoUpdate,
  size,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from "@floating-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";

import Box from "@/ui/box";
import ChainSwapInput from "@/ui/chain-swap-input";
import ChainListItem from "@/ui/chain-list-item";

import * as styles from "./chain-swap-combobox.css";
import type { ChainListItemProps } from "@/ui/chain-list-item/chain-list-item.types";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";
import { overlays } from "@/ui/overlays-manager/overlays";
import useTheme from "@/ui/hooks/use-theme";
import { getOwnerDocument } from "@/helpers/platform";
import { themeVars } from "@/styles/themes.css";

interface ItemProps {
  isActive: boolean;
  isSelected: boolean;
  size: ChainListItemProps["size"];
  // ====
  iconUrl?: ChainListItemProps["iconUrl"];
  name: ChainListItemProps["name"];
  tokenName: ChainListItemProps["tokenName"];
  amount?: ChainListItemProps["amount"];
  notionalValue?: ChainListItemProps["notionalValue"];
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const {
    isActive,
    size,
    iconUrl,
    name,
    tokenName,
    amount,
    notionalValue,
    isSelected,
  } = props;
  return (
    <ChainListItem
      isActive={isActive}
      size={size}
      iconUrl={iconUrl}
      name={name}
      tokenName={tokenName}
      amount={amount}
      notionalValue={notionalValue}
      isSelected={isSelected}
    />
  );
});

export type ComboboxOption = Omit<
  ItemProps,
  "isActive" | "size" | "isSelected"
>;

export interface ChainSwapComboboxProps {
  size: ChainListItemProps["size"];
  // Maximum height of the dropdown list
  maxHeight?: number;
  options: Array<ComboboxOption>;
  filterFn?: (
    options: Array<ComboboxOption>,
    query: string,
  ) => Array<ComboboxOption>;
  defaultSelected?: ComboboxOption;
  onItemSelected?: (selected: ComboboxOption) => void;
  defaultOpen?: boolean;
  endAddon?: React.ReactNode | undefined;
  valueItem: ComboboxOption;
  placeholder?: string;
  className?: string;
  rootNode?: HTMLElement;
  inputClassName?: string;
  attributes?: Sprinkles;
  // Popover positioning props
  offsetX?: number;
  // Virtualization props
  virtualization?: {
    itemSize: number;
    overscan: number;
  };
}

export default function ChainSwapCombobox(props: ChainSwapComboboxProps) {
  const { theme, themeClass } = useTheme();

  const [open, setOpen] = React.useState(!!props.defaultOpen);
  const [inputFocusing, setInputFocusing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    props.placeholder ?? props.defaultSelected?.tokenName ?? "",
  );

  const [selectedItem, setSelectedItem] = React.useState<ComboboxOption | null>(
    props.defaultSelected ?? null,
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [pointer, setPointer] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const isTypingRef = React.useRef(false);

  const overlayId = React.useRef(overlays.generateId("chain-swap-combobox"));

  if (!open && pointer) {
    setPointer(false);
  }

  React.useEffect(() => {
    if (open) {
      overlays.pushOverlay(overlayId.current);
    }
    return () => {
      if (open) {
        overlays.popOverlay(overlayId.current);
      }
    };
  }, [open]);

  const rowVirtualizer = useVirtualizer({
    count: props.options.length,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => 64,
    overscan: 10,
  });

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLInputElement>({
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      placement: "bottom-start",
      middleware: [
        offset(({ rects }) => {
          const containerX = containerRef.current.getBoundingClientRect().left;
          const referenceX = rects.reference.x;
          const offsetX = props.offsetX ?? 0;

          return {
            crossAxis: containerX - referenceX - offsetX,
          };
        }),
        size({
          apply({ rects, availableHeight, elements }) {
            const containerWidth =
              containerRef.current.getBoundingClientRect().width;
            Object.assign(elements.floating.style, {
              width: `${containerWidth}px`,
              maxHeight: `${Math.min(props.maxHeight ?? availableHeight, 500)}px`,
            });
          },
        }),
      ],
    });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  const click = useClick(context);
  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: false,
    disabledIndices: [],
    openOnArrowKeyDown: true,
    allowEscape: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, role, dismiss, listNav],
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  function defaultFilterOptions(options: Array<ComboboxOption>) {
    // Return all items when inputValue is empty string or input not focusing
    if (!inputValue || !inputFocusing) {
      return options;
    }
    return options.filter((item) =>
      item?.tokenName?.toLowerCase().startsWith(inputValue?.toLowerCase()),
    );
  }

  function handleEmptyInputEscape() {
    if (inputValue === "" && selectedItem) {
      setInputValue(selectedItem.tokenName);
    }
  }

  const items = React.useMemo(() => {
    return typeof props.filterFn === "function"
      ? props.filterFn(props.options, inputValue)
      : defaultFilterOptions(props.options);
  }, [props.filterFn, props.options, inputValue]);

  function handleSelect() {
    if (activeIndex !== null) {
      const selected = items[activeIndex];
      setInputValue(selected.tokenName);
      setSelectedIndex(activeIndex);
      setActiveIndex(null);
      setSelectedItem(selected);
      setOpen(false);
      // refs.domReference.current?.focus();
      props.onItemSelected?.(selected);
    }
  }

  React.useLayoutEffect(() => {
    if (isPositioned && !pointer) {
      // Scrolling is restored, but the item will be scrolled
      // into view when necessary
      if (activeIndex !== null) {
        wrapperRef.current?.focus({ preventScroll: true });
        rowVirtualizer.scrollToIndex(activeIndex, {
          // @ts-ignore
          smoothScroll: false,
        });
      }
    }
  }, [rowVirtualizer, isPositioned, activeIndex, selectedIndex, pointer, refs]);

  const [mountRoot, setMountRoot] = React.useState<HTMLElement | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (props.rootNode) {
      return setMountRoot(props.rootNode);
    }
    if (!containerRef.current) return;

    const ownerDocument = getOwnerDocument(containerRef.current);
    if (!ownerDocument) return;

    setMountRoot(overlays.getOrCreateOverlayRoot(ownerDocument));
  }, []);

  return (
    <Box
      pr="$9"
      pl="$9"
      py="$7"
      backgroundColor="$menuItemBg"
      ref={containerRef}
      {...props.attributes}
      className={props.className}
    >
      <div data-part-id="chain-swap-combobox-reference" ref={refs.setReference}>
        <ChainSwapInput
          size={props.size}
          value={inputValue}
          onDropdownArrowClicked={() => {
            setOpen((isPrevOpen) => !isPrevOpen);
          }}
          endAddon={props.endAddon}
          placeholder={props.placeholder}
          {...selectedItem}
          isOpen={open}
          label={selectedItem?.name ?? null}
          inputClassName={props.inputClassName}
          inputAttributes={getReferenceProps({
            onChange,
            value: inputValue,
            "aria-autocomplete": "list",
            onKeyDown(event) {
              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                const selected = items[activeIndex];
                setInputValue(selected.tokenName);
                setActiveIndex(null);
                setSelectedItem(selected);
                setOpen(false);
                props.onItemSelected?.(selected);
              }

              if (event.key === "Escape") {
                handleEmptyInputEscape();
              }
            },
            onFocus() {
              setInputFocusing(true);
            },
            onBlur(e) {
              setInputFocusing(false);
              handleEmptyInputEscape();

              // Nothing has been selected, reset scrolling upon open
              if (activeIndex === null && selectedIndex === null) {
                rowVirtualizer.scrollToIndex(0, {
                  // @ts-ignore
                  smoothScroll: false,
                });
              }
            },
          })}
        />
      </div>

      <FloatingPortal root={mountRoot}>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
          >
            <div
              ref={refs.setFloating}
              tabIndex={-1}
              className={clx(
                themeClass,
                props.size === "md"
                  ? styles.chainSwapListBox[theme]
                  : styles.chainSwapListBoxSm[theme],
              )}
              style={{
                ...floatingStyles,
                ...(isMounted ? transitionStyles : {}),
                zIndex: 999,
                overflowY: "auto",
                overflowX: "hidden",
                outline: "none",
                border: "none",
                boxShadow: "none",
              }}
            >
              <FloatingList elementsRef={listRef}>
                <div
                  ref={wrapperRef}
                  // Some screen readers do not like any wrapper tags inside
                  // of the element with the role, so we spread it onto the
                  // virtualizer wrapper.
                  {...getFloatingProps({
                    onKeyDown(e) {
                      setPointer(false);

                      if (e.key === "Enter" && activeIndex !== null) {
                        e.preventDefault();
                        handleSelect();
                      }

                      if (e.key === " " && !isTypingRef.current) {
                        e.preventDefault();
                      }
                    },
                    onKeyUp(e) {
                      if (e.key === " " && !isTypingRef.current) {
                        handleSelect();
                      }
                    },
                  })}
                  // Ensure this element receives focus upon open so keydowning works.
                  tabIndex={0}
                  className="virtual-parent"
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width:
                      refs.reference.current?.getBoundingClientRect().width,
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                    overflow: "auto",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const item = items[virtualRow.index];

                    return (
                      <div
                        key={virtualRow.key}
                        tabIndex={-1}
                        role="option"
                        aria-selected={activeIndex === virtualRow.index}
                        // As the list is virtualized, this lets the assistive tech know
                        // how many options there are total without looking at the DOM.
                        aria-setsize={rowVirtualizer.getTotalSize()}
                        aria-posinset={virtualRow.index + 1}
                        ref={(node) => {
                          listRef.current[virtualRow.index] = node;
                        }}
                        className={clx(themeClass, "virtual-row")}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          paddingLeft: getPadding(refs.floating.current)
                            .paddingLeft,
                          paddingRight: getPadding(refs.floating.current)
                            .paddingRight,
                          paddingTop: themeVars.space["4"],
                          paddingBottom: themeVars.space["4"],
                          width: "100%",
                          outline: "none",
                          border: "none",
                          boxShadow: "none",
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        {...getItemProps({
                          onClick: (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleSelect();
                          },
                        })}
                      >
                        <Item
                          size={props.size}
                          isActive={activeIndex === virtualRow.index}
                          isSelected={
                            item
                              ? item?.tokenName === selectedItem?.tokenName
                              : false
                          }
                          {...item}
                        />
                      </div>
                    );
                  })}
                </div>
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </Box>
  );
}
function getPadding(element: HTMLElement | null): {
  paddingLeft: number;
  paddingRight: number;
} {
  const defaultPadding = { paddingLeft: 0, paddingRight: 0 };

  if (typeof window === "undefined" || !element) {
    return defaultPadding;
  }

  const computedStyle = window.getComputedStyle(element);
  const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
  const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

  return { paddingLeft, paddingRight };
}
