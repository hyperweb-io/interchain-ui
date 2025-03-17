import { BaseComponentProps } from "../../models/components.model";

export interface ConnectModalQRCodeErrorProps extends BaseComponentProps {
  qrCodeSize?: number;
  onRefresh?: (event?: any) => void;
}
