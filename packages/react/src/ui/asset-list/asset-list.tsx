import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import AssetListItem from "../asset-list-item";
import type { AssetListProps } from "./asset-list.types";
import type { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

function AssetList(props: AssetListProps) {
  const { isOtherChains = false, titles = ["Asset", "Balance"] } = props;
  return (
    <Box
      overflowX={{ mobile: "scroll", tablet: "auto", desktop: "auto" }}
      {...props.attributes}
      className={props.className}
    >
      <Box display="flex" flexDirection="column" minWidth="720px">
        <Stack>
          <Box width="$19" />
          <Stack space="$0" attributes={{ marginBottom: "$12", flex: 1 }}>
            <Text color="$textSecondary" attributes={{ width: "25%" }}>
              {titles[0]}
            </Text>
            {props.needChainSpace ? (
              <Box width="25%">
                {isOtherChains ? (
                  <Text color="$textSecondary">Chain</Text>
                ) : null}
              </Box>
            ) : null}
            <Text color="$textSecondary" attributes={{ width: "25%" }}>
              {titles[1]}
            </Text>
          </Stack>
        </Stack>
        <Stack space="$10" direction="vertical">
          {props.list?.map((item, index) => (
            <Box key={index}>
              <AssetListItem
                needChainSpace={props.needChainSpace}
                isOtherChains={isOtherChains}
                imgSrc={item.imgSrc}
                symbol={item.symbol}
                name={item.name}
                tokenAmount={item.tokenAmount}
                tokenAmountPrice={item.tokenAmountPrice}
                chainName={item?.chainName}
                showDeposit={item.showDeposit}
                showWithdraw={item.showWithdraw}
                onDeposit={(event) => item?.onDeposit()}
                onWithdraw={(event) => item?.onWithdraw()}
                withdrawLabel={item.withdrawLabel}
                depositLabel={item.depositLabel}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default AssetList;
