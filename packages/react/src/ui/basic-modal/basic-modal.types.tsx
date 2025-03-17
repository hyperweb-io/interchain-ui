import { BaseComponentProps } from "../../models/components.model";

export interface BasicModalProps extends BaseComponentProps {
  isOpen: boolean;
  closeOnClickaway?: boolean;
  modalRoot?: HTMLElement | null;
  onOpen?: (event?: any) => void;
  onClose?: (event?: any) => void;
  renderCloseButton?: (props: any) => BaseComponentProps["children"];
  renderTrigger?: (props: any) => BaseComponentProps["children"];
  title: BaseComponentProps["children"];
  children?: BaseComponentProps["children"];
  className?: string;
  modalContainerClassName?: string;
  modalContentClassName?: string;
  modalChildrenClassName?: string;
}
