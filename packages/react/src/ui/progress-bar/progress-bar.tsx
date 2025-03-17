import * as React from "react";
import { useRef, useEffect } from "react";
import * as styles from "./progress-bar.css";
import { ProgressBarProps } from "./progress-bar.types";

function ProgressBar(props: ProgressBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current.style.backgroundSize = `${props.progress}% 100%`;
  }, []);

  useEffect(() => {
    inputRef.current.style.backgroundSize = `${props.progress}% 100%`;
  }, [props.progress]);

  return (
    <div aria-valuemax={100} aria-valuemin={0}>
      <input
        type="range"
        min="0"
        max="100"
        ref={inputRef}
        onChange={(e) => {
          let min = Number(e.target.min);
          let max = Number(e.target.max);
          let val = Number(e.target.value);
          const result = ((val - min) * 100) / (max - min);
          e.target.style.backgroundSize = `${result}% 100%`;
          props.onProgressChange(result);
        }}
        value={props.progress}
        className={styles.range}
      />
    </div>
  );
}

export default ProgressBar;
