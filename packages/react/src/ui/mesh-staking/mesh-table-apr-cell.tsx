import * as React from "react";
import Text from "../text";
import type { MeshTableAPRCellProps } from "./mesh-staking.types";

function MeshTableAPRCell(props: MeshTableAPRCellProps) {
  return (
    <Text
      fontSize="$sm"
      fontWeight="$medium"
      color="$textSuccess"
      attributes={props.attributes}
    >
      {props.value}
    </Text>
  );
}

export default MeshTableAPRCell;
