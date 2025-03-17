import { IntentValues } from "../../models/system.model";
import { ThemeVariant } from "../../models/system.model";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export function getIntentColors(
  intent: IntentValues,
  colorMode: ThemeVariant
): {
  color: Sprinkles["color"];
  bg: Sprinkles["bg"];
} {
  if (intent === "error") {
    return colorMode === "light"
      ? {
          color: "$red600",
          bg: "$red100",
        }
      : {
          color: "$red300",
          bg: "rgba(205,66,70,.2)",
        };
  }

  if (intent === "success") {
    return colorMode === "light"
      ? {
          color: "$green600",
          bg: "$green100",
        }
      : {
          color: "$green300",
          bg: "rgba(35,133,81,.2)",
        };
  }

  if (intent === "info") {
    return colorMode === "light"
      ? {
          color: "$blue600",
          bg: "$blue100",
        }
      : {
          color: "$blue200",
          bg: "rgba(45,114,210,.2)",
        };
  }

  if (intent === "warning") {
    return colorMode === "light"
      ? {
          color: "$yellow600",
          bg: "$yellow100",
        }
      : {
          color: "$yellow400",
          bg: "rgba(200,118,25,.2)",
        };
  }

  return {
    color: "$text",
    bg: "$cardBg",
  };
}
