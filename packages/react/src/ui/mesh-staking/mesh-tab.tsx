import * as React from "react";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import type { MeshTabProps } from "./mesh-staking.types";

function MeshTab(props: MeshTabProps) {
  const { isActive = false } = props;
  return (
    <Box
      position="relative"
      attributes={{ "data-testid": "mesh-tab-container" }}
    >
      <Box
        as="button"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="transparent"
        color="$meshTabText"
        fontSize="$sm"
        fontWeight="$medium"
        py="$8"
        px="$3"
        borderRadius="$md"
        filter={isActive ? undefined : "grayscale(60%) opacity(40%)"}
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
      <Box
        height="1px"
        width="100%"
        bg="$textSuccess"
        bottom="$0"
        transition="250ms opacity"
        opacity={isActive ? 1 : 0}
      />
    </Box>
  );
}

export default MeshTab;
