import React from "react";
import { usePopoverContext } from "../popover/popover.context";
import * as styles from "./popover-trigger.css";

export interface PopoverTriggerProps {
  children: React.ReactNode;
}

const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { refs, getReferenceProps } = usePopoverContext();

  return (
    <div
      ref={refs.setReference}
      className={styles.trigger}
      {...getReferenceProps()}
    >
      {children}
    </div>
  );
};

export default PopoverTrigger;
