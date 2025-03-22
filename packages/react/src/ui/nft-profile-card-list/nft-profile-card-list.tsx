import * as React from "react";
import Box from "../box";
import NftProfileCard from "../nft-profile-card";
import type { NftProfileCardProps } from "../nft-profile-card/nft-profile-card.types";
import type { NftProfileCardListProps } from "./nft-profile-card-list-types";

function NftProfileCardList(props: NftProfileCardListProps) {
  return (
    <Box
      display="grid"
      gap={{
        mobile: "$8",
        tablet: "$10",
      }}
      gridTemplateColumns={
        props.list.length > 1
          ? "repeat(auto-fit, minmax(232px, 1fr))"
          : "repeat(auto-fit, 232px)"
      }
      {...props.attributes}
      className={props.className}
    >
      {props.list?.map((item, index) => (
        <Box key={`${item?.name}-${index}`}>
          <NftProfileCard
            key={item.imgSrc}
            name={item?.name}
            imgSrc={item?.imgSrc}
            priceItems={item.priceItems}
            onClick={(event) => item.onClick(event)}
            thumbnailBehavior={props.thumbnailBehavior}
          />
        </Box>
      ))}
    </Box>
  );
}

export default NftProfileCardList;
