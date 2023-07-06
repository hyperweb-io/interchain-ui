import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import starIcon from "../../assets/stars.png";

import * as styles from './nft-detail-top-offers.css'
import { NftDetailTopOfferProps } from "./nft-detail-top-offers.types";

export default function NftDetailTopOffer(props: NftDetailTopOfferProps) {
  return (
    <Stack className={styles.container} direction="column">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "6" }}>
        Top offers
      </Text>
      <Stack justify="space-between">
        <Stack direction="column">
          <Text size="xs" color="textSecondary">
            Price
          </Text>
          <Stack align="center">
            <Text weight="semibold" attributes={{ marginRight: "3" }}>
              {`${props?.price} STARS`}
            </Text>
            <Box
              as="img"
              width="8"
              height="8"
              attributes={{ src: starIcon }}
            ></Box>
          </Stack>
        </Stack>
        <Stack direction="column">
          <Text size="xs" color="textSecondary">
            Floor price (%Δ)
          </Text>
          <Text weight="semibold">{props?.floorPrice}</Text>
        </Stack>
        <Stack direction="column">
          <Text size="xs" color="textSecondary">
            Expires
          </Text>
          <Text weight="semibold">{props?.expires}</Text>
        </Stack>
        <Stack direction="column" attributes={{ paddingRight: "8" }}>
          <Text size="xs" color="textSecondary">
            From
          </Text>
          <Text weight="semibold">{props?.from}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
