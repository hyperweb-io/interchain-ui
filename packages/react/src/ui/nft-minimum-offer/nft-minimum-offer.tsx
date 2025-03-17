import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "../stack";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import type { NftMinimumOfferProps } from "./nft-minimum-offer.types";

function NftMinimumOffer(props: NftMinimumOfferProps) {
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
        amount={props?.value}
        onAmountChange={(value) => props?.onChange?.(value)}
      />
      <Stack
        space="$0"
        attributes={{
          py: {
            mobile: "$6",
            tablet: "$10",
          },
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {starList?.map((item) => (
          <StarText key={item.label} label={item.label} value={item.value} />
        ))}
      </Stack>
      <NftFees
        symbol="STARS"
        title="Fee"
        listFee={props?.fees?.listFee}
        royalities={props?.fees?.royalities}
        fairBurn={props?.fees?.fairBurn}
        proceeds={props?.fees?.proceeds}
      />
      <Box
        pt={{
          mobile: "$4",
          tablet: "$9",
        }}
      >
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

export default NftMinimumOffer;
