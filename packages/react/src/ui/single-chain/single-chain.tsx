import * as React from "react";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import Skeleton from "../skeleton";
import Reveal from "../reveal";
import type { SingleChainProps } from "./single-chain.types";

function SingleChain(props: SingleChainProps) {
  return (
    <Box {...props.attributes} className={props.className}>
      {!props.isLoading ? (
        <>
          <AssetListHeader
            title={props.title}
            singleChainHeader={props.singleChainHeader}
            depositButtonLabel={props.depositButtonLabel}
            withdrawButtonLabel={props.withdrawButtonLabel}
            showDeposit={props.showDeposit}
            showWithdraw={props.showWithdraw}
            onDeposit={(event) => props.onDeposit?.()}
            onWithdraw={(event) => props.onWithdraw?.()}
          />
          <Text
            color="$textSecondary"
            fontSize="$lg"
            fontWeight="$semibold"
            attributes={{
              marginTop: "$10",
              marginBottom: "$9",
            }}
          >
            {props.listTitle}
          </Text>
          {props.list.length > 4 ? (
            <Reveal hideThresholdHeight={400}>
              <AssetList
                needChainSpace={false}
                isOtherChains={false}
                list={props.list}
              />
            </Reveal>
          ) : null}
          {props.list.length <= 4 ? (
            <AssetList
              needChainSpace={false}
              isOtherChains={false}
              list={props.list}
            />
          ) : null}
        </>
      ) : null}
      {!!props.isLoading ? (
        <>
          <Box backgroundColor="$cardBg" borderRadius="$lg" p="$10">
            <Text
              fontWeight="$semibold"
              attributes={{
                marginBottom: "$4",
              }}
            >
              {props.title}
            </Text>
            <Skeleton height="$12" width="40%" />
          </Box>
          <Box px="$6">
            <Text
              color="$textSecondary"
              fontSize="$lg"
              fontWeight="$semibold"
              attributes={{
                marginTop: "$10",
                marginBottom: "$9",
              }}
            >
              {props.listTitle}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="$10">
            {[...Array(5).keys()]?.map((item) => (
              <Box display="flex" gap="$10" key={item}>
                <Skeleton borderRadius="$full" height="$14" width="$14" />
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="$2"
                  justifyContent="center"
                >
                  <Skeleton height="$8" width="$15" />
                  <Skeleton height="$8" width="$17" />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="$2"
                  justifyContent="center"
                  width="30%"
                >
                  <Skeleton height="$8" width="100%" />
                  <Skeleton height="$8" width="80%" />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export default SingleChain;
