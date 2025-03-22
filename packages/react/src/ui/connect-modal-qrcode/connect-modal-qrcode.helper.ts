import { ComponentOverrideSchema } from "../../styles/override/override.types";
import {
  qrCodeBgVar,
  qrCodeFgVar,
  qrCodeBorderColorVar,
  qrCodeBoxShadowVar,
  qrCodeDescBgVar,
} from "./connect-modal-qrcode.css";

export const connectQRCodeOverrides: ComponentOverrideSchema = {
  name: "connect-modal-qr-code",
  overrides: [
    [qrCodeBgVar, "bg"],
    [qrCodeFgVar, "color"],
    [qrCodeBorderColorVar, "borderColor"],
    [qrCodeBoxShadowVar, "shadow"],
  ],
};

export const connectQRCodeShadowOverrides: ComponentOverrideSchema = {
  name: "connect-modal-qr-code-shadow",
  overrides: [[qrCodeDescBgVar, "bg"]],
};
