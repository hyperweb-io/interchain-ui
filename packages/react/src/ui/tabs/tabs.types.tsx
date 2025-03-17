import type { BaseComponentProps } from "../../models/components.model";
import type { BoxProps } from "../box/box.types";

export type TabProps = {
  label: string;
  content: BaseComponentProps["children"];
};

export interface TabsProps extends BaseComponentProps {
  defaultActiveTab?: number;
  activeTab?: number;
  // Whether or not to mount/unmount tab children on activeTab change, isLazy = true means unmount
  isLazy?: boolean;
  onActiveTabChange?: (tabId: number) => void;
  tabs: TabProps[];
  attributes?: BoxProps;
}
