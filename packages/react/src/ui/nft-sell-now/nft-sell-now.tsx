import * as React from "react";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftFees from "../nft-fees";
import { NftSellNowProps } from "./nft-sell-now.types";

function NftSellNow(props: NftSellNowProps) {
  return (
    <Box>
      <Text color="$textSecondary" fontSize="$lg" fontWeight="$semibold">
        Best Offer
      </Text>
      <Stack
        space="$6"
        attributes={{
          py: "$9",
          alignItems: "center",
        }}
      >
        <Text
          fontWeight="$semibold"
          fontSize={{
            mobile: "$md",
            tablet: "$lg",
          }}
        >{`${props.bestOffer} STARS`}</Text>
        <Icon
          name="stargazePixel"
          size="$7xl"
          attributes={{
            borderRadius: "$full",
            backgroundColor: "$black",
          }}
        />
      </Stack>
      <Box as="p">
        <Text as="span" color="$textSecondary" fontSize="$xs">
          This offer is
        </Text>
        <Text
          as="span"
          fontSize="$xs"
          fontWeight="$semibold"
          attributes={{
            px: "$2",
          }}
        >{`${props?.offerToFloorPriceRatio}`}</Text>
        <Text as="span" color="$textSecondary" fontSize="$xs">
          the floor price of
        </Text>
        <Text
          as="span"
          fontSize="$xs"
          fontWeight="$semibold"
          attributes={{
            px: "$2",
          }}
        >{`${props?.floorPrice} STARS`}</Text>
      </Box>
      <NftFees
        symbol="STARS"
        title="Fee"
        listFee={props?.fees?.listFee}
        royalities={props?.fees?.royalities}
        fairBurn={props?.fees?.fairBurn}
        proceeds={props?.fees?.proceeds}
      />
      <Box pt="$9">
        <Button
          intent="tertiary"
          size="lg"
          fluidWidth
          attributes={{
            marginBottom: "$10",
          }}
          onClick={(event) => props.onList?.()}
        >
          List
        </Button>
        <Button
          variant="unstyled"
          size="md"
          fluidWidth
          onClick={(event) => props.onCancel?.()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default NftSellNow;
