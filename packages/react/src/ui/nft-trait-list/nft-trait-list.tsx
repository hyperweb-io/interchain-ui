import * as React from "react";
import Box from "../box";
import NftTraitListItem from "../nft-trait-list-item";
import { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import { NftTraitListProps } from "./nft-trait-list.types";

function NftTraitList(props: NftTraitListProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        mobile: "repeat(auto-fit, minmax(250px, 1fr))",
        tablet: "repeat(auto-fit, minmax(329px, 1fr))",
      }}
      rowGap={{
        mobile: "$4",
        tablet: "$8",
        desktop: "$8",
      }}
      columnGap={{
        mobile: "$12",
        tablet: "$17",
        desktop: "$17",
      }}
      {...props.attributes}
      className={props.className}
    >
      {props.list?.map((item, index) => (
        <Box key={index}>
          <NftTraitListItem
            key={item?.name}
            name={item?.name}
            value={item?.value}
            rarityPercent={item?.rarityPercent}
          />
        </Box>
      ))}
    </Box>
  );
}

export default NftTraitList;
