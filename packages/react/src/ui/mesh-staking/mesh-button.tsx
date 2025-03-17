import * as React from "react";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import type { MeshButtonProps } from "./mesh-staking.types";

function MeshButton(props: MeshButtonProps) {
  const { variant = "solid", colorScheme = "primary" } = props;
  return (
    <>
      {variant === "solid" ? (
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="$sm"
          fontWeight="$medium"
          bg={
            colorScheme === "primary"
              ? {
                  base: "$meshButtonSolidPrimaryBg",
                  hover: "$meshButtonSolidPrimaryBgHovered",
                }
              : {
                  base: "$meshButtonSolidSecondaryBg",
                  hover: "$meshButtonSolidSecondaryBgHovered",
                }
          }
          color={
            colorScheme === "primary"
              ? "$meshButtonSolidPrimaryText"
              : "$meshButtonSolidSecondaryText"
          }
          py={props.px ?? "$5"}
          px={props.py ?? "$9"}
          borderRadius={props.borderRadius ?? "$md"}
          height={props.height ?? "$14"}
          width={props.width}
          {...props}
          {...props.attributes}
          attributes={{
            ...props.domAttributes,
            onClick: (event) => props.onClick?.(event),
          }}
          className={clx(baseButton, props.className)}
        >
          {props.children}
        </Box>
      ) : null}
      {variant === "text" ? (
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          fontSize="$sm"
          fontWeight="$normal"
          py="$6"
          px="$9"
          borderRadius="$md"
          color={
            props.color
              ? props.color
              : {
                  base: "$meshButtonGhostText",
                  hover: "$meshButtonGhostTextHovered",
                }
          }
          height={props.height ?? "$14"}
          width={props.width}
          {...props}
          {...props.attributes}
          attributes={{
            ...props.domAttributes,
            onClick: (event) => props.onClick?.(event),
          }}
          className={clx(baseButton, props.className)}
        >
          {props.children}
        </Box>
      ) : null}
    </>
  );
}

export default MeshButton;
