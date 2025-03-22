import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import StarText from "../star-text";
import type { NftDetailTopOfferProps } from "./nft-detail-top-offers.types";

function NftDetailTopOffer(props: NftDetailTopOfferProps) {
  return (
    <Stack direction="vertical" space="$0">
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{
          marginBottom: "$6",
        }}
      >
        Top offers
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          mobile: "repeat(auto-fill, minmax(100px, 1fr))",
          tablet: "repeat(auto-fill, minmax(150px, 1fr))",
          desktop: "repeat(auto-fill, minmax(150px, 1fr))",
        }}
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
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Price
          </Text>
          <StarText value={props?.price} />
        </Stack>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Floor price (%Δ)
          </Text>
          <Text fontWeight="$semibold">{props?.floorPrice}</Text>
        </Stack>
        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Expires
          </Text>
          <Text fontWeight="$semibold">{props?.expires}</Text>
        </Stack>
        <Stack
          direction="vertical"
          space="$0"
          attributes={{
            paddingRight: "$8",
          }}
        >
          <Text fontSize="$xs" color="$textSecondary">
            From
          </Text>
          <Text fontWeight="$semibold">{props?.from}</Text>
        </Stack>
      </Box>
    </Stack>
  );
}

export default NftDetailTopOffer;
