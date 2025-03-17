import * as React from "react";

export interface APRProps {
  className?: string;
  apr: string;
  innerClassName: string;
  title?: string;
}

import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import IconButton from "../icon-button";

function APR(props: APRProps) {
  return (
    <Stack
      attributes={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "$full",
      }}
      className={props.className}
    >
      <Box>
        {!!props?.title ? (
          <Text
            color="$textSecondary"
            attributes={{
              marginBottom: "$2",
            }}
          >
            {props?.title}
          </Text>
        ) : null}
        <Text
          color="$text"
          fontWeight="$semibold"
          attributes={{
            marginRight: "$4",
          }}
        >
          {props.apr}%
        </Text>
      </Box>
      <IconButton
        variant="ghost"
        icon="verticalMore"
        intent="text"
        className={props.innerClassName}
      />
    </Stack>
  );
}

export default APR;
