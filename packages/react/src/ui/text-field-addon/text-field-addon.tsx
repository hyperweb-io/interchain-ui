import * as React from "react";
import clx from "clsx";
import {
  textFieldAddon,
  textFieldAddonSizes,
  textFieldAddonPositions,
  textFieldAddonDivider,
} from "./text-field-addon.css";
import type { TextFieldAddonProps } from "./text-field-addon.types";

function TextFieldAddon(props: TextFieldAddonProps) {
  const { divider = false, intent = "default", disabled = false } = props;
  return (
    <div
      className={clx(
        textFieldAddon,
        textFieldAddonSizes[props.size],
        textFieldAddonPositions[props.position],
        divider ? textFieldAddonDivider[props.position] : null,
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export default TextFieldAddon;
