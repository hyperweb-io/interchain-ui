import { BaseComponentProps } from "../../models/components.model";

export interface ConnectModalHeadProps extends BaseComponentProps {
  title: string;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  onClose: (event: any) => void;
  onBack?: (event: any) => void;
  // zagjs props, will be injected through scaffold modal
  id?: string;
  titleProps?: any;
  closeButtonProps?: any;
}
