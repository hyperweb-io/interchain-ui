import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import type { MeshStakingSliderInfoProps } from "./mesh-staking.types";

function MeshStakingSliderInfo(props: MeshStakingSliderInfoProps) {
  return (
    <Box
      display="flex"
      gap="$8"
      maxWidth="$23"
      alignItems="center"
      flexShrink={0}
      attributes={props.attributes}
      className={props.className}
    >
      <Box
        as="img"
        width="$12"
        height="$12"
        attributes={{
          src: props.tokenImgSrc,
          alt: props.tokenName,
        }}
      />
      <Stack direction="vertical" space="$1">
        <Text
          fontSize="$sm"
          color="$meshStakingSliderInfoPrimaryText"
          fontWeight="$medium"
        >
          {props.tokenName}
        </Text>
        <Text
          fontSize="$sm"
          fontWeight="$normal"
          color={
            props.isActive
              ? "$meshStakingSliderInfoSecondaryTextActive"
              : "$meshStakingSliderInfoSecondaryText"
          }
        >
          {props.tokenAPR}
        </Text>
      </Stack>
    </Box>
  );
}

export default MeshStakingSliderInfo;
