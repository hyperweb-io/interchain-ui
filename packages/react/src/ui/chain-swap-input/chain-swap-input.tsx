import * as React from "react";
import { useState, useRef, forwardRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import Stack from "../stack";
import Icon from "../icon";
import { baseButton } from "../button/button.css";
import {
  container,
  chainSwapInput,
  chainSwapLogo,
  logoMd,
  logoSm,
  rotate,
} from "./chain-swap-input.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ChainSwapInputProps } from "./chain-swap-input.types";

const ChainSwapInput = forwardRef<any, ChainSwapInputProps>(
  function ChainSwapInput(
    props: ChainSwapInputProps,
    containerRef: ChainSwapInputProps["containerRef"]
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
        data-part-id="chain-swap-input-root"
        ref={containerRef}
        className={clx(container, props.className)}
      >
        <Box
          width="$full"
          display="grid"
          gridTemplateColumns={{
            mobile: "repeat(2, minmax(0, 1fr))",
            tablet: "repeat(2, minmax(0, 1fr))",
          }}
        >
          <Stack
            direction="horizontal"
            space="$7"
            attributes={{
              alignItems:
                props.value && props.label ? "flex-start" : "flex-start",
              zIndex: "1",
            }}
          >
            <Box
              flexShrink="0"
              position="relative"
              className={props.size === "md" ? logoMd : logoSm}
            >
              <Box
                width="$full"
                height="$full"
                borderRadius="$full"
                backgroundColor="$skeletonBg"
                display={!props.value || !props.iconUrl ? "block" : "none"}
              />
              <Box display={props.value && props.iconUrl ? "block" : "none"}>
                <img
                  src={props.iconUrl}
                  alt={props.label}
                  className={chainSwapLogo[props.size]}
                />
              </Box>
            </Box>
            <Box
              flex={{
                mobile: "1",
                tablet: props.size === "sm" ? "1 0 1px" : undefined,
              }}
              width={props.size === "sm" ? "$full" : undefined}
              attributes={{
                "data-part-id": "chain-swap-input-container",
              }}
            >
              <Stack
                direction="horizontal"
                space="$2"
                attributes={{
                  justifyContent:
                    props.size === "sm" ? "space-between" : "flex-start",
                  alignItems: "center",
                }}
              >
                <Box display="block" position="relative" maxWidth="100%">
                  <input
                    data-part-id="chain-swap-input"
                    value={props.value}
                    placeholder={props.placeholder}
                    data-input-value={!!props.value}
                    data-size={props.size}
                    {...props.inputAttributes}
                    className={clx(
                      chainSwapInput[props.size],
                      props.inputClassName
                    )}
                  />
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    zIndex="1"
                    width="$12"
                    height="$12"
                    display={!!props.value ? "block" : "none"}
                  >
                    <button
                      type="button"
                      onClick={(event) => props.onDropdownArrowClicked?.()}
                      style={{
                        backgroundColor: "transparent",
                        height: "100%",
                        width: "100%",
                      }}
                      className={clx(baseButton, props.isOpen ? rotate : null)}
                    >
                      <Icon
                        color="$textSecondary"
                        size="$6xl"
                        name="arrowDropDown"
                      />
                    </button>
                  </Box>
                </Box>
              </Stack>
              <Box height="$11">
                <Text
                  as="p"
                  color="$text"
                  fontWeight="$normal"
                  fontSize="$xs"
                  textAlign="left"
                  ellipsis
                  attributes={{
                    maxWidth: props.value ? "100px" : "166px",
                    display: "block",
                  }}
                  domAttributes={{
                    title: props.label,
                  }}
                >
                  {props.label}
                </Text>
              </Box>
            </Box>
          </Stack>
          <Box display="block">
            <Box
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
              display={!props.value ? "flex" : "none"}
            >
              <Stack direction="vertical" space="$4">
                <Box
                  backgroundColor="$skeletonBg"
                  borderRadius="$base"
                  width="60px"
                  height="18px"
                />
                <Box
                  backgroundColor="$skeletonBg"
                  borderRadius="$base"
                  width="60px"
                  height="9px"
                />
              </Stack>
            </Box>
            <Box
              rawCSS={{
                display:
                  props.value &&
                  props.notionalValue &&
                  props.amount &&
                  !props.endAddon
                    ? "block"
                    : "none",
              }}
            >
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
            </Box>
            <Box
              rawCSS={{
                display: props.endAddon && !!props.value ? "block" : "none",
              }}
            >
              {props.endAddon}
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
);

export default ChainSwapInput;
