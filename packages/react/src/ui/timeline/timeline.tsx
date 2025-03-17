import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import * as styles from "./timeline.css";
import { store, UIState } from "../../models/store";
import type { TimelineProps } from "./timeline.types";

function Timeline(props: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [timelineHeight, setTimelineHeight] = useState(() => 0);

  function updateTimelineHeight() {
    if (timelineRef.current) {
      const height = timelineRef.current.scrollHeight;
      setTimelineHeight(height);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      updateTimelineHeight();
    };
    window.addEventListener("resize", handleResize);
    const cleanupStore = store.subscribe((newState, prevState) => {
      setInternalTheme(newState.theme);
    });
    updateTimelineHeight();
    cleanupRef.current = () => {
      window.removeEventListener("resize", handleResize);
      cleanupStore();
    };
  }, []);

  useEffect(() => {
    updateTimelineHeight();
  }, [props.events]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$16"
      boxRef={timelineRef}
      minHeight={`${timelineHeight}px`}
      attributes={{
        "data-testid": "timeline",
      }}
      className={styles.timeline}
    >
      {props.events?.map((event, index) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          attributes={{
            "data-is-even": index % 2 === 0,
          }}
          className={clx(props.className, styles.eventItemsContainer)}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            attributes={{
              "data-testid": "event-item",
            }}
            className={styles.eventItem}
          >
            <Box
              backgroundColor="$cardBg"
              borderColor="$divider"
              borderStyle="solid"
              borderWidth="1px"
              borderRadius="$md"
              boxShadow="$sm"
              p={event.customContent ? "$0" : "$8"}
              attributes={{
                "data-testid": "event-content",
              }}
              className={clx(
                styles.eventContent,
                index % 2 === 0
                  ? styles.eventContentArrowRight
                  : styles.eventContentArrowLeft,
                index % 2 === 0
                  ? styles.eventContentRight
                  : styles.eventContentLeft
              )}
            >
              {!event.customContent ? (
                <Box display="flex" flexDirection="column" gap="$9">
                  <Text
                    color="$textSecondary"
                    fontWeight="$normal"
                    fontSize="$md"
                    {...event.eventTimestampProps}
                  >
                    {event.timestamp}
                  </Text>
                  <Text
                    color="$text"
                    fontWeight="$medium"
                    fontSize="$3xl"
                    {...event.eventTitleProps}
                  >
                    {event.title}
                  </Text>
                  {event.description ? (
                    <Text
                      color="$text"
                      fontWeight="$medium"
                      fontSize="$md"
                      {...event.eventDescriptionProps}
                    >
                      {event.description}
                    </Text>
                  ) : null}
                </Box>
              ) : null}
              {event.customContent ? <div>{event.customContent}</div> : null}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            attributes={{
              "data-testid": "event-item-secondary",
              "data-direction": index % 2 === 0 ? "right" : "left",
              "aria-hidden": !event.secondaryContent,
            }}
            className={styles.eventItemSecondary}
          >
            {!!event.secondaryContent ? (
              <Box
                attributes={{
                  "data-testid": "event-content-secondary",
                }}
                className={clx(
                  index % 2 === 0
                    ? styles.eventContentLeft
                    : styles.eventContentRight
                )}
              >
                {event.secondaryContent}
              </Box>
            ) : null}
          </Box>
          <Box aria-hidden="true" className={styles.rowSeparator}>
            <div
              aria-hidden="true"
              data-direction={index % 2 === 0 ? "right" : "left"}
              className={styles.eventCircle}
            >
              <div
                data-theme={internalTheme}
                className={styles.eventCircleInner}
              />
            </div>
            <div
              aria-hidden="true"
              data-direction={index % 2 === 0 ? "right" : "left"}
              data-is-last={index === props.events.length - 1}
              className={styles.eventBar}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Timeline;
