import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "../stack";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import type { NftFixedPriceProps } from "./nft-fixed-price.types";

function NftFixedPrice(props: NftFixedPriceProps) {
  const [starList, setStarList] = useState(() => [
    {
      label: "Floor Price",
      value: "",
    },
    {
      label: "Highest Offer",
      value: "",
    },
  ]);

  useEffect(() => {
    setStarList(
      starList.map((item, index) => {
        let value = index === 0 ? props?.floorPrice : props?.highestOffer;
        return {
          label: item.label,
          value: `${value}`,
        };
      })
    );
  }, [props?.floorPrice, props?.highestOffer]);

  return (
    <Box>
      <TokenInput
        title="Minimum Offer"
        symbol="STARS"
        tokenIcon="stargazePixel"
        hasProgressBar={false}
      />
      <Stack
        space="$0"
        attributes={{
          my: "$10",
          justifyContent: "space-between",
        }}
      >
        {starList?.map((item) => (
          <StarText key={item.label} label={item.label} value={item.value} />
        ))}
      </Stack>
      <NftFees
        symbol="STARS"
        title="Fee"
        listFee={0.5}
        royalities={0.5}
        fairBurn={0.5}
        proceeds={-0.5}
      />
      <Button
        intent="tertiary"
        size="lg"
        fluidWidth
        attributes={{
          marginBottom: "$10",
        }}
      >
        List
      </Button>
      <Button variant="unstyled" size="sm" fluidWidth>
        Cancel
      </Button>
    </Box>
  );
}

export default NftFixedPrice;
