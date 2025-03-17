import * as React from "react";
import clx from "clsx";
import Box from "../box";
import Icon from "../icon";
import * as styles from "./scroll-indicator.css";
import { ScrollIndicatorProps } from "./scroll-indicator.types";

function ScrollIndicator(props: ScrollIndicatorProps) {
  const { showShadow = true } = props;
  return (
    <Box
      width="$14"
      height="$14"
      backgroundColor="$white"
      borderRadius="$full"
      display="grid"
      alignItems="center"
      justifyContent="center"
      attributes={{ onClick: () => props.onClick() }}
      transform={`rotate(${props.direction === "left" ? 180 : 0}deg)`}
      className={clx(styles.indicator, showShadow ? styles.shadow : null)}
    >
      <Icon
        size="$md"
        name="arrowRightRounded"
        attributes={{ transform: "translateX(1px)" }}
      />
    </Box>
  );
}

export default ScrollIndicator;
