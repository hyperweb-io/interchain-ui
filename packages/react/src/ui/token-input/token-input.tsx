import * as React from "react";
import { useRef } from "react";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { uniqueId, isNil } from "lodash";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import IconButton from "../icon-button";
import CicularProgressBar from "../circular-progress-bar";
import * as styles from "./token-input.css";
import type { TokenInputProps } from "./token-input.types";
import type { IconName } from "../icon/icon.types";
import { store } from "../../models/store";
import NumberField from "../number-field";

function TokenInput(props: TokenInputProps) {
  const { hasProgressBar = true } = props;
  const inputIdRef = useRef(uniqueId("token-input-"));
  function notionalValue() {
    if (props.notionalValue) {
      return props.notionalValue;
    }
    const defaultFormat = (tokenAmount: number, pricePerToken: number) => {
      return new BigNumber(tokenAmount ?? 0)
        .multipliedBy(pricePerToken)
        .decimalPlaces(4)
        .toString();
    };
    const formatter =
      typeof props.formatNotionalValue === "function"
        ? props.formatNotionalValue
        : defaultFormat;
    return formatter(props.amount, props.priceDisplayAmount);
  }
  function isDisabled() {
    return props.progress === 0;
  }
  function handleTokenInput(value: number) {
    props.onAmountChange?.(value);
  }
  function handleIconClick() {
    let newProgress: number = 0;
    if (props.progress === 50) {
      newProgress = 0;
    } else {
      newProgress = 50;
    }
    props.onProgressChange(newProgress);
  }
  return (
    <Stack
      space="$0"
      attributes={{
        flexWrap: "wrap",
        alignItems: "center",
        ...props.attributes,
      }}
    >
      <Stack
        space="$0"
        attributes={{
          width: "$full",
          paddingBottom: "$7",
          justifyContent: "flex-end",
        }}
        className={clsx({ [styles.disabled]: isDisabled() })}
      >
        {!!props.title ? (
          <Box
            as="label"
            flex="1"
            color="$textSecondary"
            fontWeight="$semibold"
            fontSize="$lg"
            fontFamily="$body"
            attributes={{ htmlFor: inputIdRef.current }}
          >
            {props.title}
          </Box>
        ) : null}
        {!isNil(props.available) ? (
          <Stack space="$3" attributes={{ alignItems: "center" }}>
            <Text color="$textSecondary">Available</Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              {props.available}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              {props.symbol}
            </Text>
          </Stack>
        ) : null}
      </Stack>
      {hasProgressBar ? (
        <Stack
          space="$0"
          attributes={{ alignItems: "center" }}
          className={styles.progressContainer}
        >
          <CicularProgressBar progress={props.progress} />
          <Stack
            space="$0"
            attributes={{ alignItems: "center" }}
            className={styles.iconBox}
          >
            <Stack
              direction="vertical"
              attributes={{
                flex: 1,
                justifyContent: "center",
                width: "$20",
                px: "$7",
              }}
            >
              <Text fontWeight="$semibold">{props.symbol}</Text>
              <Text color="$textSecondary" fontSize="$xs">
                {props.name}
              </Text>
            </Stack>
            <div
              style={{
                visibility: props.progress !== 100 ? "visible" : "hidden",
              }}
            >
              <IconButton
                intent="text"
                icon={props.progress === 0 ? "add" : "subtract"}
                onClick={(event) => handleIconClick()}
                attributes={{ fontSize: "$3xl" }}
              />
            </div>
          </Stack>
        </Stack>
      ) : null}
      <Stack
        space="$0"
        className={clsx(styles.inputBox, { [styles.disabled]: isDisabled() })}
      >
        <Box width="$full">
          <NumberField
            size="lg"
            id={inputIdRef.current}
            minValue={props.minValue}
            maxValue={props.maxValue}
            value={props.amount}
            borderless
            isDisabled={isDisabled()}
            onChange={(value) => {
              handleTokenInput(value);
            }}
            onFocus={(e) => props?.onFocus?.(e)}
            inputContainer={styles.inputContainer}
            inputClassName={clsx(styles.inputClassName, props.inputClass)}
            className={styles.token}
            decrementButton={
              <Stack
                attributes={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: "0",
                  height: "$17",
                  width: "$18",
                  borderColor: "$inputBorder",
                }}
                className={clsx(styles.imgBox, props.imgClass)}
              >
                {props.tokenIcon &&
                ALL_ICON_NAMES.includes(props.tokenIcon as IconName) ? (
                  <Icon
                    size="$9xl"
                    name={props.tokenIcon as IconName}
                    attributes={{
                      borderRadius: "$full",
                      backgroundColor:
                        props.tokenIcon === "stargazePixel"
                          ? "$black"
                          : "transparent",
                    }}
                  />
                ) : typeof props.tokenIcon === "string" ? (
                  <Box
                    as="img"
                    width="$14"
                    height="$14"
                    borderRadius="$full"
                    attributes={{ src: props.tokenIcon }}
                  />
                ) : null}
              </Stack>
            }
          />
        </Box>
        <Stack
          space="$0"
          attributes={{
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            height: "100%",
            right: "$9",
          }}
        >
          <Text fontWeight="$semibold">{props.symbol}</Text>
          {!!props.amount && !new BigNumber(props.amount).eq(0) ? (
            <>
              {!props.notionalValue && !props.formatNotionalValue ? (
                <Text color="$textSecondary" attributes={{ ml: "$2" }}>
                  ≈ ${store.getState().formatNumber({ value: notionalValue() })}
                </Text>
              ) : null}
              {props.notionalValue || props.formatNotionalValue ? (
                <>{store.getState().formatNumber({ value: notionalValue() })}</>
              ) : null}
            </>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TokenInput;
