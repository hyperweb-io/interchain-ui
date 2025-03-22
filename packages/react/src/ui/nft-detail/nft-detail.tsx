import * as React from "react";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Button from "../button";
import IconButton from "../icon-button";
import NftTraitList from "../nft-trait-list";
import StarText from "../star-text";
import { store } from "../../models/store";
import NftDetailInfo from "../nft-detail-info";
import NftDetailTopOffer from "../nft-detail-top-offers";
import NftDetailActivityList from "../nft-detail-activity-list";
import type {
  NftDetailProps,
  ListForSale,
  MakeOffer,
  BuyNow,
} from "./nft-detail.types";

function NftDetail(props: NftDetailProps) {
  return (
    <Box
      maxWidth={{
        mobile: "unset",
        tablet: "776px",
        desktop: "776px",
      }}
      {...props.attributes}
      className={props.className}
    >
      <Box
        display="flex"
        flexDirection={{
          mobile: "column",
          tablet: "row",
          desktop: "row",
        }}
        gap={{
          mobile: "$6",
          tablet: "$10",
          desktop: "$10",
        }}
      >
        <Box borderRadius="$md" flex={1}>
          <Box
            as="img"
            width="$full"
            height="$auto"
            borderRadius="$md"
            aspectRatio="1"
            objectFit="cover"
            maxHeight={{
              mobile: "$30",
              tablet: "unset",
              desktop: "unset",
            }}
            attributes={{
              src: props.imgSrc,
              alt: props.collectionName,
            }}
          />
        </Box>
        <Box flex={1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
              desktop: "$sm",
            }}
            attributes={{
              marginBottom: {
                mobile: "$2",
                tablet: "$5",
                desktop: "$5",
              },
            }}
          >
            {props.collectionName}
          </Text>
          <Text
            fontWeight="$semibold"
            fontSize={{
              mobile: "$2xl",
              tablet: "$4xl",
              desktop: "$4xl",
            }}
            attributes={{
              marginBottom: {
                mobile: "$4",
                tablet: "$7",
                desktop: "$7",
              },
            }}
          >
            {props.name}
          </Text>
          <Stack
            attributes={{
              marginBottom: "$7",
              alignItems: "center",
            }}
          >
            <Text
              color="$textSecondary"
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              attributes={{
                marginRight: "$3",
              }}
            >
              Created by
            </Text>
            <Text
              fontWeight="$semibold"
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
            >
              {props.creatorName}
            </Text>
          </Stack>
          <Text
            color="$textSecondary"
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
              desktop: "$sm",
            }}
            attributes={{
              marginBottom: "$7",
            }}
          >
            {props.collectionDesc}
          </Text>
          {!!props.mintPrice ? (
            <StarText
              label="Minted for"
              value={props.mintPrice}
              iconSrc={props.tokenInfo?.iconSrc}
              tokenName={props.tokenInfo?.tokenName}
            />
          ) : null}
          {!!props.detailInfo?.lastSale ? (
            <StarText
              label="Last sale"
              value={props.detailInfo?.lastSale}
              iconSrc={props.tokenInfo?.iconSrc}
              tokenName={props.tokenInfo?.tokenName}
            />
          ) : null}
          <Stack
            attributes={{
              alignItems: "center",
              marginBottom: "$12",
              marginTop: "$4",
            }}
          >
            <Text
              color="$textSecondary"
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
              attributes={{
                marginRight: "$3",
              }}
            >
              Owned by
            </Text>
            <Text
              fontWeight="$semibold"
              fontSize={{
                mobile: "$xs",
                tablet: "$sm",
                desktop: "$sm",
              }}
            >
              {props.ownerName}
            </Text>
          </Stack>
          {!!props.price ? (
            <StarText
              label="Price"
              size="lg"
              value={props.detailInfo?.lastSale}
              showTokenIcon={false}
              iconSrc={props.tokenInfo?.iconSrc}
              tokenName={props.tokenInfo?.tokenName}
              attributes={{
                py: "$4",
              }}
            />
          ) : null}
          {props.type === "listForSale" ? (
            <>
              <Button
                size="md"
                intent="tertiary"
                leftIcon="priceTagLine"
                fluidWidth
                onClick={(event) => (props as ListForSale).onListForSale?.()}
              >
                List for Sale
              </Button>
              <Stack
                space="$8"
                attributes={{
                  marginTop: "$8",
                }}
              >
                <Box flex={1}>
                  <Button
                    size="sm"
                    intent="text"
                    leftIcon="sendLine"
                    fluidWidth
                    onClick={(event) => (props as ListForSale).onTransfer?.()}
                  >
                    Transfer
                  </Button>
                </Box>
                <Box flex={1}>
                  <Button
                    size="sm"
                    intent="text"
                    leftIcon="fireLine"
                    fluidWidth
                    onClick={(event) => (props as ListForSale).onBurn?.()}
                  >
                    Burn
                  </Button>
                </Box>
              </Stack>
            </>
          ) : null}
          {props.type === "makeOffer" ? (
            <Button
              intent="tertiary"
              size="md"
              leftIcon="coinsLine"
              fluidWidth
              onClick={(event) => (props as MakeOffer).onMakeOffer?.()}
            >
              Make Offer
            </Button>
          ) : null}
          {props.type === "buyNow" ? (
            <Stack space="$8">
              <Button
                intent="tertiary"
                size="md"
                leftIcon="shoppingBagLine"
                fluidWidth
                onClick={(event) => (props as BuyNow).onBuyNow?.()}
              >
                Buy Now
              </Button>
              <Button
                intent="text"
                size="md"
                leftIcon="coinsLine"
                fluidWidth
                onClick={(event) => (props as BuyNow).onMakeOffer?.()}
              >
                Make Offer
              </Button>
            </Stack>
          ) : null}
          {props.type === "custom" ? <>{props.children}</> : null}
        </Box>
      </Box>
      <Stack
        attributes={{
          alignItems: "center",
          marginTop: "$6",
          marginBottom: "$5",
        }}
      >
        <Text color="$textSecondary">Rank</Text>
        <Text
          fontWeight="$semibold"
          attributes={{
            mx: "$2",
          }}
        >
          {store.getState()?.formatNumber?.({
            value: props.rarityOrder,
          })}
        </Text>
        <Text color="$textSecondary">{`of ${store.getState()?.formatNumber?.({
          value: props.tokensCount,
        })}`}</Text>
      </Stack>
      <Stack
        space="$8"
        attributes={{
          marginBottom: "$11",
        }}
      >
        <Button
          size="sm"
          intent="text"
          onClick={(event) => props.onDownload?.()}
        >
          Download
        </Button>
        <IconButton
          size="sm"
          icon="uploadLine"
          intent="text"
          onClick={(event) => props.onShare?.()}
        />
      </Stack>
      {!!props.traits ? <NftTraitList list={props.traits} /> : null}
      {!!props.detailInfo ? (
        <>
          <Box height="$14" />
          <NftDetailInfo
            price={props.detailInfo?.price}
            owner={props.detailInfo?.owner}
            lastSale={props.detailInfo?.lastSale}
            topOffer={props.detailInfo?.topOffer}
            floorPrice={props.detailInfo?.floorPrice}
            isNameVerified={props.detailInfo?.isNameVerified}
          />
        </>
      ) : null}
      {!!props.detailTopOffer ? (
        <>
          <Box height="$16" />
          <NftDetailTopOffer
            price={props.detailTopOffer?.price}
            floorPrice={props.detailTopOffer?.floorPrice}
            expires={props.detailTopOffer?.expires}
            from={props.detailTopOffer?.from}
          />
        </>
      ) : null}
      {!!props.detailActivity ? (
        <>
          <Box height="$17" />
          <NftDetailActivityList list={props.detailActivity?.list} />
        </>
      ) : null}
    </Box>
  );
}

export default NftDetail;
