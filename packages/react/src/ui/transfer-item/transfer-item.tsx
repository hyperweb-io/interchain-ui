import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import {
  TransferItemProps,
  AvailableItem,
  ComboboxListItem,
  PartialAmount,
} from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";
import ChainSwapCombobox from "../chain-swap-combobox";
import NumberField from "../number-field";

function TransferItem(props: TransferItemProps) {
  const {
    hasAvailable = false,
    title = "",
    partials = [
      {
        label: "Half",
        percentage: 0.5,
      },
      {
        label: "Max",
        percentage: 1,
      },
    ],
  } = props;
  const lastValueRef = useRef<number>(0);
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  const [currentItem, setCurrentItem] = useState(() => null);
  const [comboboxList, setComboboxList] = useState(() => []);
  function amountPrice() {
    if (props.amount === 0) {
      return 0;
    } else {
      return new BigNumber(currentItem?.priceDisplayAmount)
        .multipliedBy(props.amount)
        .decimalPlaces(6)
        .toNumber();
    }
  }
  function handleAmountInput(value: number) {
    if (value === lastValueRef.current) {
      return;
    }
    lastValueRef.current = value;
    props?.onChange?.(currentItem, value);
  }
  function handlePartialAmountChange(partial: PartialAmount) {
    const value = new BigNumber(currentItem?.available)
      .multipliedBy(partial.percentage)
      .toNumber();
    handleAmountInput(value);
  }
  function getComboboxItem(item: AvailableItem) {
    let dollarAmount = new BigNumber(item?.available)
      .multipliedBy(item?.priceDisplayAmount)
      .toString();
    dollarAmount = store
      .getState()
      .formatNumber({ value: dollarAmount, style: "currency" });
    return {
      iconUrl: item?.imgSrc,
      name: item?.name,
      tokenName: item?.symbol,
      amount: `${item?.available}`,
      notionalValue: dollarAmount,
    };
  }
  function mapToComboboxList(list: AvailableItem[]) {
    let res = list.map((item: AvailableItem) => {
      return getComboboxItem(item);
    });
    setComboboxList(res);
  }
  function getSelectedItem(selectedItem: ComboboxListItem) {
    return props.dropdownList.find(
      (item: AvailableItem) => item.symbol === selectedItem.tokenName
    );
  }
  function itemSelected(selectedItem: ComboboxListItem) {
    setCurrentItem(
      props.dropdownList.find((item) => item.symbol === selectedItem.tokenName)
    );
    props?.onItemSelected?.(getSelectedItem(selectedItem));
  }
  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    setCurrentItem(props.selectedItem);
  }, [props.selectedItem]);
  useEffect(() => {
    mapToComboboxList(props.dropdownList ?? []);
  }, [props.dropdownList]);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      gap="$0"
      display="flex"
      flexDirection="column"
      backgroundColor="$progressBg"
      borderRadius="$lg"
      position="relative"
      paddingTop="$5"
      bg="$cardBg"
      attributes={{ "data-part-id": "transfer-item-root" }}
      className={clx(props.className, styles.root)}
    >
      <Stack
        space="$0"
        direction="horizontal"
        attributes={{
          flexWrap: "wrap",
          minHeight: "$10",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: props.isSmall ? "$6" : "$9",
          paddingRight: props.isSmall ? "$4" : "$5",
        }}
      >
        <Text
          color="$textSecondary"
          fontSize={props.isSmall ? "$xs" : "$sm"}
          attributes={{ flexGrow: 1, flexShrink: 0 }}
        >
          {title}
        </Text>
        <Box display="flex" flexWrap="wrap" gap="$2">
          {hasAvailable ? (
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                flexGrow: "1",
                overflow: "auto",
                flexShrink: "0",
                alignItems: "center",
              }}
            >
              <Text
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize={props.isSmall ? "$2xs" : "$sm"}
                attributes={{ flexShrink: "0" }}
              >
                {props.availableLabel ?? "Available"}
              </Text>
              <Text
                fontWeight="$semibold"
                fontSize={props.isSmall ? "$2xs" : "$sm"}
                attributes={{
                  marginRight: props.isSmall ? "$2" : "$9",
                  flexShrink: "0",
                }}
              >
                {currentItem?.available}
              </Text>
            </Stack>
          ) : null}
          {partials && partials.length > 0 ? (
            <Stack
              direction="horizontal"
              space="$4"
              align="center"
              attributes={{
                justifyContent: "flex-end",
                flexGrow: "0",
                flexShrink: "1",
              }}
            >
              {partials?.map((partial, index) => (
                <button
                  key={index}
                  onClick={(event) => handlePartialAmountChange(partial)}
                  className={styles.textBtn[theme]}
                >
                  <Box as="span" fontSize={props.isSmall ? "$2xs" : "$sm"}>
                    {partial.label}
                  </Box>
                </button>
              ))}
            </Stack>
          ) : null}
        </Box>
      </Stack>
      {comboboxList.length > 0 ? (
        <Box attributes={{ borderRadius: "$lg" }}>
          <ChainSwapCombobox
            size={props.isSmall ? "sm" : "md"}
            filterFn={props.filterFn}
            placeholder={props.placeholder}
            selectedItem={getComboboxItem(currentItem)}
            defaultSelected={props.defaultSelectedItem ?? comboboxList[0]}
            options={comboboxList}
            onItemSelected={(item) => {
              itemSelected(item);
            }}
            valueItem={getComboboxItem(currentItem)}
            endAddon={
              <Stack direction="vertical" space="$0">
                {props.disabled ? (
                  <Box
                    width="auto"
                    flex="1"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Text fontSize={props.isSmall ? "$lg" : "$2xl"}>
                      {props.amount}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    {/* @ts-ignore */}
                    <NumberField
                      borderless
                      size="sm"
                      isDisabled={!!props.disabled}
                      value={props.amount}
                      onInput={(event) => {
                        if (typeof props.onInput === "function") {
                          props.onInput(
                            currentItem,
                            (event.target as HTMLInputElement).value
                          );
                        }
                      }}
                      onChange={(value) => {
                        handleAmountInput(value);
                      }}
                      inputClassName={clx(
                        styles.transferInput,
                        props.isSmall ? styles.smComboboxInput : null
                      )}
                      minValue={0}
                      maxValue={
                        props.availableAsMax
                          ? currentItem?.available
                          : undefined
                      }
                    />
                  </Box>
                )}
                <div
                  style={{
                    display:
                      !!props.amount && props.amount > 0 ? "block" : "none",
                  }}
                >
                  <Text color="$textSecondary" fontSize="$xs" textAlign="right">
                    {`≈ $${store
                      .getState()
                      ?.formatNumber({ value: amountPrice() })}`}
                  </Text>
                </div>
              </Stack>
            }
            attributes={
              props.isSmall
                ? { pr: "10px", pl: "12px", py: "8px" }
                : { pr: "10px", pl: "20px", py: "14px" }
            }
            className={styles.comboboxContainer}
          />
        </Box>
      ) : null}
    </Box>
  );
}
export default TransferItem;
