import * as React from "react";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import StarText from "../star-text";
import type { NftDetailInfoProps } from "./nft-detail-info.type";
import { isNumber } from "lodash";

function NftDetailInfo(props: NftDetailInfoProps) {
  return (
    <Stack direction="vertical" space="$7">
      <Text fontSize="$xl" fontWeight="$semibold">
        Info
      </Text>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        rowGap={{
          mobile: "$4",
          tablet: "$6",
          desktop: "$6",
        }}
        columnGap={{
          mobile: "$10",
          tablet: "$14",
          desktop: "$14",
        }}
      >
        {!!props.price ? (
          <Stack space="$0" direction="vertical">
            <Text fontSize="$xs" color="$textSecondary">
              Price
            </Text>
            <StarText value={props.price} />
          </Stack>
        ) : null}
        {!!props.lastSale ? (
          <Stack direction="vertical" space="$0">
            <Text fontSize="$xs" color="$textSecondary">
              Last sale
            </Text>
            <Text fontWeight="$semibold">{`${
              isNumber(props.lastSale) ? `${props.lastSale} STARS` : "---"
            }`}</Text>
          </Stack>
        ) : null}
        {!!props.owner ? (
          <Stack direction="vertical" space="0">
            <Text fontSize="$xs" color="$textSecondary">
              Owner
            </Text>
            <Stack
              space="$0"
              attributes={{
                alignItems: "center",
              }}
            >
              <Text
                fontWeight="$semibold"
                attributes={{
                  marginRight: "$3",
                }}
              >
                {props.owner}
              </Text>
              <Icon
                name="jaggedCheck"
                size="$md"
                color="$text"
                attributes={{
                  transform: "translateY(1px)",
                }}
              />
            </Stack>
          </Stack>
        ) : null}
        {!!props.topOffer ? (
          <Stack direction="vertical" space="0">
            <Text fontSize="$xs" color="$textSecondary">
              Top offer
            </Text>
            <StarText value={props.topOffer} />
          </Stack>
        ) : null}
        {!!props.floorPrice ? (
          <Stack direction="vertical" space="$0">
            <Text fontSize="$xs" color="$textSecondary">
              Floor price
            </Text>
            <StarText value={props.floorPrice} />
          </Stack>
        ) : null}
      </Box>
    </Stack>
  );
}

export default NftDetailInfo;
