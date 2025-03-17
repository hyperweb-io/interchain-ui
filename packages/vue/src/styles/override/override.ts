import { assignInlineVars, setElementVars } from "@vanilla-extract/dynamic";
import { merge } from "lodash";
import type {
  OverridableProp,
  OverrideValue,
  ComponentOverrideMap,
  ComponentOverrideSchema,
  OverridableComponents,
  CustomThemeVars,
} from "./override.types";
import type { ThemeVariant } from "../../models/system.model";
import {
  themeVars,
  commonVars,
  darkThemeClass,
  lightThemeClass,
} from "../../styles/themes.css";
import type { ThemeContractValues } from "../../styles/themes.css";

// ====
import { buttonOverrides } from "../../ui/button/button.helper";
import { clipboardCopyTextOverrides } from "../../ui/clipboard-copy-text/clipboard-copy-text.helper";
import { connectModalOverrides } from "../../ui/connect-modal/connect-modal.helper";
import { connectModalHeadTitleOverrides } from "../../ui/connect-modal-head/connect-modal-head.helper";
import { installButtonOverrides } from "../../ui/connect-modal-install-button/connect-modal-install-button.helper";
import {
  connectQRCodeOverrides,
  connectQRCodeShadowOverrides,
} from "../../ui/connect-modal-qrcode/connect-modal-qrcode.helper";
import {
  connectModalQRCodeErrorOverrides,
  connectModalQRCodeErrorButtonOverrides,
} from "../../ui/connect-modal-qrcode-error/connect-modal-qrcode-error.helper";
import { connectModalQRCodeSkeletonOverrides } from "../../ui/connect-modal-qrcode-skeleton/connect-modal-qrcode-skeleton.helper";
import {
  buttonOverrides as walletButtonOverrides,
  buttonLabelOverrides as walletButtonLabelOverrides,
  buttonSublogoOverrides as walletButtonSubLogoOverrides,
} from "../../ui/connect-modal-wallet-button/connect-modal-wallet-button.helper";

// Must manually add the overrides schema to this object for every component that you want users
// to be able to override styles
const overrideSchemas: Record<OverridableComponents, ComponentOverrideSchema> =
  {
    button: buttonOverrides,
    "clipboard-copy-text": clipboardCopyTextOverrides,
    "connect-modal": connectModalOverrides,
    "connect-modal-head-title": connectModalHeadTitleOverrides,
    "connect-modal-install-button": installButtonOverrides,
    "connect-modal-qr-code": connectQRCodeOverrides,
    "connect-modal-qr-code-shadow": connectQRCodeShadowOverrides,
    "connect-modal-qr-code-error": connectModalQRCodeErrorOverrides,
    "connect-modal-qr-code-error-button":
      connectModalQRCodeErrorButtonOverrides,
    "connect-modal-qr-code-loading": connectModalQRCodeSkeletonOverrides,
    "connect-modal-wallet-button": walletButtonOverrides,
    "connect-modal-wallet-button-label": walletButtonLabelOverrides,
    "connect-modal-wallet-button-sublogo": walletButtonSubLogoOverrides,
  };

export class OverrideStyleManager {
  _overrideMap: ComponentOverrideMap;
  _theme: ThemeVariant;

  constructor(theme: ThemeVariant) {
    this._overrideMap = {};
    this._theme = theme;
  }

  update(overrideMap: ComponentOverrideMap | null, theme: ThemeVariant | null) {
    if (overrideMap) {
      this._overrideMap = overrideMap;
    }
    if (theme) {
      this._theme = theme;
    }
  }

  applyOverrides(component: OverridableComponents) {
    const schema = overrideSchemas[component];
    const componentOverrideValue = this._overrideMap[component] ?? {};
    const configByTheme = groupByTheme(componentOverrideValue);

    if (!schema || !configByTheme) {
      return {};
    }

    const config = configByTheme[this._theme];
    const varsMap: Record<string, string> = {};

    // Get the actual css value for each css var
    for (const [vanillaCssVar, propertyName] of schema.overrides) {
      const propertyValue = config[propertyName];

      if (!propertyValue) {
        continue;
      }

      varsMap[`${vanillaCssVar}`] = propertyValue;
    }

    return assignInlineVars(varsMap);
  }
}

// Transform config object
// From:
// { bg: { light: 'red500', dark: 'blue400' },
//   color: { light: 'yellow200', dark: 'gray400'}
// }
// To: {
//   light: { bg: 'red500', color: 'yellow200' },
//   dark: { bg: 'blue400', color: 'gray400' }
// }

function groupByTheme(config: OverrideValue) {
  if (!config) return null;

  const result: Record<
    ThemeVariant,
    Partial<Record<OverridableProp, string>>
  > = {
    light: {},
    dark: {},
  };

  for (const [overrideProperty, propertyConfig] of Object.entries(config)) {
    for (const theme of ["light", "dark"] as ThemeVariant[]) {
      result[theme] = {
        ...result[theme],
        [overrideProperty]: propertyConfig[theme],
      };
    }
  }

  return result;
}

export function assignThemeVars(
  customTheme: CustomThemeVars,
  colorMode: ThemeVariant,
) {
  const schemeClass = colorMode === "light" ? lightThemeClass : darkThemeClass;
  const elements = document.getElementsByClassName(schemeClass);
  const mergedVars = merge(commonVars, customTheme as ThemeContractValues);

  for (let el of elements) {
    setElementVars(el as HTMLElement, themeVars, mergedVars);
  }
}
