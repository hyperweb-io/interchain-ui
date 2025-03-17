import { BaseComponentProps } from "../../models/components.model";
import type { ConnectModalWalletButtonProps } from "../connect-modal-wallet-button/connect-modal-wallet-button.types";

export interface Wallet {
  name: string;
  prettyName?: string;
  logo: string;
  subLogo?: string;
  btmLogo?: string;
  mobileDisabled: boolean;
  downloadUrl?: string;
  rejectMessage?: string;
  originalWallet?: any;
  badge?: string;
  shape?: ConnectModalWalletButtonProps["variant"];
}

export interface ConnectModalWalletListProps extends BaseComponentProps {
  wallets: Wallet[];
  onWalletItemClick?: (wallet: any) => void;
  className?: string;
}
