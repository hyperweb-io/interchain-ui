import type { BaseComponentProps } from "../../models/components.model";
import type { ListItemProps } from "../list-item/list-item.types";

export interface ChainListItemProps extends BaseComponentProps {
  isActive?: ListItemProps["isActive"];
  isSelected?: ListItemProps["isSelected"];
  size?: ListItemProps["size"];
  attributes?: ListItemProps["attributes"];
  sprinkles?: ListItemProps["sprinkles"];
  itemRef?: ListItemProps["itemRef"];
  // ==== Chain info props
  iconUrl?: string;
  name: string;
  tokenName: string;
  amount?: string;
  notionalValue?: string;
}
