import { ReactNode } from "react";
import type { Sprinkles } from "@/styles/rainbow-sprinkles.css";
import type { AriaNumberFieldProps } from "react-aria";

export interface NumberInputProps {
  // ==== Core logic props
  defaultValue?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
  incrementButton?: ReactNode;
  decrementButton?: ReactNode;
  canIncrement?: boolean;
  canDecrement?: boolean;
  clampValueOnBlur?: boolean;
  // ==== Form field props
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  formatOptions?: AriaNumberFieldProps["formatOptions"];
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
  onInput?: AriaNumberFieldProps["onInput"];
  onBlur?: AriaNumberFieldProps["onBlur"];
  onFocus?: AriaNumberFieldProps["onFocus"];
  onFocusChange?: (isFocused: boolean) => void;
  onKeyDown?: AriaNumberFieldProps["onKeyDown"];
  onKeyUp?: AriaNumberFieldProps["onKeyUp"];
  // ==== Style props
  textAlign?: Sprinkles["textAlign"];
  fontSize?: Sprinkles["fontSize"];
  attributes?: Sprinkles & React.HTMLAttributes<HTMLDivElement>;
  size?: "sm" | "md" | "lg";
  placeholder?: string | undefined;
  intent?: "default" | "error";
  className?: string;
  inputContainer?: string;
  inputClassName?: string;
  borderless?: boolean;
}
