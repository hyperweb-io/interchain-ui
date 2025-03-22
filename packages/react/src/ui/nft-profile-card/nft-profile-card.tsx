import * as React from "react";
import clsx from "clsx";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import StarText from "../star-text";
import type { NftProfileCardProps } from "./nft-profile-card.types";

function NftProfileCard(props: NftProfileCardProps) {
  const { thumbnailBehavior = "contain" } = props;
  return (
    <Box
      cursor={typeof props.onClick === "function" ? "pointer" : "default"}
      attributes={{
        ...props.attributes,
        onClick: (event) => props.onClick?.(event),
      }}
      className={clsx(props.className)}
    >
      <Stack direction="vertical" space="$4">
        {thumbnailBehavior === "full" ? (
          <Box position="relative" width="$full" height="$30" flexGrow="0">
            <Box
              position="absolute"
              left="0"
              right="0"
              top="0"
              bottom="0"
              borderRadius="$md"
              borderColor="$gray200"
              borderStyle="$solid"
              borderWidth="1px"
            />
            <Box
              width="$full"
              height="$30"
              borderRadius="$md"
              backgroundSize="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              zIndex="0"
              backgroundImage={`url(${props.imgSrc})`}
            />
          </Box>
        ) : null}
        {thumbnailBehavior === "contain" ? (
          <Box width="$full">
            <Box
              width="$full"
              height="auto"
              aspectRatio="1"
              as="img"
              borderRadius="$md"
              attributes={{ src: props.imgSrc, alt: props.name }}
            />
          </Box>
        ) : null}
        <Text fontWeight="$semibold">{props.name}</Text>
        {props.priceItems?.map((priceItem, index) => (
          <StarText
            key={`${priceItem.label}-${index}`}
            label={priceItem.label}
            tokenName={priceItem.tokenName}
            value={priceItem.value}
            iconSrc={priceItem.iconSrc}
            onClick={(event) => priceItem.onClick}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default NftProfileCard;
