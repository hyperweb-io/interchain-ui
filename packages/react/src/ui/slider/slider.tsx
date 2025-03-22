import clx from "clsx";
import * as React from "react";
import { SliderState, useSliderState } from "react-stately";

import Box from "@/ui/box";
import { BoxProps } from "@/ui/box/box.types";
import useTheme from "@/ui/hooks/use-theme";
import {
  AriaSliderProps,
  AriaSliderThumbProps,
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
} from "react-aria";
import * as styles from "./slider.css";

export interface SliderProps extends AriaSliderProps {
  name: string;
  fluidWidth?: boolean;
  width?: BoxProps["width"];
  previewPercent?: number;
  thumbTrackColor?: BoxProps["color"];
  previewTrackColor?: BoxProps["color"];
  renderLabel?: ({
    labelProps,
    outputProps,
    valuePercent,
    valueLabel,
  }: {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    outputProps: React.OutputHTMLAttributes<HTMLOutputElement>;
    valuePercent: number;
    valueLabel: string;
  }) => React.ReactNode;
  formatOptions?: Parameters<typeof useNumberFormatter>[0];
}

function clampPreviewProgressPercent(
  valuePercent: number,
  previewPercent: number,
) {
  const totalPercent = valuePercent + previewPercent;

  if (totalPercent > 1) {
    return 1 - valuePercent;
  }

  return totalPercent;
}

export default function Slider(props: SliderProps) {
  const trackRef = React.useRef(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);

  const state = useSliderState({
    ...props,
    numberFormatter,
    defaultValue: 0,
    minValue: 0,
    maxValue: 100,
  });

  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  return (
    <Box
      width={props.fluidWidth ? "100%" : props.width ?? "auto"}
      minWidth={props.fluidWidth ? "unset" : "300px"}
      attributes={{
        ...groupProps,
      }}
      className={clx(
        styles.slider,
        state.orientation === "horizontal"
          ? styles.sliderHorizontal
          : styles.sliderVertical,
      )}
    >
      {props.label && (
        <div className={styles.labelContainer}>
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </div>
      )}

      {!props.label &&
        typeof props.renderLabel === "function" &&
        props.renderLabel({
          labelProps,
          outputProps,
          valuePercent: state.getThumbPercent(0),
          valueLabel: state.getThumbValueLabel(0),
        })}

      <div
        {...trackProps}
        ref={trackRef}
        className={clx(
          state.orientation === "horizontal"
            ? styles.horizontalTrack
            : styles.verticalTrack,
        )}
        {...{
          "data-has-preview-track": !!(
            props.previewPercent != null && props.previewTrackColor
          ),
          "data-disabled": state.isDisabled ? "true" : "false",
        }}
      >
        <Box
          className={styles.trackProgress}
          backgroundColor={props.thumbTrackColor ?? "$progressBg"}
          rawCSS={{
            width: `${state.getThumbPercent(0) * 100}%`,
          }}
        />

        {props.previewPercent != null && props.previewTrackColor && (
          <Box
            className={styles.trackPreviewProgress}
            backgroundColor={props.previewTrackColor}
            rawCSS={{
              width: `calc(${
                clampPreviewProgressPercent(
                  state.getThumbPercent(0),
                  props.previewPercent / 100,
                ) * 100
              }%)`,
            }}
          />
        )}

        <Thumb index={0} state={state} trackRef={trackRef} name={props.name} />
      </div>
    </Box>
  );
}

export interface SliderThumbProps extends AriaSliderThumbProps {
  state: SliderState;
  trackRef: React.RefObject<HTMLDivElement>;
  index: number;
}

function Thumb(props: SliderThumbProps) {
  const { state, trackRef, index, name } = props;
  const { theme } = useTheme();

  const inputRef = React.useRef(null);
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state,
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...thumbProps}
      className={clx(styles.sliderThumb)}
      {...{
        "data-theme": theme,
        "data-dragging": isDragging ? "true" : "false",
        "data-focused": isFocusVisible ? "true" : "false",
        "data-direction": state.orientation,
      }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}
