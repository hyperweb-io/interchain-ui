import * as React from "react";

export interface CellWithTitleProps {
  title: string;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}

import Stack from "../stack";
import Text from "../text";
import Box from "../box";

function CellWithTitle(props: CellWithTitleProps) {
  return (
    <Box width="$full" className={props.className}>
      <Stack
        direction="vertical"
        space="$2"
        attributes={{
          justifyContent: "center",
          width: "$full",
        }}
      >
        <Text
          color="$textSecondary"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
          className={props.innerClassName}
        >
          {props.title}
        </Text>
        {props.children}
      </Stack>
    </Box>
  );
}

export default CellWithTitle;
