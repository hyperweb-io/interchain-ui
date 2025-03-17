import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import TokenInput from "../token-input";
import * as styles from "./nft-make-offer.css";
import type { NftMakeOfferProps } from "./nft-make-offer.types";

function NftMakeOffer(props: NftMakeOfferProps) {
  const {
    symbol = "STARS",
    makeOfferLabel = "Make Offer",
    cancelLabel = "Cancel",
  } = props;
  return (
    <Box {...props.attributes} className={styles.container}>
      <Stack space="$0" attributes={{ alignItems: "center" }}>
        <Box
          as="img"
          width="$13"
          height="$13"
          borderRadius="$md"
          marginRight="$5"
          attributes={{ src: props?.imgSrc }}
        />
        <Text attributes={{ marginRight: "$2" }}>for</Text>
        <Text fontWeight="$semibold">{props.tokenName}</Text>
      </Stack>
      <Box my="$12">
        <TokenInput
          title="Price"
          tokenIcon="stargazePixel"
          hasProgressBar={false}
          symbol={symbol}
          amount={props?.value}
          onAmountChange={(value) => props?.onChange?.(value)}
        />
      </Box>
      <Button
        size="lg"
        intent="tertiary"
        fluidWidth
        attributes={{ marginBottom: "$9" }}
        onClick={(event) => props?.onMakeOffer?.()}
      >
        {makeOfferLabel}
      </Button>
      <Box pt="$9">
        <Button
          variant="unstyled"
          size="md"
          fluidWidth
          onClick={(event) => props?.onCancel?.()}
        >
          {cancelLabel}
        </Button>
      </Box>
    </Box>
  );
}

export default NftMakeOffer;
