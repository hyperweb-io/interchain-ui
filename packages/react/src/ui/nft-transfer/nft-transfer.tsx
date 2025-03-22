import * as React from "react";
import { useState } from "react";
import Box from "../box";
import Text from "../text";
import TextField from "../text-field";
import Button from "../button";
import type { NftTransferProps } from "./nft-transfer.types";

function NftTransfer(props: NftTransferProps) {
  const {
    placeholder = "Enter address",
    transferLabel = "Transfer",
    cancelLabel = "Cancel",
    label = "Recipient",
  } = props;
  const [address, setAddress] = useState(() => "");
  return (
    <Box className={props.className}>
      <Text
        fontSize="$lg"
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{ marginTop: "$5", marginBottom: "$6" }}
      >
        {label}
      </Text>
      <TextField
        id={props.id}
        placeholder={placeholder}
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          props.onChange?.(e.target.value);
        }}
      />
      <Box height="$14" />
      <Button
        intent="tertiary"
        size="lg"
        fluidWidth
        disabled={props.disabled}
        onClick={(event) => props.onTransfer?.()}
      >
        {transferLabel}
      </Button>
      <Button
        variant="unstyled"
        size="lg"
        fluidWidth
        onClick={(event) => props.onCancel?.()}
      >
        {cancelLabel}
      </Button>
    </Box>
  );
}

export default NftTransfer;
