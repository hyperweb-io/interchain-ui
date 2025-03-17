import { AriaCheckboxProps } from "react-aria";

export interface GovernanceCheckboxProps extends AriaCheckboxProps {
  isRejected?: boolean;
  children?: React.ReactNode;
}
