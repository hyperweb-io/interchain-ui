import * as React from "react";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import type { MeshTagButtonProps } from "./mesh-staking.types";

function MeshTagButton(props: MeshTagButtonProps) {
  return (
    <Box
      as="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="$tagButtonText"
      fontSize="$sm"
      py="$2"
      px="$6"
      borderRadius="$md"
      height="$11"
      width="44px"
      bg={{
        base: "$tagButtonBg",
        hover: "$tagButtonBgHovered",
      }}
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
  );
}

export default MeshTagButton;
