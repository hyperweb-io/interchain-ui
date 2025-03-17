import qrcodegen from "./qrcodegen/qrcodegen";
import type { BaseComponentProps } from "../../models/components.model";

export type Modules = ReturnType<qrcodegen.QrCode["getModules"]>;
export type Excavation = { x: number; y: number; w: number; h: number };

export type ImageSettings = {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
};

export interface QRProps extends BaseComponentProps {
  value: string;
  size?: number;
  // Should be a real enum, but doesn't seem to be compatible with real code.
  level?: string;
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
  marginSize?: number;
  imageSettings?: ImageSettings;
  title?: string;
}

// Constants
export const DEFAULT_SIZE = 128;
export const DEFAULT_LEVEL = "L";
export const DEFAULT_BGCOLOR = "#FFFFFF";
export const DEFAULT_FGCOLOR = "#000000";
export const DEFAULT_INCLUDEMARGIN = false;
export const SPEC_MARGIN_SIZE = 4;
export const DEFAULT_MARGIN_SIZE = 0;

// This is *very* rough estimate of max amount of QRCode allowed to be covered.
// It is "wrong" in a lot of ways (area is a terrible way to estimate, it
// really should be number of modules covered), but if for some reason we don't
// get an explicit height or width, I'd rather default to something than throw.
export const DEFAULT_IMG_SCALE = 0.1;

export const ERROR_LEVEL_MAP: { [index: string]: qrcodegen.QrCode.Ecc } = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
};
