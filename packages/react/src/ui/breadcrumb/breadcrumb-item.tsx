import * as React from "react";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import type { BreadcrumbItemProps } from "./breadcrumb.types";
import * as styles from "./breadcrumb.css";

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const {
    isLast = false,
    gapLeft = "16px",
    primaryColor = "$text",
    secondaryColor = "$textSecondary",
    separator = "/",
  } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      fontWeight="$medium"
      lineHeight="$normal"
      textDecoration="none"
      as={props.as ?? "a"}
      gap={gapLeft}
      attributes={{
        href: props.href,
        download: props.download,
        ref: props.linkRef,
        target: props.target,
        type: props.type,
      }}
    >
      <Box
        as="span"
        whiteSpace={isLast ? "normal" : "nowrap"}
        className={clx({ [styles.lineClamp]: isLast })}
      >
        <Text
          as="span"
          fontSize="$md"
          color={{
            //@ts-expect-error
            base: isLast ? primaryColor : secondaryColor, //@ts-expect-error
            hover: primaryColor,
          }}
          className={clx({ [styles.pointer]: isLast })}
        >
          {props.name}
        </Text>
      </Box>
      {!isLast ? (
        <Text fontSize="$md" color={secondaryColor}>
          {separator}
        </Text>
      ) : null}
    </Box>
  );
}

export default BreadcrumbItem;
