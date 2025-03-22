import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { GovernanceResultCardProps } from "./governance.types";

function GovernanceResultCard(props: GovernanceResultCardProps) {
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");

  function getColors() {
    const textColors: Record<
      GovernanceResultCardProps["resultType"],
      Sprinkles["color"]
    > = {
      passed: "$textSuccess",
      rejected: theme === "light" ? "$textDanger" : "$red700",
      info: "$text",
    };
    const bgColors: Record<
      GovernanceResultCardProps["resultType"],
      Sprinkles["color"]
    > = {
      passed: "$rewardBg",
      rejected: theme === "light" ? "$red100" : "$red200",
      info: "$cardBg",
    };
    return {
      textColor: textColors[props.resultType],
      bgColor: bgColors[props.resultType],
    };
  }

  useEffect(() => {
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState, prevState) => {
      setTheme(newState.theme);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="192px"
      height="124px"
      p="$10"
      borderRadius="$md"
      {...props.attributes}
      backgroundColor={getColors().bgColor}
      color={getColors().textColor}
      className={props.className}
    >
      <Stack
        direction="vertical"
        space="$6"
        attributes={{
          justifyContent: "space-between",
          marginBottom: "$6",
        }}
      >
        <Text color="inherit" fontSize="$md" fontWeight="$semibold">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="$6"
          >
            {props.resultType !== "info" ? (
              <>
                {props.resultType === "passed" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <Box
                      as="path"
                      fill="transparent"
                      attributes={{
                        d: "M4 17C2.34315 17 1 15.6569 1 14V3.99995C1 2.3431 2.34315 0.999954 4 0.999954H14C15.6569 0.999954 17 2.3431 17 3.99995L17 14C17 15.6569 15.6569 17 14 17H4Z",
                      }}
                    />
                    <Box
                      as="path"
                      stroke={getColors().textColor}
                      attributes={{
                        d: "M12 6.99995L7.5253 11L6 9.63646M17 3.99995L17 14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V3.99995C1 2.3431 2.34315 0.999954 4 0.999954H14C15.6569 0.999954 17 2.3431 17 3.99995Z",
                        "stroke-width": "1.66667",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }}
                    />
                  </svg>
                ) : null}
                {props.resultType === "rejected" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <Box
                      as="path"
                      fill="transparent"
                      attributes={{
                        d: "M4 17.0001C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4Z",
                      }}
                    />
                    <Box
                      as="path"
                      stroke={getColors().textColor}
                      attributes={{
                        d: "M11.8284 6.17157L9 9M9 9L6.17157 11.8284M9 9L11.8284 11.8284M9 9L6.17157 6.17157M17 4L17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001H4C2.34315 17.0001 1 15.6569 1 14.0001V4C1 2.34315 2.34315 1 4 1H14C15.6569 1 17 2.34315 17 4Z",
                        "stroke-width": "1.66667",
                        "stroke-linecap": "round",
                      }}
                    />
                  </svg>
                ) : null}
              </>
            ) : null}
            <Box as="span">{props.label}</Box>
          </Box>
        </Text>
        <Text
          color="inherit"
          fontSize="$md"
          fontWeight="$semibold"
          textAlign="center"
        >{`${props.votePercentage}%`}</Text>
      </Stack>
    </Box>
  );
}

export default GovernanceResultCard;
