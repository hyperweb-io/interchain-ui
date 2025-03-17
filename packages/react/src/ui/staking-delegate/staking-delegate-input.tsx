import * as React from "react";
import { useState, useRef, useEffect } from "react";
import BigNumber from "bignumber.js";
import Box from "../box";
import Avatar from "../avatar";
import Text from "../text";
import Skeleton from "../skeleton";
import Spinner from "../spinner";
import { baseButton } from "../button/button.css";
import { breakpoints } from "../../styles/tokens";
import { toNumber } from "../../helpers/number";
import * as styles from "./staking-delegate.css";
import type { StakingDelegateInputProps } from "./staking-delegate.types";
import NumberField from "../number-field";

function StakingDelegateInput(props: StakingDelegateInputProps) {
  const cleanupRef = useRef<() => void>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [isMounted, setIsMounted] = useState(() => false);

  const [width, setWidth] = useState(() => 0);

  function isValidNotionalValue() {
    return (
      props.notionalValue && new BigNumber(props.notionalValue).isGreaterThan(0)
    );
  }

  useEffect(() => {
    setIsMounted(true);
    resizeObserver.current = new ResizeObserver((entries) => {
      const rootWidth = entries[0]?.borderBoxSize[0]?.inlineSize ?? 0;
      setWidth(rootWidth);
    });
    resizeObserver.current.observe(rootRef.current, {
      box: "border-box",
    });
    cleanupRef.current = () => {
      if (rootRef.current instanceof Element) {
        resizeObserver.current.unobserve(rootRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$6"
      boxRef={rootRef}
      {...props.attributes}
    >
      <Box
        bg="$inputBg"
        borderColor="$divider"
        borderWidth="1px"
        borderStyle="$solid"
        maxHeight="100px"
        borderRadius="$lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{
          mobile: "$6",
          tablet: "$8",
        }}
        py={{
          mobile: "$6",
          tablet: "$9",
        }}
        gap={{
          mobile: "$4",
          tablet: "$10",
        }}
      >
        <Avatar
          name={props.inputToken.tokenName}
          size={width >= breakpoints.mdMobile ? "lg" : "sm"}
          src={props.inputToken.tokenIconUrl ?? ""}
        />
        <Box flex="1">
          <NumberField
            size="sm"
            borderless
            value={props.value}
            minValue={toNumber(props.minValue)}
            maxValue={toNumber(props.maxValue)}
            onChange={(value) => props.onValueChange?.(value)}
            onInput={(event) =>
              props.onValueInput?.((event.target as HTMLInputElement).value)
            }
            formatOptions={{
              minimumFractionDigits:
                props.formatOptions?.minimumFractionDigits ?? 0,
              maximumFractionDigits:
                props.formatOptions?.maximumFractionDigits ?? 6,
            }}
            inputClassName={width >= breakpoints.mdMobile ? "" : styles.inputSm}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexShrink="0"
          gap="$2"
          alignItems="center"
        >
          <Text color="$text" fontSize="$md" fontWeight="$semibold">
            {props.inputToken.tokenName}
          </Text>
          {isValidNotionalValue() ? (
            <Text color="$text" fontSize="$sm" fontWeight="$normal">
              ≈ ${props.notionalValue}
            </Text>
          ) : null}
          {!isValidNotionalValue() && props.isLoadingNotionalValue ? (
            <Skeleton borderRadius="$sm" width="$10" height="$7" />
          ) : null}
        </Box>
      </Box>
      {props.partials && props.partials.length > 0 ? (
        <Box display="flex" gap="$4" justifyContent="flex-end">
          {props.partials?.map((item) => (
            <Box
              as="button"
              height="$11"
              width="auto"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              p="$4"
              borderRadius="$base"
              backgroundColor="$cardBg"
              key={item.label}
              cursor={item.isLoading ? "not-allowed" : "pointer"}
              attributes={{
                onClick: () => {
                  if (item.isLoading) {
                    return;
                  }
                  item.onClick();
                },
              }}
              className={baseButton}
            >
              <Box display={item.isLoading ? "block" : "none"}>
                <Spinner size="sm" color="$textPlaceholder" title="Loading" />
              </Box>
              <Text
                as="span"
                fontSize="$sm"
                fontWeight="$semibold"
                color="$textSecondary"
                attributes={{
                  display: item.isLoading ? "none" : "block",
                }}
              >
                {item.label}
              </Text>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default StakingDelegateInput;
