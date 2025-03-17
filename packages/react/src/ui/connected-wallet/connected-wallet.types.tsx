import { ClipboardCopyTextProps } from "../clipboard-copy-text/clipboard-copy-text.types";

export interface ConnectedWalletProps {
  avatar: string;
  name: string;
  btnText?: string;
  onClick: () => void;
  address: ClipboardCopyTextProps["text"];
  truncate: ClipboardCopyTextProps["truncate"];
  midTruncateLimit: ClipboardCopyTextProps["midTruncateLimit"];
  onCopied?: ClipboardCopyTextProps["onCopied"];
}
