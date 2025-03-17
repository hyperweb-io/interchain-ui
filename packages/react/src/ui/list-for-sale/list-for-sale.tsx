import * as React from "react";
import { useState } from "react";
import Tabs from "../tabs";
import Box from "../box";
import NftFixedPrice from "../nft-fixed-price";
import NftAuction from "../nft-auction";
import NftSellNow from "../nft-sell-now";
import * as styles from "./list-for-sale.css";
import type { TabProps } from "../tabs/tabs.types";

function ListForSale(props: any) {
  const [tabs, setTabs] = useState(() => [
    {
      label: "Fixed Price",
      content: <NftFixedPrice floorPrice={300} highestOffer={189} />,
    },
    {
      label: "Auction",
      content: <NftAuction floorPrice={300} highestOffer={189} />,
    },
    {
      label: "Sell Now",
      content: (
        <NftSellNow
          bestOffer={120}
          offerToFloorPriceRatio="0.05"
          floorPrice={99}
        />
      ),
    },
  ]);

  return (
    <Box className={styles.container}>
      <Box>
        <Tabs tabs={tabs} />
      </Box>
    </Box>
  );
}

export default ListForSale;
