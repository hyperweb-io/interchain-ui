import { ComponentOverrideSchema } from "../../styles/override/override.types";
import {
  qrcodeBlurBgVar,
  reloadButtonBgVar,
  reloadButtonFgVar,
  reloadButtonShadowVar,
} from "./connect-modal-qrcode-error.css";

export const connectModalQRCodeErrorOverrides: ComponentOverrideSchema = {
  name: "connect-modal-qr-code-error",
  overrides: [[qrcodeBlurBgVar, "bg"]],
};

export const connectModalQRCodeErrorButtonOverrides: ComponentOverrideSchema = {
  name: "connect-modal-qr-code-error-button",
  overrides: [
    [reloadButtonBgVar, "bg"],
    [reloadButtonFgVar, "color"],
    [reloadButtonShadowVar, "shadow"],
  ],
};
