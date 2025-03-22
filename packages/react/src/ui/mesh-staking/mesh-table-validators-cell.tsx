import * as React from "react";
import Box from "../box";
import type { MeshTableValidatorsCellProps } from "./mesh-staking.types";

function MeshTableValidatorsCell(props: MeshTableValidatorsCellProps) {
  return (
    <Box display="flex" position="relative" attributes={props.attributes}>
      {props.validators?.map((validator, index) => (
        <Box
          as="span"
          display="inline-block"
          overflow="hidden"
          width="26px"
          height="24px"
          borderRadius="$full"
          backgroundColor="$white"
          borderColor="$meshTableCellBorder"
          borderWidth="1px"
          borderStyle="solid"
          key={validator.name + index}
          flexShrink={0}
          flexGrow={0}
          marginLeft={index === 0 ? undefined : "-8px"}
        >
          <Box
            as="img"
            width="24px"
            height="24px"
            borderRadius="$full"
            attributes={{
              src: `${validator.imgSrc}`,
              alt: `validator-thumbnail-${index}`,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default MeshTableValidatorsCell;
