import { BaseComponentProps } from "../../models/components.model";

export interface ConnectModalProps extends BaseComponentProps {
  isOpen: boolean;
  onOpen?: (event?: any) => void;
  onClose?: (event?: any) => void;
  header: BaseComponentProps["children"];
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
  modalContentClassName?: string;
  modalChildrenClassName?: string;
  modalContentStyles?: any;
}
