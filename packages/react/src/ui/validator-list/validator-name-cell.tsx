import * as React from "react";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import type { ValidatorNameCellProps } from "./validator-list.types";

function ValidatorNameCell(props: ValidatorNameCellProps) {
  const { size = "md" } = props;
  return (
    <>
      {size === "sm" ? (
        <>
          <Stack
            direction="horizontal"
            space="$10"
            attributes={{ alignItems: "center", minWidth: "$28" }}
          >
            {props.validatorId ? (
              <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
                {props.validatorId}
              </Text>
            ) : null}
            <Box
              as="img"
              width="$11"
              height="$11"
              attributes={{ src: props.validatorImg, alt: props.validatorName }}
            />
            <Text fontWeight="$semibold">{props.validatorName}</Text>
          </Stack>
        </>
      ) : (
        <>
          <Stack
            direction="horizontal"
            space="$10"
            attributes={{ alignItems: "center", minWidth: "$28" }}
          >
            {props.validatorId ? (
              <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
                {props.validatorId}
              </Text>
            ) : null}
            <Box
              as="img"
              width="$14"
              height="$14"
              attributes={{ src: props.validatorImg, alt: props.validatorName }}
            />
            <Text fontWeight="$semibold">{props.validatorName}</Text>
          </Stack>
        </>
      )}
    </>
  );
}
export default ValidatorNameCell;
