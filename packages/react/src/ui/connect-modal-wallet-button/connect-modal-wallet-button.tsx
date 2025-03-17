import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import type { ConnectModalWalletButtonProps } from "./connect-modal-wallet-button.types";
import {
  connectButtonVariants,
  connectButtonStyle,
  buttonTextStyle,
  logoVariants,
  buttonTextVariants,
  subLogoSquare,
  subLogoList,
} from "./connect-modal-wallet-button.css";
import { store } from "../../models/store";
import Box from "../box";
import Avatar from "../avatar";
import AvatarBadge from "../avatar-badge";
import Icon from "../icon";
import {
  buttonOverrides,
  buttonLabelOverrides,
  buttonSublogoOverrides,
} from "./connect-modal-wallet-button.helper";
import Text from "../text";
import type { OverrideStyleManager } from "../../styles/override/override";
import type { ThemeVariant } from "../../models/system.model";
import { WalletPluginSystem } from "../connect-modal-wallet-list";

function ConnectModalWalletButton(props: ConnectModalWalletButtonProps) {
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
    <button
      className={clx(
        connectButtonStyle[internalTheme],
        connectButtonVariants({
          variant: props.variant,
        })
      )}
      style={overrideManager?.applyOverrides(buttonOverrides.name)}
      title={props.name}
      onClick={(event) => props.onClick(event)}
    >
      {!!props.logo ? (
        <Box
          as="span"
          position="relative"
          display="block"
          className={clx(
            logoVariants({
              variant: props.variant,
            })
          )}
        >
          <Box position="relative">
            {props.logo && !props.btmLogo ? (
              <img
                referrerPolicy="no-referrer"
                alt={props.name}
                src={props.logo}
                width={props.variant === "square" ? "56px" : "32px"}
                height={props.variant === "square" ? "56px" : "32px"}
                style={{
                  objectFit: "contain",
                }}
              />
            ) : null}
            {props.btmLogo && props.variant === "list" ? (
              <Avatar
                backgroundColor="transparent"
                size="sm"
                name={props.name}
                src={props.logo}
                rounded={false}
              >
                <AvatarBadge
                  size="1.2em"
                  borderWidth="0.1em"
                  attributes={{
                    backgroundColor:
                      internalTheme === "dark" ? "$gray300" : "$white",
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "9999px",
                      objectFit: "contain",
                    }}
                    alt={
                      ["MetaMask"].includes(props.btmLogo)
                        ? props.btmLogo
                        : `${props.name} logo`
                    }
                    src={
                      ["MetaMask"].includes(props.btmLogo)
                        ? WalletPluginSystem[props.btmLogo].logo
                        : props.btmLogo
                    }
                  />
                </AvatarBadge>
              </Avatar>
            ) : null}
            {props.btmLogo && !props.subLogo && props.variant === "square" ? (
              <Avatar
                backgroundColor="transparent"
                size="md"
                name={props.name}
                src={props.logo}
                rounded={false}
              >
                <AvatarBadge
                  size="1.2em"
                  borderWidth="0.1em"
                  attributes={{
                    backgroundColor:
                      internalTheme === "dark" ? "$gray300" : "$white",
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "9999px",
                      objectFit: "contain",
                    }}
                    alt={
                      ["MetaMask"].includes(props.btmLogo)
                        ? props.btmLogo
                        : `${props.name} logo`
                    }
                    src={
                      ["MetaMask"].includes(props.btmLogo)
                        ? WalletPluginSystem[props.btmLogo].logo
                        : props.btmLogo
                    }
                  />
                </AvatarBadge>
              </Avatar>
            ) : null}
          </Box>
          {props.variant === "square" &&
          typeof props.subLogo === "string" &&
          !props.btmLogo ? (
            <span
              style={overrideManager?.applyOverrides(
                buttonSublogoOverrides.name
              )}
              className={subLogoSquare[internalTheme]}
            >
              {props.subLogo === "walletConnect" ? (
                <Icon name="mobileWalletCircle" size="2xl" />
              ) : null}
              {props.subLogo !== "walletConnect" ? (
                <img
                  width="24px"
                  height="24px"
                  src={props.subLogo}
                  alt={`${props.name} sub logo`}
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : null}
            </span>
          ) : null}
        </Box>
      ) : null}
      <Box
        rawCSS={{
          ...overrideManager?.applyOverrides(buttonLabelOverrides.name),
          width: props.variant === "square" ? "calc(80%)" : "auto",
        }}
        className={clx(
          buttonTextStyle[internalTheme],
          buttonTextVariants({
            variant: props.variant,
          })
        )}
      >
        {!props.badge ? (
          <Text
            as="span"
            ellipsis
            textAlign={props.variant === "square" ? "center" : "left"}
            attributes={{
              width: "100%",
              display: "inline-block",
            }}
          >
            {props.name}
          </Text>
        ) : null}
        {props.badge ? (
          <Text
            as="p"
            attributes={{
              display: "inline-block",
              position: "relative",
              pr: "$2",
            }}
          >
            <Text
              as="span"
              ellipsis
              textAlign={props.variant === "square" ? "center" : "left"}
              attributes={{
                width: "100%",
                display: "inline-block",
              }}
            >
              {props.name}
            </Text>
            <Text
              as="span"
              fontSize="$3xs"
              fontWeight="$semibold"
              attributes={{
                px: "$3",
                py: "4px",
                borderRadius: "$md",
                textTransform: "uppercase",
                position: "absolute",
                top: "$-3",
                left: "$full",
                color: internalTheme === "dark" ? "$gray300" : "$gray800",
                backgroundColor:
                  internalTheme === "dark" ? "$gray600" : "$gray200",
              }}
            >
              {props.badge}
            </Text>
          </Text>
        ) : null}
      </Box>
      {props.variant === "list" && typeof props.subLogo === "string" ? (
        <span className={subLogoList}>
          {props.subLogo === "walletConnect" ? (
            <Icon name="mobileWallet" size="xl" />
          ) : null}
          {props.subLogo !== "walletConnect" ? (
            <img
              width="20px"
              height="20px"
              src={props.subLogo}
              alt={`${props.name} sub logo`}
              style={{
                objectFit: "contain",
              }}
            />
          ) : null}
        </span>
      ) : null}
    </button>
  );
}

export default ConnectModalWalletButton;
