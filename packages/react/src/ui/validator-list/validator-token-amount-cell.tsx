import * as React from "react";
import Box from "../box";
import Text from "../text";
import BigNumber from "bignumber.js";
import { formatIntlNumber } from "../../helpers/number";
import type { ValidatorTokenAmountCellProps } from "./validator-list.types";

function ValidatorTokenAmountCell(props: ValidatorTokenAmountCellProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap="$2"
      {...props.attributes}
      className={props.className}
    >
      <Text fontWeight="$semibold" fontSize="$sm" wordBreak="keep-all">
        {formatIntlNumber(
          new BigNumber(props.amount).toNumber(),
          null,
          props.formatOptions
        )}
      </Text>
      {!!props.symbol ? (
        <Text
          fontWeight="$normal"
          fontSize="$sm"
          color="$textSecondary"
          wordBreak="keep-all"
        >
          {props.symbol}
        </Text>
      ) : null}
    </Box>
  );
}

export default ValidatorTokenAmountCell;
