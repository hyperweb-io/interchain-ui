import * as React from "react";
import clx from "clsx";
import Box from "@/ui/box";
import Text from "@/ui/text";
import { useRadio, useFocusRing, VisuallyHidden } from "react-aria";
import { RadioContext } from "../governance-radio-group/governance-radio-group.context";
import * as styles from "./governance-radio.css";
import { standardTransitionProperties } from "@/ui/shared/shared.css";
import type { GovernanceRadioProps } from "./governance-radio.types";

const defaultCircle = {
  cx: "8.33301",
  cy: "8",
  r: "7.33333",
  strokeWidth: "1.33333",
};

const selectedCircle = {
  cx: "8.66699",
  cy: "8",
  r: "6",
  strokeWidth: "4",
};

export default function GovernanceRadio(props: GovernanceRadioProps) {
  const { children } = props;
  const state = React.useContext(RadioContext);
  const ref = React.useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Box
      as="label"
      display="flex"
      alignItems="center"
      minWidth="100px"
      padding={{
        mobile: "$4",
        tablet: "$10",
        desktop: "$10",
      }}
      width="auto"
      height="48px"
      borderRadius="$md"
      borderColor={
        isFocusVisible
          ? "$blue400"
          : isDisabled
          ? "transparent"
          : "$inputBorder"
      }
      flex={{
        mobile: "1",
        tablet: "1",
        desktop: "none",
      }}
      borderWidth="1px"
      borderStyle="$solid"
      backgroundColor={isSelected && !isDisabled ? "$inputBg" : "$cardBg"}
      className={standardTransitionProperties}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width="17" height="16" viewBox="0 0 17 16" aria-hidden="true">
        <circle
          fill="none"
          {...(isSelected ? selectedCircle : defaultCircle)}
          className={clx(
            isDisabled
              ? styles.radioCircleDisabled
              : isSelected
              ? styles.radioCircleSelected
              : styles.radioCircleDefault
          )}
        />
      </svg>

      <Text
        as="div"
        fontSize="$sm"
        fontWeight="$semibold"
        color="$text"
        attributes={{
          marginLeft: "$6",
        }}
      >
        {children}
      </Text>
    </Box>
  );
}
