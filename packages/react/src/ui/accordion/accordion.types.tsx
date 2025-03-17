import { BoxProps } from "../box/box.types";

export interface AccordionProps {
  renderTrigger:
    | React.ReactNode
    | ((props: { isExpanded: boolean }) => React.ReactNode);
  renderContent: React.ReactNode;
  width?: BoxProps["width"];
  onToggle?: () => void;
  isExpanded?: boolean;
  transition?: string;
}
