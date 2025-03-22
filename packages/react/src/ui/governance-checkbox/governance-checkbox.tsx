import * as React from "react";
import { useToggleState } from "react-stately";
import { useCheckbox, useFocusRing, VisuallyHidden } from "react-aria";
import Box from "@/ui/box";
import Stack from "@/ui/stack";
import type { GovernanceCheckboxProps } from "./governance-checkbox.types";

export default function GovernanceCheckbox(props: GovernanceCheckboxProps) {
  const state = useToggleState(props);
  const ref = React.useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isSelected =
    state.isSelected && !props.isIndeterminate && !props.isRejected;

  return (
    <Box
      as="label"
      display="flex"
      alignItems="center"
      fontFamily="$body"
      fontSize="$sm"
      fontWeight="$normal"
      color="$text"
      opacity={props.isDisabled ? 0.4 : 1}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <Stack
        direction="horizontal"
        space="$4"
        attributes={{
          alignItems: "center",
        }}
      >
        <svg width={16} height={16} viewBox="0 0 18 18" aria-hidden="true">
          {isSelected && (
            <>
              <path
                d="M4 17.0001C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4Z"
                fill="#E5FFE4"
              />
              <path
                d="M12 7L7.5253 11L6 9.63651M17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4Z"
                fill="#E5FFE4"
                stroke="#36BB35"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {props.isIndeterminate && (
            <>
              <path
                d="M4.5 17.0001C2.84315 17.0001 1.5 15.6569 1.5 14.0001V4C1.5 2.34315 2.84315 1 4.5 1H14.5C16.1569 1 17.5 2.34315 17.5 4L17.5 14.0001C17.5 15.6569 16.1569 17.0001 14.5 17.0001H4.5Z"
                fill="#E0E5ED"
              />
              <path
                d="M6.5 9H12.5M17.5 4L17.5 14.0001C17.5 15.6569 16.1569 17.0001 14.5 17.0001H4.5C2.84315 17.0001 1.5 15.6569 1.5 14.0001V4C1.5 2.34315 2.84315 1 4.5 1H14.5C16.1569 1 17.5 2.34315 17.5 4Z"
                fill="#E0E5ED"
                stroke="#697584"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {props.isRejected && (
            <>
              <path
                d="M4 17.0001C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4Z"
                fill="#FFDBDB"
              />
              <path
                d="M11.8284 6.17157L9 9M9 9L6.17157 11.8284M9 9L11.8284 11.8284M9 9L6.17157 6.17157M17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4Z"
                fill="#FFDBDB"
                stroke="#C73636"
                strokeWidth="1.66667"
                strokeLinecap="round"
              />
            </>
          )}

          {isFocusVisible && (
            <rect
              x={1}
              y={1}
              width={22}
              height={22}
              fill="none"
              stroke="orange"
              strokeWidth={2}
            />
          )}
        </svg>

        <Box as="p">{props.children}</Box>
      </Stack>
    </Box>
  );
}
