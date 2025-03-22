import { ComponentOverrideSchema } from "../../styles/override/override.types";
import { connectModalBgVar, connectModalShadowVar } from "./connect-modal.css";

export const connectModalOverrides: ComponentOverrideSchema = {
  name: "connect-modal",
  overrides: [
    [connectModalBgVar, "bg"],
    [connectModalShadowVar, "shadow"],
  ],
};
