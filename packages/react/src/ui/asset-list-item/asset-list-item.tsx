import * as React from "react";
import { useState, useEffect } from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import type { AssetListItemProps } from "./asset-list-item.types";
import type { BoxProps } from "../box/box.types";

function AssetListItem(props: AssetListItemProps) {
  const {
    isOtherChains = false,
    needChainSpace = false,
    showDeposit = true,
    showWithdraw = true,
    depositLabel = "Deposit",
    withdrawLabel = "Withdraw",
  } = props;
  const [size, setSize] = useState(() => "$xs");
  useEffect(() => {
    setSize(isOtherChains ? "$xs" : "$sm");
  }, [isOtherChains]);
  return (
    <Stack
      attributes={{ minWidth: "720px", alignItems: "center" }}
      className={props.className}
    >
      <Box width="$19">
        <Box
          as="img"
          attributes={{ src: props.imgSrc }}
          width={isOtherChains ? "$10" : "$14"}
          height={isOtherChains ? "$10" : "$14"}
        />
      </Box>
      <Stack attributes={{ alignItems: "center", flex: 1 }}>
        <Stack space="$0" direction="vertical" attributes={{ width: "25%" }}>
          <Text
            fontWeight="$semibold"
            fontSize={size}
            attributes={{ marginBottom: "$2" }}
          >
            {props.symbol}
          </Text>
          <Text color="$textSecondary" fontSize={size}>
            {props.name}
          </Text>
        </Stack>
        {needChainSpace ? (
          <Stack attributes={{ width: "25%" }}>
            {isOtherChains ? (
              <Text color="$textSecondary" fontSize={size}>
                {props.chainName}
              </Text>
            ) : null}
          </Stack>
        ) : null}
        <Stack space="$0" direction="vertical" attributes={{ width: "25%" }}>
          <Text
            fontWeight="$semibold"
            fontSize={size}
            attributes={{ marginBottom: "$2" }}
          >
            {props.tokenAmount}
          </Text>
          <Text color="$textSecondary" fontSize={size}>
            {props.tokenAmountPrice}
          </Text>
        </Stack>
        {!needChainSpace ? <Stack attributes={{ width: "25%" }} /> : null}
        <Stack
          space="$5"
          attributes={{ width: "25%", justifyContent: "flex-end" }}
        >
          {!!props.onDeposit && showDeposit ? (
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onDeposit?.(event)}
            >
              {depositLabel}
            </Button>
          ) : null}
          {!!props.onWithdraw && showWithdraw ? (
            <Button
              intent="text"
              size="sm"
              onClick={(event) => props?.onWithdraw?.(event)}
            >
              {withdrawLabel}
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default AssetListItem;
