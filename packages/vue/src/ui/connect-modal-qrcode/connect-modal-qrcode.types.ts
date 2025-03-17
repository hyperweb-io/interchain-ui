import { BaseComponentProps } from "../../models/components.model";

export type QRCodeStatus = "Pending" | "Done" | "Error" | "Expired";

export interface ConnectModalQRCodeProps extends BaseComponentProps {
  status: QRCodeStatus;
  link: string;
  description: string;
  qrCodeSize?: number;
  errorTitle?: any;
  errorDesc?: any;
  onRefresh?: () => void;
}
