import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import type { ConnectModalQRCodeErrorProps } from "./connect-modal-qrcode-error.types";
import QRCode from "../qrcode";
import Icon from "../icon";
import {
  qrcodeErrorContainer,
  qrcodeBlur,
  qrcodeReloadButton,
  qrcodeReloadButtonContainer,
} from "./connect-modal-qrcode-error.css";
import {
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
} from "../connect-modal-qrcode/connect-modal-qrcode.css";
import { store } from "../../models/store";
import {
  connectModalQRCodeErrorOverrides,
  connectModalQRCodeErrorButtonOverrides,
} from "./connect-modal-qrcode-error.helper";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";

function ConnectModalQrCodeError(props: ConnectModalQRCodeErrorProps) {
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
    <div
      className={clx(qrcodeErrorContainer, qrCodeContainer, props.className)}
    >
      <div
        style={overrideManager?.applyOverrides(
          connectModalQRCodeErrorOverrides.name
        )}
        className={qrcodeBlur[internalTheme]}
      />
      <div className={qrcodeReloadButtonContainer}>
        <button
          onClick={(event) => props.onRefresh?.(event)}
          style={overrideManager?.applyOverrides(
            connectModalQRCodeErrorButtonOverrides.name
          )}
          className={qrcodeReloadButton[internalTheme]}
        >
          <span>
            <Icon name="restart" size="$lg" />
          </span>
        </button>
      </div>
      <QRCode
        value="https://"
        level="L"
        size={props.qrCodeSize}
        bgColor={qrCodeBgVar}
        fgColor={qrCodeFgVar}
        includeMargin={false}
      />
    </div>
  );
}

export default ConnectModalQrCodeError;
