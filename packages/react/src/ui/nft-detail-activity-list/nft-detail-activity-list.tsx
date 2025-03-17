import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { NftDetailActivityListItemProps } from "../nft-detail-activity-list-item/nft-detail-activity-list-item.types";
import NftDetailActivityListItem from "../nft-detail-activity-list-item";
import type { NftDetailActivityListProps } from "./nft-detail-activity-list.types";

function NftDetailActivityList(props: NftDetailActivityListProps) {
  return (
    <Stack direction="vertical" space="0">
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{
          marginBottom: "$10",
        }}
      >
        {props.title ?? "Activity"}
      </Text>
      <Box
        pb="$4"
        overflowX={{
          mobile: "scroll",
          tablet: "auto",
          desktop: "auto",
        }}
      >
        <Stack direction="vertical" space="$10">
          {props?.list?.map((item, index) => (
            <NftDetailActivityListItem
              key={index}
              event={item?.event}
              price={item?.price}
              from={item?.from}
              to={item?.to}
              date={item?.date}
              tokenName={item.tokenName}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default NftDetailActivityList;
