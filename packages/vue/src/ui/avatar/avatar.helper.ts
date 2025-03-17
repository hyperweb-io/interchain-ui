import { themeVars } from "../../styles/themes.css";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { AvatarProps } from "./avatar.types";

export function avatarSize(size: AvatarProps["size"]) {
  const sizeMap: Record<AvatarProps["size"], Sprinkles["width"]> = {
    "3xs": themeVars.space[8],
    "2xs": themeVars.space[9],
    xs: themeVars.space[10],
    sm: themeVars.space[12],
    md: themeVars.space[16],
    lg: themeVars.space[17],
    xl: themeVars.space[21],
    "2xl": themeVars.space[23],
  };

  return sizeMap[size ?? "sm"];
}
