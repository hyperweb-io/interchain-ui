import { ComponentOverrideSchema } from "../../styles/override/override.types";
import {
  buttonBgVar,
  buttonFocusBgVar,
  buttonHoverBgVar,
  buttonFocusShadowVar,
  buttonHoverShadowVar,
  buttonTextColorVar,
  buttonLabelColorVar,
  buttonSublogoBgVar,
  buttonSublogoBorderVar,
} from "./connect-modal-wallet-button.css";

export const buttonOverrides: ComponentOverrideSchema = {
  name: "connect-modal-wallet-button",
  overrides: [
    [buttonTextColorVar, "color"],
    [buttonBgVar, "bg"],
    [buttonFocusBgVar, "focusedBg"],
    [buttonHoverBgVar, "hoverBg"],
    [buttonFocusShadowVar, "focusedShadow"],
    [buttonHoverShadowVar, "hoverShadow"],
  ],
};

export const buttonLabelOverrides: ComponentOverrideSchema = {
  name: "connect-modal-wallet-button-label",
  overrides: [[buttonLabelColorVar, "color"]],
};

export const buttonSublogoOverrides: ComponentOverrideSchema = {
  name: "connect-modal-wallet-button-sublogo",
  overrides: [
    [buttonSublogoBgVar, "bg"],
    [buttonSublogoBorderVar, "borderColor"],
  ],
};
