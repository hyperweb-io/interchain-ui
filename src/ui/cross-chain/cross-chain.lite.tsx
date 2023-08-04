import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import ShowMore from "../show-more";
import * as styles from "./cross-chain.css";
import { CrossChainProps } from "./cross-chain.types";
import { TransferDetail } from "../transfer-item/transfer-item.types";

export default function CrossChain(props: CrossChainProps) {
  return (
    <Box className={styles.container}>
      <AssetListHeader
        isSingle={false}
        total={props.header.total}
        totalOnAll={props.header.totalOnAll}
        dropDownList={props.header.dropDownList}
        onDeposit={(detail: TransferDetail) =>
          props?.header?.onDeposit?.(detail)
        }
        onDepositCancel={() => props?.header?.onDepositCancel?.()}
        onWithdraw={(detail: TransferDetail) =>
          props?.header?.onWithdraw?.(detail)
        }
        onWithdrawCancel={() => props?.header?.onWithdrawCancel?.()}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ my: "$9" }}
      >
        On Osmosis
      </Text>
      <AssetList
        needChainSpace={true}
        isOtherChains={false}
        list={props.list}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ marginTop: "$15", marginBottom: "$9" }}
      >
        On other chains
      </Text>
      <AssetList
        needChainSpace={true}
        isOtherChains={true}
        list={props.otherList}
      />
    </Box>
  );
}
