import * as React from "react";
import clx from "clsx";
import Box from "../box";
import Stack from "../stack";
import type { FieldLabelProps } from "./field-label.types";
import { fieldLabelSizes, fieldlabelStyle } from "./field-label.css";

function FieldLabel(props: FieldLabelProps) {
  const { size = "sm" } = props;
  return (
    <>
      {props.label ? (
        <>
          <Stack space="2" attributes={props.attributes}>
            {props.label ? (
              <Box as="span" display="flex" justifyContent="space-between">
                {props.htmlFor === false ? (
                  <p
                    {...props.labelAttributes}
                    className={clx(fieldlabelStyle, fieldLabelSizes[size])}
                  >
                    <span>{props.label}</span>
                  </p>
                ) : (
                  <label
                    id={props.id}
                    htmlFor={props.htmlFor as any}
                    {...props.labelAttributes}
                  >
                    <span
                      className={clx(fieldlabelStyle, fieldLabelSizes[size])}
                    >
                      {props.label}
                    </span>
                  </label>
                )}
              </Box>
            ) : null}
          </Stack>
        </>
      ) : null}
    </>
  );
}
export default FieldLabel;
