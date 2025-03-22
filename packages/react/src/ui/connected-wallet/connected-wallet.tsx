import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import ClipboardCopyText from "../clipboard-copy-text";
import type { ConnectedWalletProps } from "./connected-wallet.types";

function ConnectedWallet(props: ConnectedWalletProps) {
  const {
    truncate = "middle",
    midTruncateLimit = "sm",
    btnText = "My Wallet",
  } = props;
  return (
    <Box width="$fit" px="$8" py="$15">
      <Stack direction="vertical" attributes={{ alignItems: "center" }}>
        {props.avatar ? (
          <Box
            as="img"
            borderRadius="$full"
            width="$18"
            height="$18"
            marginTop="$5"
            attributes={{ src: props.avatar }}
          />
        ) : (
          <>
            <Icon
              name="astronaut"
              size="$13xl"
              attributes={{ borderRadius: "$full", marginTop: "$5" }}
            />
          </>
        )}
        <Text
          fontSize="$xl"
          fontWeight="$semibold"
          attributes={{ marginTop: "$8", marginBottom: "$8" }}
        >
          {props.name}
        </Text>
        <Box marginBottom="$8">
          <ClipboardCopyText
            text={props.address}
            truncate={truncate}
            midTruncateLimit={midTruncateLimit}
            onCopied={(event) => props?.onCopied?.()}
          />
        </Box>
        <Button onClick={(event) => props.onClick?.()}>{btnText}</Button>
      </Stack>
    </Box>
  );
}

export default ConnectedWallet;
