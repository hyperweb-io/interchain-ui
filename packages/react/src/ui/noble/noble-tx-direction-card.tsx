import * as React from "react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { NobleTxDirectionCardProps } from "./noble.types";
import { truncateTextMiddle } from "../../helpers/string";

function NobleTxDirectionCard(props: NobleTxDirectionCardProps) {
  const { addressDisplayLength = 18 } = props;
  const [copied, setCopied] = useState(() => false);
  function onCopy() {
    const success = copy(props.address);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }
  function truncate(text: string) {
    return truncateTextMiddle(text, addressDisplayLength);
  }
  return (
    <Box>
      <Text color="$textSecondary" fontSize="$sm" lineHeight="1.4">
        {props.direction}
      </Text>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        lineHeight="1.4"
        attributes={{ mb: "$2" }}
      >
        {props.chainName}
      </Text>
      <Box display="flex" alignItems="center" gap="$5">
        <Box
          as="img"
          borderRadius="$full"
          width="18px"
          height="18px"
          attributes={{ src: props.logoUrl, alt: props.chainName }}
        />
        <Text color="$textSecondary" fontSize="$xs">
          {truncate(props.address)}
        </Text>
        {!copied ? (
          <Box cursor="pointer" attributes={{ onClick: onCopy }}>
            <Icon name="copy" color="$textSecondary" size="$md" />
          </Box>
        ) : (
          <>
            <Icon name="checkLine" size="$md" color="$textSuccess" />
          </>
        )}
      </Box>
    </Box>
  );
}

export default NobleTxDirectionCard;
