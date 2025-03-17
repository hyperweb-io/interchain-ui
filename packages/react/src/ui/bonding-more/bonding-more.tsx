import * as React from "react";
import { useState } from "react";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import * as styles from "./bonding-more.css";
import { BondingMoreProps } from "./bonding-more.types";
import NumberField from "../number-field";

function BondingMore(props: BondingMoreProps) {
  const [btnText, setBtnText] = useState(() => "Amount is empty");

  const [disabled, setDisabled] = useState(() => true);

  function handleInputChange(value: number) {
    if (value === 0) {
      setDisabled(true);
      setBtnText("Amount is zero");
    } else if (new BigNumber(value).gt(props.available)) {
      setDisabled(true);
      setBtnText("Insufficient amount");
    } else {
      setDisabled(false);
      setBtnText("Bond");
    }
    props?.onChange(value);
  }

  return (
    <Box className={styles.container}>
      <Stack direction="vertical" space="$0">
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">{props.bondingName}</Text>
        </Stack>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          paddingTop: "$13",
          justifyContent: "space-between",
        }}
      >
        <Text color="$textSecondary" fontSize="$lg" fontWeight="$semibold">
          <label htmlFor="bonding-input">Amount to bound</label>
        </Text>
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">Available LP Token</Text>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              marginLeft: "$3",
            }}
          >
            {props.available}
          </Text>
        </Stack>
      </Stack>
      <Box marginBottom="$10" marginTop="$5">
        <NumberField
          id="bonding-input"
          minValue={0}
          value={props?.value}
          onChange={(value) => handleInputChange(value)}
        />
      </Box>
      <Button
        intent="tertiary"
        size="lg"
        fluidWidth
        disabled={disabled}
        onClick={(event) => props?.onBond?.()}
        isLoading={props.isLoading}
      >
        {btnText}
      </Button>
    </Box>
  );
}

export default BondingMore;
