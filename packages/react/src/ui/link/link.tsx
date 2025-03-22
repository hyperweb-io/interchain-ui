import * as React from "react";
import clx from "clsx";
import Box from "../box";
import type { LinkProps } from "./link.types";

function Link(props: LinkProps) {
  const { as = "a", underline = true, rel = "noopener noreferrer" } = props;
  return (
    <Box
      fontFamily="$body"
      fontSize="$sm"
      as={as}
      backgroundColor={props.background ? "$cardBg" : undefined}
      p={props.background ? "$2" : undefined}
      borderRadius={props.background ? "$md" : undefined}
      color={props.color ? props.color : { base: "$link", hover: "$link" }}
      textDecoration={{ base: "none", hover: underline ? "underline" : "none" }}
      attributes={{
        ...props.attributes,
        href: props.href,
        target: props.target,
        rel: rel,
      }}
      className={clx(props.className)}
    >
      {props.children}
    </Box>
  );
}

export default Link;
