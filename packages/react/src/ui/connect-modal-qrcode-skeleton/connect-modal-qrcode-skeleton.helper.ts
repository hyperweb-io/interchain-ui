import { ComponentOverrideSchema } from "../../styles/override/override.types";
import {
  skeletonStartVar,
  skeletonEndVar,
} from "./connect-modal-qrcode-skeleton.css";

export const connectModalQRCodeSkeletonOverrides: ComponentOverrideSchema = {
  name: "connect-modal-qr-code-loading",
  overrides: [
    [skeletonStartVar, "bg"],
    [skeletonEndVar, "bg"],
  ],
};
