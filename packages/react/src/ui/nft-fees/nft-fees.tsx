import * as React from "react";
import { useState, useEffect } from "react";
import { isNil, cloneDeep } from "lodash";
import Stack from "../stack";
import Text from "../text";
import Tooltip from "../tooltip";
import Icon from "../icon";
import Box from "../box";
import { NftFeesProps, NftFeeItemProps } from "./nft-fees.types";

function NftFees(props: NftFeesProps) {
  const [fees, setFees] = useState(() => [
    {
      feeName: "Listing Fee",
      amount: "",
      desc: "50% burned, 50% to stakers",
      show: false,
      amountKey: "listFee",
    },
    {
      feeName: "Creator Royalties",
      amount: "",
      desc: "Paid to creators when selling your item",
      show: false,
      amountKey: "royalities",
    },
    {
      feeName: "Fair Burn",
      amount: "",
      desc: "50% burned, 50% to stakers",
      show: false,
      amountKey: "fairBurn",
    },
    {
      feeName: "Proceeds",
      amount: "",
      desc: "Proceeds = Sale Price - Fees",
      show: false,
      amountKey: "proceeds",
    },
  ]);

  useEffect(() => {
    let list = [];
    cloneDeep(fees).forEach((item: NftFeeItemProps) => {
      if (!isNil(props[item.amountKey])) {
        item.amount = props[item.amountKey] ?? 0;
        list.push(item);
      }
    });
    setFees(list);
  }, [props.listFee, props.royalities, props.fairBurn, props.proceeds]);

  return (
    <Box>
      <Text
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{
          marginBottom: "$8",
        }}
      >
        {props.title}
      </Text>
      <Box
        display="grid"
        rowGap="$5"
        columnGap={{
          mobile: "$4",
          tablet: "$8",
        }}
        gridTemplateColumns={{
          mobile: "repeat(auto-fit, minmax(180px, 1fr))",
          mdMobile: "repeat(2, 1fr)",
        }}
      >
        {fees?.map((item, index) => (
          <Box key={item.feeName}>
            <Stack
              attributes={{
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <Stack
                space="$0"
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text
                  color="$textSecondary"
                  fontSize="$xs"
                  attributes={{
                    marginRight: "$3",
                  }}
                >
                  {item.feeName}
                </Text>
                <Tooltip title={item?.desc}>
                  <Icon
                    name="informationLine"
                    size="$md"
                    color="$textSecondary"
                  />
                </Tooltip>
              </Stack>
              <Text
                fontSize="$xs"
                fontWeight={index === 3 ? "$semibold" : "$normal"}
              >{`${item?.amount} ${props.symbol}`}</Text>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default NftFees;
