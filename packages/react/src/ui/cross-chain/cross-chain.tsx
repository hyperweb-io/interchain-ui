import * as React from "react";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import type { CrossChainProps } from "./cross-chain.types";

function CrossChain(props: CrossChainProps) {
  return (
    <Box {...props.attributes} className={props.className}>
      <AssetListHeader
        title={props.title}
        multiChainHeader={props.multiChainHeader}
        depositButtonLabel={props.depositButtonLabel}
        withdrawButtonLabel={props.withdrawButtonLabel}
        onDeposit={(event) => props.onDeposit?.()}
        onWithdraw={(event) => props.onWithdraw?.()}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{
          my: "$9",
        }}
      >
        {props.listTitle}
      </Text>
      <AssetList needChainSpace isOtherChains={false} list={props.list} />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{
          marginTop: "$15",
          marginBottom: "$9",
        }}
      >
        {props.otherListTitle}
      </Text>
      <AssetList needChainSpace isOtherChains list={props.otherList} />
    </Box>
  );
}

export default CrossChain;
