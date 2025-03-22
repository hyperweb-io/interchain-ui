import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "../stack";
import Text from "../text";
import * as styles from "./circular-progress-bar.css";
import { CircularProgressBarProps } from "./circular-progress-bar.types";

function CicularProgressBar(props: CircularProgressBarProps) {
  const { width = 80 } = props;
  const [strokeWidth, setStrokeWidth] = useState(() => 0);
  const [radius, setRadius] = useState(() => 0);
  const [circumference, setCircumference] = useState(() => 0);
  const [offset, setOffset] = useState(() => 0);
  useEffect(() => {
    const _strokeWidth = 4;
    const _radius = width / 2;
    const _circumference = _radius * 2 * Math.PI;
    const _offset = _circumference - (props.progress / 100) * _circumference;
    setStrokeWidth(_strokeWidth);
    setRadius(_radius);
    setCircumference(_circumference);
    setOffset(_offset);
  }, []);
  useEffect(() => {
    const updatedOffset =
      circumference - (props.progress / 100) * circumference;
    setOffset(updatedOffset);
  }, [props.progress, circumference]);
  return (
    <div
      style={{ width: `${width}px`, height: `${width}px` }}
      className={styles.container}
    >
      <svg
        role="progressbar"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        aria-valuemax={100}
        aria-valuemin={0}
        height={width}
        width={width}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke-width={strokeWidth}
          className={styles.circle}
        />
        <circle
          cx="50"
          cy="50"
          data-testid="progress-bar-bar"
          r={radius}
          stroke-dasharray={`${circumference} ${circumference}`}
          stroke-dashoffset={offset}
          stroke-width={strokeWidth}
          className={styles.filledCircle}
        />
      </svg>
      <Stack
        attributes={{ alignItems: "center", justifyContent: "center" }}
        className={styles.percentText}
      >
        <Text fontSize="$lg" fontWeight="$semibold">
          {props.progress}%
        </Text>
      </Stack>
    </div>
  );
}

export default CicularProgressBar;
