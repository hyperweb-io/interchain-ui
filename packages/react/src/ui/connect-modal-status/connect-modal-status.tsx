import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Box from "../box";
import Button from "../button";
import ClipboardCopyText from "../clipboard-copy-text";
import InstallButton from "../connect-modal-install-button";
import {
  statusLogo,
  disconnectedLogoFrame,
  disconnectedDesc,
  statusLogoImage,
  modalStatusContainer,
  connectingLogoFrame,
  connectingHeader,
  notExistLogoFrame,
  dangerText,
  errorDescription,
  statusLogoImageSvg,
  widthContainer,
  connectedInfo,
  desc,
  descMaxWidth,
  flexImg,
  bottomLink,
  copyText,
} from "./connect-modal-status.css";
import { baseTextStyles } from "../text/text.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { ConnectModalStatusProps } from "./connect-modal-status.types";

function ConnectModalStatus(props: ConnectModalStatusProps) {
  const cleanupRef = useRef<() => void>(null);
  const [internalTheme, setInternalTheme] = useState(() => "light");

  function getConnectedInfo() {
    return props.connectedInfo;
  }

  function getWallet() {
    return props.wallet;
  }

  useEffect(() => {
    setInternalTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <div className={clx(modalStatusContainer[internalTheme], props.className)}>
      {props.status === "Disconnected" ? (
        <>
          <Box marginBottom="$5" className={statusLogo}>
            <div className={disconnectedLogoFrame[internalTheme]} />
            <div className={statusLogoImage}>
              <img
                src={getWallet().logo}
                alt={getWallet().name}
                className={flexImg}
              />
            </div>
          </Box>
          <p className={disconnectedDesc[internalTheme]}>
            Wallet is disconnected
          </p>
          <div className={widthContainer}>
            <Button
              leftIcon="walletFilled"
              fluidWidth
              onClick={(event) => props.onConnect?.()}
              attributes={{
                marginBottom: "$3",
              }}
            >
              Connect wallet
            </Button>
          </div>
          {!!props.bottomLink ? (
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href={props.bottomLink}
                className={bottomLink}
              >
                Don't have a wallet?{" "}
              </a>
            </div>
          ) : null}
        </>
      ) : null}
      {props.status === "Connecting" ? (
        <>
          <Box marginBottom="$8" className={statusLogo}>
            <div className={connectingLogoFrame[internalTheme]} />
            <div className={statusLogoImage}>
              <img
                src={getWallet().logo}
                alt={getWallet().name}
                className={flexImg}
              />
            </div>
          </Box>{" "}
          <p className={connectingHeader[internalTheme]}>
            {props.contentHeader}
          </p>{" "}
          <Box
            as="p"
            fontSize="$sm"
            color="$body"
            fontWeight="$normal"
            textAlign="center"
            className={descMaxWidth}
          >
            {props.contentDesc}
          </Box>
        </>
      ) : null}
      {props.status === "Connected" ? (
        <>
          <Box marginBottom="$8" className={statusLogo}>
            {typeof getConnectedInfo().avatar === "string" ? (
              <div className={statusLogoImage}>
                <img
                  src={getConnectedInfo().avatar}
                  alt={getConnectedInfo().name}
                  className={flexImg}
                />
              </div>
            ) : null}
            {!!getConnectedInfo().avatar &&
            typeof getConnectedInfo().avatar !== "string" ? (
              <div className={statusLogoImageSvg}>
                {getConnectedInfo().avatar}
              </div>
            ) : null}
          </Box>{" "}
          <Box display="flex" alignItems="center" marginBottom="$5">
            <img
              width="16px"
              height="16px"
              src={getWallet().logo}
              alt={getWallet().name}
            />
            {!!getConnectedInfo().name ? (
              <p className={connectedInfo[internalTheme]}>
                {getConnectedInfo().name}
              </p>
            ) : null}
          </Box>{" "}
          <div className={widthContainer}>
            <Box maxWidth="$29" mx="auto" marginBottom="$6">
              <ClipboardCopyText
                truncate="middle"
                text={getConnectedInfo().address}
                className={copyText}
              />
            </Box>
          </div>{" "}
          <div className={widthContainer}>
            <Box
              maxWidth="$29"
              mx="auto"
              attributes={{ "data-part-id": "ConnectModalStatus-disconnect" }}
            >
              <Button
                intent="primary"
                variant="solid"
                leftIcon="walletFilled"
                fluidWidth
                onClick={(event) => props.onDisconnect?.()}
              >
                {" "}
                Disconnect{" "}
              </Button>
            </Box>
          </div>
        </>
      ) : null}
      {props.status === "NotExist" ? (
        <>
          <Box marginBottom="$7" className={statusLogo}>
            <div className={notExistLogoFrame[internalTheme]} />
            <div className={statusLogoImage}>
              <img
                src={getWallet().logo}
                alt={getWallet().name}
                className={flexImg}
              />
            </div>
          </Box>{" "}
          <p className={dangerText[internalTheme]}>{props.contentHeader}</p>{" "}
          <p className={clx(baseTextStyles, desc[internalTheme])}>
            {props.contentDesc}
          </p>{" "}
          <div className={widthContainer}>
            <Box mt="$7">
              <InstallButton
                fluidWidth
                onClick={(event) => props.onInstall?.()}
                disabled={!!props.disableInstall}
              >
                <Box
                  as="span"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>{props.installIcon}</span>
                  <Box as="span" marginLeft="$4">
                    {" "}
                    Install {getWallet().prettyName ?? getWallet().name}
                  </Box>
                </Box>
              </InstallButton>
            </Box>
          </div>
        </>
      ) : null}
      {props.status === "Rejected" ? (
        <>
          <Box marginBottom="$7" className={statusLogo}>
            <div className={notExistLogoFrame[internalTheme]} />
            <div className={statusLogoImage}>
              <img
                src={getWallet().logo}
                alt={getWallet().name}
                className={flexImg}
              />
            </div>
          </Box>{" "}
          <p className={dangerText[internalTheme]}>{props.contentHeader}</p>{" "}
          <p className={desc[internalTheme]}>{props.contentDesc}</p>{" "}
          <div className={widthContainer}>
            <Button
              leftIcon="walletFilled"
              fluidWidth
              onClick={(event) => props.onConnect?.()}
              attributes={{ marginBottom: "$3" }}
            >
              {" "}
              Reconnect{" "}
            </Button>
          </div>
        </>
      ) : null}
      {props.status === "Error" ? (
        <>
          <Box marginBottom="$7" className={statusLogo}>
            <div className={notExistLogoFrame[internalTheme]} />
            <div className={statusLogoImage}>
              <img
                src={getWallet().logo}
                alt={getWallet().name}
                className={flexImg}
              />
            </div>
          </Box>{" "}
          <p className={dangerText[internalTheme]}>{props.contentHeader}</p>{" "}
          <Box position="relative">
            <div className={errorDescription}>
              <p className={desc[internalTheme]}>{props.contentDesc}</p>
            </div>
            <div className={bottomShadow[internalTheme]} />
          </Box>{" "}
          <div className={widthContainer}>
            <Button
              leftIcon="walletFilled"
              fluidWidth
              onClick={(event) => props.onChangeWallet?.()}
              attributes={{ marginBottom: "$3" }}
            >
              {" "}
              Change wallet{" "}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default ConnectModalStatus;
