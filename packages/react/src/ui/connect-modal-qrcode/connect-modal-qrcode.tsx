import * as React from "react";
import { useState, useRef, useEffect } from "react";
import anime from "animejs";
import type { ConnectModalQRCodeProps } from "./connect-modal-qrcode.types";
import QRCodeSkeleton from "../connect-modal-qrcode-skeleton";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import QRCode from "../qrcode";
import QRCodeError from "../connect-modal-qrcode-error";
import {
  descriptionStyle,
  qrCodeContainer,
  qrCodeBgVar,
  qrCodeFgVar,
  qrCodeDesc,
  qrCodeDescContent,
  qrCodeDescShadow,
} from "./connect-modal-qrcode.css";
import { store } from "../../models/store";
import {
  connectQRCodeOverrides,
  connectQRCodeShadowOverrides,
} from "./connect-modal-qrcode.helper";
import type { AnimeInstance } from "animejs";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";

function ConnectModalQRCode(props: ConnectModalQRCodeProps) {
  const { qrCodeSize = 230 } = props;
  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeInstance | null>(null);
  const cleanupRef = useRef<() => void>(null);
  const [displayBlur, setDisplayBlur] = useState(() => false);
  const [internalTheme, setInternalTheme] = useState(() => "light");
  const [overrideManager, setOverrideManager] = useState(() => null);
  useEffect(() => {
    setInternalTheme(store.getState().theme);
    setOverrideManager(store.getState().overrideStyleManager);
    if (measureRef.current) {
      if (measureRef.current.clientHeight >= 64) {
        setDisplayBlur(true);
      } else {
        setDisplayBlur(false);
      }
      const scrollHandler = () => {
        const height = Math.abs(
          measureRef.current.scrollHeight -
            measureRef.current.clientHeight -
            measureRef.current.scrollTop
        );
        if (height < 1) {
          setDisplayBlur(false);
        } else {
          setDisplayBlur(true);
        }
      };
      measureRef.current.addEventListener("scroll", scrollHandler);
      const storeUnsub = store.subscribe((newState) => {
        setInternalTheme(newState.theme);
        setOverrideManager(newState.overrideStyleManager);
      });
      cleanupRef.current = () => {
        storeUnsub();
        if (measureRef.current) {
          measureRef.current.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  }, []);
  useEffect(() => {
    if (!shadowRef.current) return; // Animation not init yet
    if (shadowRef.current && !animationRef.current) {
      animationRef.current = anime({
        targets: shadowRef.current,
        opacity: [0, 1],
        height: [0, 28],
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }
    if (displayBlur) {
      animationRef.current?.restart();
    } else {
      animationRef.current?.reverse();
    }
  }, [displayBlur, shadowRef.current]);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Stack
      direction="vertical"
      space="$0"
      attributes={{ alignItems: "center" }}
    >
      <Text fontWeight="$medium" fontSize="$md" className={descriptionStyle}>
        {props.description}
      </Text>
      {props.status === "Pending" ? (
        <>
          <Box height="$4" />
          <QRCodeSkeleton />
        </>
      ) : null}
      {props.status === "Done" ? (
        <>
          <Box height="$4" />
          <div
            style={overrideManager?.applyOverrides(connectQRCodeOverrides.name)}
            className={qrCodeContainer[internalTheme]}
          >
            <QRCode
              level="L"
              value={props.link}
              size={qrCodeSize}
              bgColor={qrCodeBgVar}
              fgColor={qrCodeFgVar}
              includeMargin={false}
            />
          </div>
        </>
      ) : null}
      {props.status === "Error" || props.status === "Expired" ? (
        <>
          <Box height="$4" />
          <QRCodeError
            onRefresh={(event) => props.onRefresh?.()}
            qrCodeSize={qrCodeSize}
          />
        </>
      ) : null}
      {!!props.errorTitle ? (
        <>
          {props.status === "Error" ? (
            <>
              <Box height="$4" />
              <Text
                as="p"
                fontWeight="$medium"
                fontSize="$md"
                color="$textDanger"
                attributes={{ marginTop: "$2" }}
              >
                {props.errorTitle}
              </Text>
            </>
          ) : null}
          {props.status === "Expired" ? (
            <>
              <Box height="$4" />
              <Text
                as="p"
                fontWeight="$medium"
                fontSize="$md"
                color="$textWarning"
                attributes={{ marginTop: "$2" }}
              >
                {props.errorTitle}
              </Text>
            </>
          ) : null}
        </>
      ) : null}
      {!!props.errorDesc ? (
        <>
          <Box height="$4" />
          <div className={qrCodeDesc}>
            <div ref={measureRef} className={qrCodeDescContent}>
              <p>{props.errorDesc}</p>
            </div>
            <div
              ref={shadowRef}
              style={overrideManager?.applyOverrides(
                connectQRCodeShadowOverrides.name
              )}
              className={qrCodeDescShadow[internalTheme]}
            />
          </div>
        </>
      ) : null}
    </Stack>
  );
}
export default ConnectModalQRCode;
