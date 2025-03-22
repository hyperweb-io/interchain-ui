import Text from "@/ui/text";
import { useRadioGroup, VisuallyHidden } from "react-aria";
import { useRadioGroupState } from "react-stately";
import { RadioContext } from "./governance-radio-group.context";
import type { GovernanceRadioGroupProps } from "./governance-radio-group.types";

export default function GovernanceRadioGroup(props: GovernanceRadioGroupProps) {
  const { children, label, description, errorMessage } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <VisuallyHidden>
        <span {...labelProps}>{label}</span>
      </VisuallyHidden>

      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>

      {description && (
        <Text domAttributes={descriptionProps} fontSize="$xs">
          {description}
        </Text>
      )}
      {errorMessage && state.isInvalid && (
        <Text domAttributes={errorMessageProps} fontSize="$xs" color="$red300">
          {errorMessage as React.ReactNode}
        </Text>
      )}
    </div>
  );
}
