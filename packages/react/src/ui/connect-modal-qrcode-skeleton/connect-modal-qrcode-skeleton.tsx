import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import { qrcodeSkeleton } from "./connect-modal-qrcode-skeleton.css";
import { store } from "../../models/store";
import { connectModalQRCodeSkeletonOverrides } from "./connect-modal-qrcode-skeleton.helper";
import type { ThemeVariant } from "../../models/system.model";
import type { OverrideStyleManager } from "../../styles/override/override";

function ConnectModalQrCodeSkeleton(props: any) {
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");

  const [overrideManager, setOverrideManager] = useState(() => null);

  useEffect(() => {
    setInternalTheme(store.getState().theme);
    setOverrideManager(store.getState().overrideStyleManager);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
      setOverrideManager(newState.overrideStyleManager);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width="$full"
      px="$6"
      className={props.className}
    >
      <div
        style={overrideManager?.applyOverrides(
          connectModalQRCodeSkeletonOverrides.name
        )}
        className={qrcodeSkeleton[internalTheme]}
      />
    </Box>
  );
}

export default ConnectModalQrCodeSkeleton;
