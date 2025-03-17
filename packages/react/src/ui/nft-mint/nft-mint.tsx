import * as React from "react";
import { useState } from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import { toNumber } from "../../helpers/number";
import * as styles from "./nft-mint.css";
import type { NftMintProps } from "./nft-mint.types";
import NumberField from "../number-field";

function NftMint(props: NftMintProps) {
  const {
    mintButtonLabel = "Mint",
    mintButtonDisabledLabel = "Insufficient balance",
    tokenName = "STAR",
  } = props;
  const [amount, setAmount] = useState(() => 0);
  function isControlled() {
    return typeof props.amount !== "undefined";
  }
  function handleAmountChange(value: number) {
    props?.onChange?.(value); // Update internal amount if uncontrolled
    if (!isControlled()) {
      setAmount(value);
    }
  }
  return (
    <Stack direction="vertical" className={props.className}>
      <Text
        fontWeight="$semibold"
        fontSize={{ mobile: "$lg", tablet: "$xl", desktop: "$xl" }}
        attributes={{
          marginBottom: { mobile: "$7", tablet: "$10", desktop: "$12" },
        }}
      >
        {props.title}
      </Text>
      <Stack
        direction="vertical"
        space="$2"
        attributes={{
          display: { mobile: "flex", tablet: "none", desktop: "none" },
        }}
      >
        <Box
          flex="1"
          position="relative"
          borderRadius="$lg"
          borderWidth="$sm"
          borderColor="$divider"
          borderStyle="solid"
        >
          <Box
            as="img"
            width="$full"
            maxHeight="$27"
            borderRadius="$md"
            backgroundColor="$cardBg"
            objectFit="contain"
            attributes={{ alt: props.description, src: props.imgSrc }}
          />
          <Text
            color="$cardBg"
            fontSize="$xs"
            fontWeight="$semibold"
            attributes={{
              position: "absolute",
              top: "$4",
              right: "$4",
              width: "fit-content",
              backgroundColor: "$text",
              px: "$4",
              py: "$2",
              borderRadius: "40px",
            }}
          >
            {props?.tag}
          </Text>
        </Box>
        <Box flex={1}>
          <Stack direction="vertical">
            <Text fontSize="$md" fontWeight="$semibold">
              {props?.name}
            </Text>
            <Text fontSize="$sm" color="$textSecondary">
              {props?.description}
            </Text>
            <Stack attributes={{ pt: "$4", justifyContent: "space-between" }}>
              <Stack direction="vertical">
                <Text
                  fontSize="$xs"
                  color="$textSecondary"
                  fontWeight="$semibold"
                >
                  Quantity
                </Text>
                <Text fontSize="$sm" fontWeight="$semibold">
                  {props?.quantity}
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text
                  fontSize="$xs"
                  color="$textSecondary"
                  fontWeight="$semibold"
                >
                  Royalties
                </Text>
                <Text fontSize="$sm" fontWeight="$semibold">
                  {new BigNumber(props?.royalties).decimalPlaces(2).toString()}%
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text
                  fontSize="$xs"
                  color="$textSecondary"
                  fontWeight="$semibold"
                >
                  Minted
                </Text>
                <Text fontSize="$sm" fontWeight="$semibold">
                  {new BigNumber(props?.minted).decimalPlaces(2).toString()}%
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack
        space="$10"
        attributes={{
          marginBottom: "$10",
          display: { mobile: "none", tablet: "flex", desktop: "flex" },
        }}
      >
        <Box flex="1">
          <Box
            as="img"
            width="$full"
            height="auto"
            borderRadius="$md"
            attributes={{ src: props.imgSrc }}
          />
        </Box>
        <Box flex={1}>
          <Stack direction="vertical">
            <Text
              color="$cardBg"
              fontSize="$xs"
              fontWeight="$semibold"
              attributes={{
                width: "fit-content",
                backgroundColor: "$text",
                px: "$4",
                py: "$2",
                borderRadius: "40px",
              }}
            >
              {props?.tag}
            </Text>
            <Text
              fontSize="$4xl"
              fontWeight="$semibold"
              attributes={{ marginTop: "$6", marginBottom: "$3" }}
            >
              {props?.name}
            </Text>
            <Text color="$textSecondary">{props?.description}</Text>
            <Stack attributes={{ my: "$9", justifyContent: "space-between" }}>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Quantity
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {props?.quantity}
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Royalties
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {new BigNumber(props?.royalties).decimalPlaces(2).toString()}%
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Minted
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {new BigNumber(props?.minted).decimalPlaces(2).toString()}%
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Box
        gridTemplateRows="0.5fr, 1fr"
        columnGap="$10"
        display={{ mobile: "block", tablet: "grid", desktop: "grid" }}
        paddingTop={{ mobile: "$4", tablet: "$0", desktop: "$0" }}
        gridTemplateColumns={{
          mobile: "auto",
          tablet: "repeat(2, 1fr)",
          desktop: "repeat(2, 1fr)",
        }}
        gridTemplateAreas={{
          mobile: "none",
          tablet: `
            "a c"
            "b d"
          `,
          desktop: `
            "a c"
            "b d"
          `,
        }}
      >
        <Stack
          attributes={{
            gridArea: "a",
            marginBottom: { mobile: "$1", tablet: "$6", desktop: "$6" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box as="label" attributes={{ htmlFor: "nft-mint-amount" }}>
            <Text
              as="span"
              color="$textSecondary"
              fontWeight="$semibold"
              fontSize={{ mobile: "$2xs", tablet: "$lg", desktop: "$lg" }}
            >
              Select amount
            </Text>
          </Box>
          <Stack attributes={{ alignItems: "center" }}>
            <Text
              color="$textSecondary"
              fontSize={{ mobile: "$2xs", tablet: "$sm", desktop: "$sm" }}
              attributes={{ marginRight: "$2" }}
            >
              Available
            </Text>
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              fontSize={{ mobile: "$2xs", tablet: "$sm", desktop: "$sm" }}
            >{`${props?.available} ${tokenName}`}</Text>
          </Stack>
        </Stack>
        <Box
          position="relative"
          display={{ mobile: "block", tablet: "none", desktop: "none" }}
        >
          <NumberField
            size="sm"
            value={isControlled() ? props.amount : undefined}
            defaultValue={
              isControlled() ? props.amount : props.defaultAmount ?? 0
            }
            minValue={0}
            maxValue={toNumber(props.limited)}
            onInput={(event) => props?.onInput?.(event)}
            onChange={(value) => handleAmountChange(value)}
            inputClassName={styles.baseInput}
            formatOptions={{
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }}
          />
          <Stack
            space="$4"
            attributes={{
              position: "absolute",
              alignItems: "center",
              right: "$6",
            }}
            className={styles.starContainer}
          >
            <Icon
              name="stargazePixel"
              size="$sm"
              attributes={{ borderRadius: "$full", backgroundColor: "$black" }}
            />
            <Text fontSize="$sm" fontWeight="$semibold">{`${
              props.tokenAmount ?? 0
            } ${tokenName}`}</Text>
            {!!props.notionalAmount ? (
              <Text color="$textPlaceholder">{`≈ $${props.notionalAmount}`}</Text>
            ) : null}
          </Stack>
        </Box>
        <Box
          position="relative"
          gridArea="b"
          display={{ mobile: "none", tablet: "block", desktop: "block" }}
        >
          <NumberField
            size="lg"
            value={isControlled() ? props.amount : undefined}
            defaultValue={
              isControlled() ? props.amount : props.defaultAmount ?? 0
            }
            minValue={0}
            maxValue={toNumber(props.limited)}
            onInput={(event) => props?.onInput?.(event)}
            onChange={(value) => handleAmountChange(value)}
            inputClassName={styles.baseInput}
            formatOptions={{
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }}
          />
          <Stack
            attributes={{
              position: "absolute",
              alignItems: "center",
              right: "$6",
            }}
            className={styles.starContainer}
          >
            <Icon
              name="stargazePixel"
              size="$5xl"
              attributes={{ borderRadius: "$full", backgroundColor: "$black" }}
            />
            <Text
              fontWeight="$semibold"
              attributes={{ marginLeft: "$6", marginRight: "$4" }}
            >{`${props.tokenAmount ?? 0} ${tokenName}`}</Text>
            {!!props.notionalAmount ? (
              <Text color="$textSecondary">{`≈ $${props.notionalAmount}`}</Text>
            ) : null}
          </Stack>
        </Box>
        <Stack
          attributes={{
            gridArea: "c",
            paddingTop: { mobile: "$4", tablet: "$0", desktop: "$0" },
            marginBottom: { mobile: "$1", tablet: "$6", desktop: "$6" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack attributes={{ alignItems: "center", paddingBottom: "$1" }}>
            <Text
              color="$textSecondary"
              fontSize={{ mobile: "$2xs", tablet: "$sm", desktop: "$sm" }}
              attributes={{ marginRight: "$2" }}
            >
              Price:
            </Text>
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              fontSize={{ mobile: "$2xs", tablet: "$sm", desktop: "$sm" }}
            >{`${store
              .getState()
              ?.formatNumber?.({
                value: props?.priceDisplayAmount,
              })} ${tokenName}`}</Text>
          </Stack>
          <Text
            color="$textSecondary"
            fontSize={{ mobile: "$2xs", tablet: "$sm", desktop: "$sm" }}
          >{`Limited to ${store
            .getState()
            ?.formatNumber?.({ value: props?.limited })} tokens`}</Text>
        </Stack>
        <Box display={{ mobile: "block", tablet: "none", desktop: "none" }}>
          <Button
            size="md"
            intent="tertiary"
            fluidWidth
            disabled={props.isMintButtonDisabled}
            onClick={(event) => props?.onMint?.()}
            isLoading={props.isMintLoading}
          >{`${
            props.isMintButtonDisabled
              ? mintButtonDisabledLabel
              : mintButtonLabel
          }`}</Button>
        </Box>
        <Box
          gridArea="d"
          display={{ mobile: "none", tablet: "block", desktop: "block" }}
        >
          <Button
            size="lg"
            intent="tertiary"
            fluidWidth
            disabled={props.isMintButtonDisabled}
            onClick={(event) => props?.onMint?.()}
            isLoading={props.isMintLoading}
          >{`${
            props.isMintButtonDisabled
              ? mintButtonDisabledLabel
              : mintButtonLabel
          }`}</Button>
        </Box>
      </Box>
    </Stack>
  );
}
export default NftMint;
