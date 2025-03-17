import BigNumber from "bignumber.js";

export function getCurrencyFormatter(
  locale?: string,
  options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale ?? "en-US", options);
}

export function formatIntlNumber(
  value: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
) {
  const formatter = new Intl.NumberFormat(locale ?? "en-US", {
    ...options,
    style: options?.style ?? "decimal",
    currency: options?.currency ?? "USD",
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 4,
  });
  return formatter.format(value);
}

export function formatCurrency(
  value: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
) {
  return formatIntlNumber(value, locale, {
    ...options,
    style: "currency",
  });
}

export function safelyFormatNumberWithFallback(
  formatter: Intl.NumberFormat,
  value: BigNumber
): string {
  // First, attempt to format the BigNumber as a number primitive
  try {
    return formatter.format(value.toNumber());
  } catch {}

  // As a fallback, simply return the ugly string value
  return value.toString();
}

/**
 * Function for lamp value
 * @param min
 * @param max
 * @param value
 * @returns
 */
export function clampBigNumber(
  min: string | number,
  max: string | number,
  value: string
): string {
  if (value === "") {
    return "";
  }
  if (new BigNumber(value).gt(max)) {
    return new BigNumber(max).toString();
  }
  if (new BigNumber(value).lt(min)) {
    return new BigNumber(min).toString();
  }
  return value?.toString();
}

export function toNumber(value?: string | number, fallbackValue?: number) {
  if (value == null) return fallbackValue ?? 0;
  if (typeof value === "number") return value;
  if (isNaN(Number(value))) return fallbackValue ?? 0;
  return Number(value);
}

export function formatNumeric(
  value: string | number,
  maximumFractionDigits = 6
) {
  return new BigNumber(value).decimalPlaces(maximumFractionDigits).toString();
}
