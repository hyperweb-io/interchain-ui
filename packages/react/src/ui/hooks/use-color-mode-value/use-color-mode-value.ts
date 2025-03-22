import * as React from "react";
import useTheme from "../use-theme";

// TODO: fix type infer
// type SprinklesKeys = keyof Sprinkles;

// type SprinklesValue<T = undefined> = T extends string
//   ? string
//   : T extends Sprinkles[SprinklesKeys]
//   ? Sprinkles[SprinklesKeys]
//   : never;

// type MaybeSprinklesValue<TValue extends string> = TValue extends `${string}`
//   ? SprinklesValue
//   : TValue extends UnknownRecord
//   ? SprinklesValue
//   : string;

export default function useColorModeValue<TValue extends string>(
  lightValue: TValue,
  darkValue: TValue,
) {
  const { colorMode } = useTheme();

  return React.useMemo(
    () => (colorMode === "light" ? lightValue : darkValue) as TValue,
    [colorMode, lightValue, darkValue],
  );
}
