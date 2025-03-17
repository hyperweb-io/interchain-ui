import * as React from "react";
import { useState, useEffect } from "react";
import qrcodegen from "./qrcodegen/qrcodegen";
import {
  DEFAULT_SIZE,
  DEFAULT_LEVEL,
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_INCLUDEMARGIN,
  ERROR_LEVEL_MAP,
} from "./qrcode.types";
import type { QRProps } from "./qrcode.types";
import {
  excavateModules,
  generatePath,
  getImageSettings,
  getMarginSize,
} from "./qrcode.helpers";

function QRCode(props: QRProps) {
  const {
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    includeMargin = DEFAULT_INCLUDEMARGIN,
  } = props;
  const [available, setAvailable] = useState(() => false);
  const [cells, setCells] = useState(() => null);
  const [calculatedImageSettings, setCalculatedImageSettings] = useState(
    () => null
  );
  const [margin, setMargin] = useState(() => null);
  const [fgPath, setFgPath] = useState(() => null);
  function generateNewPath(newMargin: number) {
    // Drawing strategy: instead of a rect per module, we're going to create a // single path for the dark modules and layer that on top of a light rect, // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
    // way faster than DOM ops.
    // For level 1, 441 nodes -> 2
    // For level 40, 31329 -> 2
    return generatePath(cells ?? [], newMargin);
  }
  function genCells() {
    return qrcodegen.QrCode.encodeText(
      props.value,
      ERROR_LEVEL_MAP[level]
    ).getModules();
  }
  function numCells() {
    return (cells?.length ?? 0) + (margin ?? 0) * 2;
  }
  useEffect(() => {
    setCells(genCells());
  }, []);
  useEffect(() => {
    if (props.imageSettings != null && calculatedImageSettings != null) {
      if (calculatedImageSettings.excavation != null) {
        setCells(excavateModules(cells, calculatedImageSettings.excavation));
      }
      if (!available) {
        setAvailable(true);
      }
    }
  }, [props.imageSettings, calculatedImageSettings]);
  useEffect(() => {
    const newMargin = getMarginSize(includeMargin, props.marginSize);
    setMargin(newMargin);
    setCalculatedImageSettings(
      getImageSettings(cells, size, newMargin, props.imageSettings)
    );
    setFgPath(generateNewPath(newMargin));
  }, [size, props.imageSettings, includeMargin, props.marginSize, cells]);
  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${numCells()} ${numCells()}`}
      className={props.className}
    >
      {!!props.title ? <title>{props.title}</title> : null}
      <path
        shapeRendering="crispEdges"
        fill={bgColor}
        d={`M0,0 h${numCells()}v${numCells()}H0z`}
      />
      <path shapeRendering="crispEdges" fill={fgColor} d={fgPath} />
      {available && !!props.imageSettings?.src ? (
        <image
          preserveAspectRatio="none"
          href={props.imageSettings.src}
          height={calculatedImageSettings.h}
          width={calculatedImageSettings.w}
          x={calculatedImageSettings.x + margin}
          y={calculatedImageSettings.y + margin}
        />
      ) : null}
    </svg>
  );
}
export default QRCode;
