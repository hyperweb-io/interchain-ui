import * as React from "react";
import clx from "clsx";
import Icon from "../icon";
import { loader } from "./spinner.css";
import type { SpinnerProps } from "./spinner.types";

function Spinner(props: SpinnerProps) {
  function combinedClassName() {
    return clx(loader, props.className);
  }

  return (
    <Icon
      name="loaderLine"
      size={props.size}
      title={props.title}
      color={props.color}
      attributes={props.attributes}
      className={combinedClassName()}
    />
  );
}

export default Spinner;
