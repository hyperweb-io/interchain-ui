import type { BaseComponentProps } from "../../models/components.model";
import type { IntentValues } from "../../models/system.model";
import type { IconName } from "../icon/icon.types";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";

export interface CalloutProps extends BaseComponentProps {
  title: string;
  intent?: IntentValues;
  iconName?: IconName;
  iconRender?: BaseComponentProps["children"];
  attributes?: Sprinkles;
}
