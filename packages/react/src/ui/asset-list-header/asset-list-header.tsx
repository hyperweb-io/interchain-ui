import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import type { AssetListHeaderProps } from "./asset-list-header.types";

function AssetListHeader(props: AssetListHeaderProps) {
  const {
    showDeposit = true,
    showWithdraw = true,
    withdrawButtonLabel = "Withdraw",
    depositButtonLabel = "Deposit",
  } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      {...props.attributes}
      className={props.className}
    >
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {props.title}
      </Text>
      {props.multiChainHeader ? (
        <Box
          display="grid"
          gap="$10"
          gridTemplateAreas={{
            mobile: `
              "card1 card1"
              "card2 card2"
              "btn1 btn2"
            `,
            mdMobile: `
              "card1 card2"
              "btn1 btn2"
            `,
            tablet: `
              "card1 card2 btn1"
              "card1 card2 btn2"
            `,
          }}
        >
          {props.multiChainHeader?.map((item, index) => (
            <Box
              backgroundColor="$cardBg"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              borderRadius="$lg"
              py="$11"
              px="$10"
              key={item.label}
              gridArea={`card${index + 1}`}
            >
              <Text color="$textSecondary" fontWeight="$semibold">
                {item.label}
              </Text>
              <Stack attributes={{ alignItems: "baseline" }}>
                <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
                  $
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {item.value}
                </Text>
              </Stack>
            </Box>
          ))}
          {!!props.onWithdraw ? (
            <Box
              gridArea="btn1"
              maxWidth={{ tablet: "$29" }}
              flex={{ mobile: "1", tablet: "auto" }}
            >
              <Button
                variant="outlined"
                intent="secondary"
                fluidWidth
                onClick={(event) => props.onWithdraw?.()}
              >
                {withdrawButtonLabel ?? "Withdraw"}
              </Button>
            </Box>
          ) : null}
          {!!props.onDeposit ? (
            <Box
              gridArea="btn2"
              maxWidth={{ tablet: "$29" }}
              flex={{ mobile: "1", tablet: "auto" }}
            >
              <Button
                intent="tertiary"
                fluidWidth
                onClick={(event) => props.onDeposit?.()}
              >
                {depositButtonLabel ?? "Deposit"}
              </Button>
            </Box>
          ) : null}
        </Box>
      ) : null}
      {props.singleChainHeader ? (
        <Box
          display="flex"
          flexWrap="wrap"
          gap="$10"
          justifyContent="space-between"
          alignItems="center"
          width="auto"
          minHeight="$21"
          py="$10"
          px="$10"
          backgroundColor="$cardBg"
          borderRadius="$lg"
        >
          <Stack direction="vertical">
            <Text>{props.singleChainHeader.label}</Text>
            <Stack attributes={{ alignItems: "baseline" }}>
              <Text fontWeight="$semibold">$</Text>
              <Text fontSize="$4xl" fontWeight="$semibold">
                {props.singleChainHeader.value}
              </Text>
            </Stack>
          </Stack>
          <Box
            display="flex"
            flex="1"
            alignItems="center"
            justifyContent={{ mobile: "space-between", tablet: "flex-end" }}
            gap={{ mobile: "$6", tablet: "$12", desktop: "$12" }}
          >
            {typeof props.onWithdraw === "function" && showWithdraw ? (
              <Box
                flex={{ mobile: "1", tablet: "0 0 auto" }}
                width={{ mobile: "auto", tablet: "$25", desktop: "$25" }}
              >
                <Button
                  variant="outlined"
                  intent="secondary"
                  fluidWidth
                  onClick={(event) => props.onWithdraw?.()}
                >
                  {withdrawButtonLabel}
                </Button>
              </Box>
            ) : null}
            {typeof props.onDeposit === "function" && showDeposit ? (
              <Box
                flex={{ mobile: "1", tablet: "0 0 auto" }}
                width={{ mobile: "auto", tablet: "$25", desktop: "$25" }}
              >
                <Button
                  intent="tertiary"
                  fluidWidth
                  onClick={(event) => props.onDeposit?.()}
                >
                  {depositButtonLabel}
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
export default AssetListHeader;
