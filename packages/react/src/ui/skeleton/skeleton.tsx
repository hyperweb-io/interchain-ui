import * as React from "react";
import clx from "clsx";
import Box from "../box";
import { skeleton } from "../shared/shared.css";
import type { SkeletonProps } from "./skeleton.types";

function Skeleton(props: SkeletonProps) {
  return <Box {...props} className={clx(props.className, skeleton)} />;
}

export default Skeleton;
