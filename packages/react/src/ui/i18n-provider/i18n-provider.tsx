import * as React from "react";
import { useRef, useEffect } from "react";
import BigNumber from "bignumber.js";
import {
  getCurrencyFormatter,
  safelyFormatNumberWithFallback,
} from "../../helpers/number";
import { store } from "../../models/store";
import { I18nProviderProps } from "./i18n-provider.types";
import { NumberFormatProps } from "../../models/system.model";

function I18nProvider(props: I18nProviderProps) {
  const numberFormatterRef = useRef<Intl.NumberFormat>(null);
  const formatNumberFnRef = useRef<(NumberFormatProps) => string>(null);
  const initialCurrencyConfigRef = useRef({
    currency: props.currency,
    currencySign: props.currencySign,
    useGrouping: props.useGrouping,
    minimumIntegerDigits: props.minimumIntegerDigits,
    minimumFractionDigits: props.minimumFractionDigits,
    maximumFractionDigits: props.maximumFractionDigits,
    minimumSignificantDigits: props.minimumSignificantDigits,
    maximumSignificantDigits: props.maximumSignificantDigits,
  });

  useEffect(() => {
    numberFormatterRef.current = getCurrencyFormatter(
      props.locale,
      initialCurrencyConfigRef.current
    );
    formatNumberFnRef.current = (subProps: NumberFormatProps): string => {
      numberFormatterRef.current = getCurrencyFormatter(
        props.locale,
        Object.assign(initialCurrencyConfigRef.current, {
          style: subProps.style,
        })
      );
      return safelyFormatNumberWithFallback(
        numberFormatterRef.current,
        new BigNumber(subProps.value)
      );
    };
    store.getState().setFormatNumberFn(formatNumberFnRef.current);
  }, []);

  return <div>{props.children}</div>;
}

export default I18nProvider;
