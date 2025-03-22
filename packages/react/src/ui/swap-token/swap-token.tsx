import * as React from "react";
import { useState, useRef, useEffect } from "react";
import anime from "animejs";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import SwapPrice from "../swap-price";
import { store } from "../../models/store";
import TransferItem from "../transfer-item";
import { IconProps } from "../icon/icon.types";
import type { ThemeVariant } from "../../models/system.model";
import * as styles from "./swap-token.css";
import type { SwapTokenProps } from "./swap-token.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";

function SwapToken(props: SwapTokenProps) {
  const {
    toleranceLimits = [1, 2.5, 3, 5],
    slippageLabel = "Slippage tolerance",
    swapDisabledLabel = "Insufficient balance",
    swapLabel = "Swap",
  } = props;
  const swapIconRef = useRef(null);
  const toteranceRef = useRef(null);
  const cleanupRef = useRef<() => void>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [theme, setTheme] = useState(() => "light");
  const [swapIcon, setSwapIcon] = useState(() => "arrowDownLine");
  const [tolerance, setTolerance] = useState(() => 1);
  const [isSetting, setIsSetting] = useState(() => false);
  const [fromAmount, setFromAmount] = useState(() => 0);
  const [toAmount, setToAmount] = useState(() => 0);
  const [fromItem, setFromItem] = useState(() => null);
  const [toItem, setToItem] = useState(() => null);
  const [fromList, setFromList] = useState(() => []);
  const [toList, setToList] = useState(() => []);
  const [width, setWidth] = useState(() => 0);
  function toggleIcon(deg, icon) {
    anime({ targets: [swapIconRef.current], rotate: deg });
    setSwapIcon(icon);
  }
  function toggleToteranceStatus() {
    let curSetting: boolean = !isSetting;
    if (curSetting) {
      anime({
        targets: [toteranceRef.current],
        opacity: 1,
        right: 0,
        easing: "easeInQuint",
        duration: 300,
      });
    } else {
      anime({
        targets: [toteranceRef.current],
        opacity: 0,
        right: -300,
        easing: "easeOutQuint",
        duration: 250,
      });
    }
    setIsSetting(curSetting);
  }
  function isSmallSize() {
    return width < 326;
  }
  function setToterance(per) {
    setTolerance(per);
    toggleToteranceStatus();
  }
  useEffect(() => {
    setTheme(store.getState().theme);
    resizeObserver.current = new ResizeObserver((entries) => {
      const rootWidth = entries[0]?.borderBoxSize[0]?.inlineSize ?? 0;
      setWidth(rootWidth);
    });
    resizeObserver.current.observe(rootRef.current, { box: "border-box" });
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
      if (rootRef.current instanceof Element) {
        resizeObserver.current.unobserve(rootRef.current);
      }
    });
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      paddingTop="$5"
      minWidth="250px"
      boxRef={rootRef}
      className={props.className}
    >
      <TransferItem
        hasAvailable
        isSmall={isSmallSize()}
        title={props.from.label ?? "From"}
        amount={props.from.amount}
        filterFn={props.filterFn}
        selectedItem={props.from.selected}
        dropdownList={props.from.options}
        onItemSelected={(selectedItem) =>
          props.from.onItemSelected(selectedItem)
        }
        onChange={(item, value) => props.from.onAmountChange(item, value)}
        onInput={(item, value) => {
          if (typeof props.from.onAmountInput === "function") {
            props.from.onAmountInput(item, value);
          }
        }}
      />
      <Stack
        attributes={{ justifyContent: "center" }}
        className={styles.switchContainer}
      >
        <Box position="relative" zIndex="1" boxRef={swapIconRef}>
          <button
            onClick={(e) => props.onToggleDirection()}
            onMouseEnter={(e) => toggleIcon(90, "arrowLeftRightLine")}
            onMouseLeave={(e) => toggleIcon(0, "arrowDownLine")}
            className={styles.swapIcon[theme]}
          >
            <Icon name={swapIcon as IconProps["name"]} />
          </button>
        </Box>
      </Stack>
      <TransferItem
        partials={[]}
        disabled
        isSmall={isSmallSize()}
        title={props.to.label ?? "To"}
        amount={props.to.amount}
        filterFn={props.filterFn}
        selectedItem={props.to.selected}
        dropdownList={props.to.options}
        onItemSelected={(selectedItem) => props.to.onItemSelected(selectedItem)}
        onChange={(item, value) => props.to.onAmountChange(item, value)}
        onInput={(item, value) => {
          if (typeof props.to.onAmountInput === "function") {
            props.to.onAmountInput(item, value);
          }
        }}
      />
      <Stack
        attributes={{
          my: "$9",
          height: "$12",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          color="$textSecondary"
          fontSize={isSmallSize() ? "$xs" : "$sm"}
          className={styles.percentLabelContainer}
        >
          {slippageLabel}
        </Text>
        <Stack
          attributes={{
            position: "relative",
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: width < 400 ? "visible" : "hidden",
          }}
          className={styles.settingContainer}
        >
          <Stack
            space="$7"
            attributes={{
              display: isSetting ? "none" : "flex",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary" fontWeight="$bold">
              {tolerance}%
            </Text>
            <IconButton
              icon="settingFill"
              size="sm"
              intent="text"
              onClick={(e) => toggleToteranceStatus()}
            />
          </Stack>
          <div
            ref={toteranceRef}
            style={{
              pointerEvents: isSetting ? "auto" : "none",
              width: isSetting ? width : "auto",
            }}
            className={styles.percentContainer}
          >
            <Stack
              space="$5"
              attributes={{
                alignItems: "center",
                justifyContent: isSmallSize() ? "space-between" : "flex-end",
                width: "100%",
                backgroundColor: theme === "light" ? "$white" : "$gray700",
              }}
            >
              {toleranceLimits?.map((percent) => (
                <Button
                  onClick={(e) => {
                    setToterance(percent);
                    props?.onToleranceChange?.(percent);
                  }}
                  key={percent}
                  size={isSmallSize() ? "xs" : "sm"}
                  intent={tolerance === percent ? "tertiary" : "text"}
                >
                  {percent}%
                </Button>
              ))}
              <IconButton
                icon="closeFilled"
                size="sm"
                intent="text"
                onClick={(e) => toggleToteranceStatus()}
              />
            </Stack>
          </div>
        </Stack>
      </Stack>
      <SwapPrice
        fromItem={props.from.selected}
        toItem={props.to.selected}
        disabled={props.swapPrice.routeDisabled}
        minimumReceived={props.swapPrice.minimumReceived ?? 0}
        fromAmount={props.from.amount}
        toAmount={props.to.amount}
        hasRoute={props?.swapPrice?.hasRoute}
        priceImpact={props?.swapPrice?.priceImpact}
        swapFee={props?.swapPrice?.swapFee}
      />
      <Box width="100%">
        <Button
          intent="tertiary"
          size="lg"
          fluidWidth
          onClick={(event) => props?.onSwap?.()}
          disabled={props.swapDisabled}
        >{`${props.swapDisabled ? swapDisabledLabel : swapLabel}`}</Button>
      </Box>
    </Box>
  );
}

export default SwapToken;
