import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Icon from "../icon";
import Text from "../text";
import { formatNumeric } from "../../helpers/number";
import type { StarTextProps } from "./star-text.types";

function StarText(props: StarTextProps) {
  const { size = "md", tokenName = "STARS", showTokenIcon = true } = props;
  return (
    <Box
      attributes={{ ...props.attributes, onClick: () => props.onClick?.() }}
      className={props.className}
    >
      <Stack attributes={{ alignItems: "center" }}>
        {!!props.label ? (
          <Text
            color="$textSecondary"
            fontSize={size === "md" ? "$sm" : "$xl"}
            attributes={{ marginRight: "$3" }}
          >
            {props.label}
          </Text>
        ) : null}
        <Text
          fontWeight="$semibold"
          fontSize={size === "md" ? "$sm" : "$xl"}
          attributes={{ marginRight: "$3" }}
        >{`${formatNumeric(props.value, 2)} ${tokenName}`}</Text>
        {!props.iconSrc && showTokenIcon ? (
          <Icon
            name="stargazePixel"
            size="$md"
            attributes={{ borderRadius: "$full", backgroundColor: "$black" }}
          />
        ) : null}
        {typeof props.iconSrc === "string" && showTokenIcon ? (
          <Box
            width="$8"
            height="$8"
            as="img"
            borderRadius="$full"
            backgroundColor="$gray300"
            attributes={{ src: props.iconSrc, alt: "nft token icon" }}
          />
        ) : null}
      </Stack>
    </Box>
  );
}

export default StarText;
