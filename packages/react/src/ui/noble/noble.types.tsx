import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";
import type { ButtonProps } from "../button/button.types";
import type { ThemeProviderProps } from "../theme-provider/theme-provider.types";
import type { TextFieldProps } from "../text-field/text-field.types";

export interface NobleProviderProps extends BaseComponentProps {
  themeMode?: ThemeProviderProps["themeMode"];
}

export interface NobleTxDirectionCardProps extends BaseComponentProps {
  direction: string;
  chainName: string;
  address: string;
  logoUrl: string;
  addressDisplayLength?: number;
}

export interface NobleTxProgressBarProps extends BaseComponentProps {
  progress: number;
  width?: BoxProps["width"];
  mx?: BoxProps["mx"];
  mt?: BoxProps["mt"];
  mb?: BoxProps["mb"];
}

export interface NobleTxStepItemProps extends BaseComponentProps {
  step: string;
  status: "completed" | "processing" | "pending";
}

type BaseButtonProps = Omit<
  ButtonProps,
  "variant" | "intent" | "size" | "isLoading" | "spinnerPlacement"
>;

export type NobleButtonVariant = "text" | "solid" | "outlined" | "tag";
export type NobleButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface NobleButtonProps extends BaseButtonProps {
  color?: BoxProps["color"];
  width?: BoxProps["width"];
  height?: BoxProps["height"];
  variant?: NobleButtonVariant;
  size?: NobleButtonSize;
  fontSize?: BoxProps["fontSize"];
  fontWeight?: BoxProps["fontWeight"];
  lineHeight?: BoxProps["lineHeight"];
  isActive?: boolean;
  borderless?: boolean;
}

export interface NobleTokenAvatarProps {
  mainLogoUrl: string;
  mainLogoAlt?: string;
  subLogoUrl: string;
  subLogoAlt?: string;
  isRound?: boolean;
  isLoadingSubLogo?: boolean;
}

type DisplayToken = {
  symbol: string;
  network: string;
  tokenAmount: string;
  notionalValue: string;
} & NobleTokenAvatarProps;

export interface NobleSelectTokenButtonProps extends BaseButtonProps {
  width?: BoxProps["width"];
  height?: BoxProps["height"];
  size?: NobleButtonSize;
  borderless?: boolean;
  isActive?: boolean;
  token: DisplayToken;
}

export interface NobleSelectNetworkButtonProps extends BaseButtonProps {
  width?: BoxProps["width"];
  height?: BoxProps["height"];
  size?: NobleButtonSize;
  logoUrl: string;
  title: string;
  subTitle: string;
  actionLabel: string;
}

export interface NobleSelectWalletButtonProps extends BaseButtonProps {
  logoUrl: string;
  logoAlt?: string;
  title: string;
  subTitle: string;
}

export type NobleTxStatus = "processing" | "successful";

export interface NobleTxHistoryOverviewItemProps {
  amount: string;
  status: NobleTxStatus;
  sourceChainLogoSrc: string;
  destinationChainLogoSrc: string;
  mainLogoSrc?: string;
  amountUnit?: string;
  isExpanded?: boolean;
  disabled?: boolean;
  customStatus?: {
    text: string;
    color: BoxProps["color"];
  };
}

export interface NoblePageTitleBarProps {
  title: string;
  showBackButton?: boolean;
  onBackButtonClick?: (event: any) => void;
  mt?: BoxProps["mt"];
  mb?: BoxProps["mb"];
  mx?: BoxProps["mx"];
}

export interface NobleInputProps
  extends Omit<TextFieldProps, "clearLabel" | "intent"> {
  labelContainerProps?: BoxProps;
  labelExtra?: BaseComponentProps["children"];
  helperText?: BaseComponentProps["children"];
  size?: "sm" | "md";
  intent?: "success" | "error";
  inputTextAlign?: BoxProps["textAlign"];
  inputContainerProps?: BoxProps;
}

export interface NobleTxChainRouteProps {
  srcChainLogoUrl: string;
  srcChainLogoAlt?: string;
  destChainLogoUrl: string;
  destChainLogoAlt?: string;
  containerProps?: BoxProps;
}

export interface NobleTxEstimateProps
  extends Omit<NobleTxChainRouteProps, "containerProps"> {
  timeEstimateLabel: string;
  feeEstimateLabel: string;
  containerProps?: BoxProps;
}
