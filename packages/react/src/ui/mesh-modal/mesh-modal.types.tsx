import type { BasicModalProps } from "../basic-modal/basic-modal.types";
import type { ThemeProviderProps } from "../theme-provider/theme-provider.types";

export interface MeshModalProps extends BasicModalProps {
  themeMode?: ThemeProviderProps["themeMode"];
}
