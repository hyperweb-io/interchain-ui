import { createVar } from "@vanilla-extract/css";
import { themeContractTemplate } from "../../styles/themes.css";
import type { LiteralUnion, PartialDeep } from "../../helpers/types";
import type { DeepStringConstructor } from "../../helpers/types";

export type CssVar = ReturnType<typeof createVar>;

export type OverridableState = "hover" | "active" | "disabled" | "focused";

export type Bg = "bg" | `${OverridableState}Bg`;

export type TextColor = "color" | `${OverridableState}Color`;

export type Shadow = "shadow" | `${OverridableState}Shadow`;

export type BorderColor = "borderColor" | `${OverridableState}BorderColor`;

export type OverridableProp = Bg | TextColor | Shadow | BorderColor;

// Add more slots here when you need a component to be overridable
// TODO: infer through a register() function so that we don't need to do this manually
export type OverridableComponents =
  | "button"
  | "clipboard-copy-text"
  | "connect-modal"
  | "connect-modal-install-button"
  | "connect-modal-head-title"
  // == Connect wallet button in wallet list
  | "connect-modal-wallet-button"
  | "connect-modal-wallet-button-label"
  | "connect-modal-wallet-button-sublogo"
  | "connect-modal-qr-code"
  | "connect-modal-qr-code-shadow"
  | "connect-modal-qr-code-error"
  | "connect-modal-qr-code-error-button"
  | "connect-modal-qr-code-loading";

export type OverrideValue = Partial<
  Record<OverridableProp, { light: string; dark: string }>
>;

export type OverrideValueByVariant<
  TVariant extends LiteralUnion<"default", string>,
> = Record<TVariant, OverrideValue>;

// This is provided for user to provide concrete values to override a component
export type ComponentOverrideMap = Partial<
  Record<OverridableComponents, OverrideValue>
>;

// This tells us how to override a component
export type ComponentOverrideSchema = {
  name: OverridableComponents;
  overrides: Array<[CssVar, OverridableProp]>;
};

export type CustomThemeVars = PartialDeep<
  DeepStringConstructor<typeof themeContractTemplate>
>;

// Theme contract customization
export type SingleThemeDef = {
  name: string;
  vars: CustomThemeVars;
};

export type DualThemeDef = {
  name: string;
  vars: {
    light: CustomThemeVars;
    dark: CustomThemeVars;
  };
};

export type ThemeDef = SingleThemeDef;
