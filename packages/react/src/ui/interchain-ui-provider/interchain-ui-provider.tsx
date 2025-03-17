import * as React from "react";
import ThemeProvider from "../theme-provider";
import Toaster from "../toast/toaster";
import type { InterchainUIProviderProps } from "./interchain-ui-provider.types";

function InterchainUIProvider(props: InterchainUIProviderProps) {
  return (
    <ThemeProvider {...props.themeOptions}>
      {props.children}
      <Toaster {...props.toastOptions} />
    </ThemeProvider>
  );
}

export default InterchainUIProvider;
