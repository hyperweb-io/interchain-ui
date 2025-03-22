import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import type { NftTraitListItemProps } from "./nft-trait-list-item.types";

function NftTraitListItem(props: NftTraitListItemProps) {
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      justifyContent="space-between"
      alignItems="center"
      gap="$0"
    >
      <Stack direction="vertical" space="$0">
        <Text color="$textSecondary" fontSize="$xs">
          {props?.name}
        </Text>
        <Text fontWeight="$semibold">{props?.value}</Text>
      </Stack>
      <Text fontSize="$xl" fontWeight="$semibold">
        {props?.rarityPercent}%
      </Text>
    </Box>
  );
}

export default NftTraitListItem;
