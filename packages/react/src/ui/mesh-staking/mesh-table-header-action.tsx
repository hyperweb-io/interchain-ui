import * as React from "react";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import Stack from "../stack";
import { baseButton } from "../button/button.css";
import type { MeshTableHeaderActionProps } from "./mesh-staking.types";

function MeshTableHeaderAction(props: MeshTableHeaderActionProps) {
  const {
    type = "stake",
    stakeLabel = "Stake",
    unstakeLabel = "Unstake",
  } = props;
  return (
    <Box display="flex" gap="$7" flexWrap="wrap" attributes={props.attributes}>
      <Box
        as="button"
        backgroundColor="transparent"
        flexShrink={0}
        attributes={{ onClick: () => props.onClick?.() }}
        className={baseButton}
      >
        {type === "stake" ? (
          <Text
            color="$textSuccess"
            fontSize="$md"
            fontWeight="$normal"
            attributes={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "$4",
            }}
          >
            <Icon name="plusRound" color="inherit" />
            {stakeLabel}
          </Text>
        ) : null}
        {type === "unstake" ? (
          <Text
            color="$textDanger"
            fontSize="$md"
            fontWeight="$normal"
            attributes={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "$4",
            }}
          >
            <Icon name="minusRound" color="inherit" />
            {unstakeLabel}
          </Text>
        ) : null}
      </Box>
      <Stack
        direction="horizontal"
        space="$4"
        attributes={{ alignItems: "center" }}
      >
        <Box
          as="img"
          width="$10"
          height="$10"
          attributes={{ src: props.tokenImgSrc, alt: props.tokenName }}
        />
        <Text
          fontSize="$md"
          fontWeight="$medium"
          color="$meshTableHeaderActionText"
        >
          {props.tokenAmount}
        </Text>
        <Text
          fontSize="$sm"
          fontWeight="$light"
          color="$meshTableHeaderActionSecondaryText"
        >
          {props.tokenName}
        </Text>
      </Stack>
    </Box>
  );
}

export default MeshTableHeaderAction;
