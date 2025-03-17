import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import TokenInput from "../token-input";
import * as styles from "./asset-withdraw-tokens.css";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";
import IconButton from "../icon-button";
import TextField from "../text-field";
import { rootInput, inputBorderAndShadow } from "../text-field/text-field.css";
import { standardTransitionProperties } from "../shared/shared.css";
import type { ThemeVariant } from "../../models/system.model";
import type { AssetWithdrawTokensProps } from "./asset-withdraw-tokens.types";

function AssetWithdrawTokens(props: AssetWithdrawTokensProps) {
  const {
    transferLabel = "Transfer",
    cancelLabel = "Cancel",
    partials = [
      {
        label: "Max",
        percentage: 1,
      },
      {
        label: "1/2",
        percentage: 0.5,
      },
      {
        label: "1/3",
        percentage: 1 / 3,
      },
    ],
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  const [inputAmount, setInputAmount] = useState(() => 0);
  const [toAddress, setToAddress] = useState(() => "");
  const [lgAddressVisible, setLgAddressVisible] = useState(() => false);
  const [smAddressVisible, setSmAddressVisible] = useState(() => false);
  const [reverseAnimation, setReverseAnimation] = useState(() => false);
  function handleConfirmAddress() {
    props.onAddressConfirm?.();
    setReverseAnimation(true);
    setLgAddressVisible(false);
    setSmAddressVisible(false);
    setReverseAnimation(false);
  }
  function handleAmountChange(percent) {
    const newAmount = new BigNumber(props.available)
      .multipliedBy(percent)
      .toNumber();
    setInputAmount(newAmount);
    props.onChange?.(new BigNumber(newAmount).toString());
  }
  function onAmountChange(value) {
    setInputAmount(value);
    props.onChange?.(new BigNumber(value).toString());
  }
  useEffect(() => {
    setToAddress(props.toAddress);
    setTheme(store.getState().theme);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      position="relative"
      minWidth={{ mobile: "unset", mdMobile: "340px" }}
      maxWidth={{ mobile: "unset", mdMobile: "460px" }}
      className={props.className}
    >
      <Box visibility={smAddressVisible ? "hidden" : "visible"}>
        <Stack
          attributes={{
            marginTop: "$11",
            marginBottom: "$13",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          domAttributes={{ "data-part-id": "address-fields-sm" }}
          className={styles.onlySm}
        >
          <Box
            as="img"
            width="$15"
            height="$15"
            attributes={{ alt: props.fromName, src: props.fromImgSrc }}
          />
          <Icon
            name="arrowRightLine"
            color="$textSecondary"
            size="$xl"
            attributes={{ mx: "$9" }}
          />
          <Box
            as="img"
            width="$15"
            height="$15"
            attributes={{ alt: props.toName, src: props.toImgSrc }}
          />
          <Box attributes={{ position: "absolute", right: "0" }}>
            <IconButton
              icon="informationLine"
              variant="unstyled"
              onClick={(event) => {
                setSmAddressVisible(true);
              }}
            />
          </Box>
        </Stack>
        <Stack
          attributes={{
            paddingTop: "$13",
            paddingBottom: "$10",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          domAttributes={{ "data-part-id": "address-fields-lg" }}
          className={styles.onlyLg}
        >
          <Stack direction="vertical" className={styles.flex1}>
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{ marginBottom: "$6" }}
            >{`From ${props.fromName}`}</Text>
            <Stack
              space="$8"
              attributes={{
                p: "$6",
                backgroundColor: "$cardBg",
                borderRadius: "$lg",
                alignItems: "center",
              }}
              className={clsx(
                rootInput,
                inputBorderAndShadow,
                standardTransitionProperties
              )}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                attributes={{ alt: props.fromName, src: props.fromImgSrc }}
              />
              <Text color="$textSecondary">
                {truncateTextMiddle(props.fromAddress, 12)}
              </Text>
            </Stack>
          </Stack>
          <Icon
            name="arrowRightLine"
            color="$textSecondary"
            size="$md"
            attributes={{ mx: "$4", marginBottom: "$9" }}
          />
          <Stack
            direction="vertical"
            attributes={{ position: "relative" }}
            domAttributes={{ "data-part-id": "to-address" }}
            className={styles.flex1}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{ marginBottom: "$6" }}
            >{`To ${props.toName}`}</Text>
            <Stack
              space="$8"
              attributes={{
                p: "$6",
                height: "52px",
                backgroundColor: "$cardBg",
                borderRadius: "$lg",
                alignItems: "center",
              }}
              domAttributes={{ "data-part-id": "to-address-input" }}
              className={clsx(
                rootInput,
                inputBorderAndShadow,
                standardTransitionProperties
              )}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                attributes={{ alt: props.toName, src: props.toImgSrc }}
              />
              <Text
                color="$textSecondary"
                attributes={{ flex: "1", whiteSpace: "nowrap" }}
              >
                {truncateTextMiddle(props.toAddress, 12)}
              </Text>
              <IconButton
                icon="pencilLine"
                intent="text"
                size="sm"
                iconSize="$lg"
                attributes={{ height: "$auto" }}
                onClick={(event) => {
                  setLgAddressVisible(true);
                }}
              />
            </Stack>
            <Box
              display={lgAddressVisible ? "block" : "none"}
              className={clsx(
                styles.addressBackground,
                styles.transferMask[theme],
                { [styles.addressBackgroundReverse]: reverseAnimation }
              )}
            />
            <Box
              position="absolute"
              bottom="0"
              right="0"
              top="0"
              zIndex="1"
              display={lgAddressVisible ? "block" : "none"}
              backgroundColor={theme === "light" ? "$white" : "$blackPrimary"}
              className={clsx(styles.addressContainer, {
                [styles.addressContainerReverse]: reverseAnimation,
              })}
            >
              <Box
                position="relative"
                attributes={{ "data-part-id": "to-address-field-container" }}
              >
                <Text
                  color="$textSecondary"
                  fontWeight="$semibold"
                  ellipsis
                  attributes={{ paddingBottom: "$6" }}
                  className={styles.transferMask[theme]}
                >{`To ${props.toName}`}</Text>
                <TextField
                  id="to-address"
                  value={toAddress}
                  onChange={(e) => {
                    setToAddress(e.target.value);
                    props.onAddressChange(e.target.value);
                  }}
                  inputClassName={styles.addressInput}
                />
                <Stack
                  attributes={{
                    position: "absolute",
                    left: "$7",
                    bottom: "$0",
                    height: "48px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    as="img"
                    width="$11"
                    height="$11"
                    borderRadius="$full"
                    attributes={{ src: props.toImgSrc }}
                  />
                </Stack>
                <IconButton
                  icon="checkFill"
                  intent="tertiary"
                  size="md"
                  attributes={{ px: "$0" }}
                  onClick={(event) => {
                    handleConfirmAddress();
                  }}
                  className={styles.checkIcon}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>
        <TokenInput
          title="Select amount"
          hasProgressBar={false}
          amount={inputAmount}
          priceDisplayAmount={props.priceDisplayAmount}
          symbol={props.fromSymbol}
          name={props.fromName}
          available={props.available}
          tokenIcon={props.fromImgSrc}
          onAmountChange={(value) => onAmountChange(value)}
          inputClass={styles.bgClass[theme]}
          imgClass={styles.bgClass[theme]}
        />
        <Stack
          space="$5"
          attributes={{
            marginTop: "$5",
            marginBottom: "$11",
            justifyContent: "flex-end",
          }}
        >
          {partials?.map((partial, index) => (
            <Button
              intent="text"
              size="xs"
              key={index}
              onClick={(event) => handleAmountChange(partial.percentage)}
            >
              {partial.label}
            </Button>
          ))}
        </Stack>
        <Stack
          attributes={{
            p: "$6",
            marginBottom: "$9",
            borderRadius: "$md",
            backgroundColor: "$cardBg",
            alignItems: "center",
          }}
          className={styles.onlyLg}
        >
          <Icon
            name="timeLine"
            size="md"
            color="$text"
            attributes={{ marginRight: "$7" }}
          />
          <Text attributes={{ marginRight: "$7" }}>Estimated time:</Text>
          <Text fontWeight="$semibold">{props.timeEstimateLabel}</Text>
        </Stack>
        <Button
          intent="tertiary"
          size="lg"
          fluidWidth
          onClick={(event) => props.onTransfer?.()}
          disabled={props.isSubmitDisabled}
        >
          <Stack attributes={{ alignItems: "center" }}>
            <Text
              fontSize="$lg"
              fontWeight="$semibold"
              className={styles.btnText[theme]}
            >
              {transferLabel}
            </Text>
            {!!props.timeEstimateLabel ? (
              <Stack
                attributes={{ alignItems: "center" }}
                className={styles.onlySm}
              >
                <Icon
                  name="timeLine"
                  size="$lg"
                  attributes={{ marginLeft: "$8", marginRight: "$4" }}
                />
                <Text fontSize="$xs" className={styles.btnText[theme]}>
                  ≈ {props.timeEstimateLabel}
                </Text>
              </Stack>
            ) : null}
          </Stack>
        </Button>
        <Button
          variant="unstyled"
          size="lg"
          fluidWidth
          attributes={{ marginTop: "$5" }}
          onClick={(event) => props.onCancel?.()}
        >
          {cancelLabel}
        </Button>
      </Box>
      <Box visibility={smAddressVisible ? "visible" : "hidden"}>
        <Box
          position="absolute"
          width="$28"
          top="-76px"
          left="-14px"
          zIndex="1"
          className={clsx(styles.transferMask[theme], {
            [styles.smPanelShow]: smAddressVisible,
            [styles.smPanelHide]: !smAddressVisible,
          })}
        >
          <IconButton
            icon="arrowLeftSLine"
            iconSize="$4xl"
            variant="unstyled"
            onClick={(event) => {
              setSmAddressVisible(false);
            }}
          />
        </Box>
        <Box
          position="absolute"
          width="$full"
          height="$full"
          top="0"
          left="0"
          attributes={{ "data-part-id": "sm-panel" }}
          className={clsx({
            [styles.smPanelShow]: smAddressVisible,
            [styles.smPanelHide]: !smAddressVisible,
          })}
        >
          <Box attributes={{ position: "relative" }}>
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{ paddingBottom: "$6" }}
              className={styles.transferMask[theme]}
            >{`From ${props.fromName}`}</Text>
            <TextField
              id="from-address"
              disabled
              value={props.fromAddress}
              inputClassName={clsx(
                styles.addressInput,
                styles.fromAddressInput
              )}
              attributes={{ marginBottom: "$11" }}
            />
            <Stack
              attributes={{
                position: "absolute",
                left: "$7",
                bottom: "$0",
                height: "48px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props.fromImgSrc }}
              />
            </Stack>
          </Box>
          <Box attributes={{ position: "relative" }}>
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              ellipsis
              attributes={{ paddingBottom: "$6" }}
              className={styles.transferMask[theme]}
            >{`To ${props.toName}`}</Text>
            <TextField
              id="to-address"
              value={toAddress}
              onChange={(e) => {
                setToAddress(e.target.value);
                props.onAddressChange(e.target.value);
              }}
              inputClassName={styles.addressInput}
            />
            <Stack
              attributes={{
                position: "absolute",
                left: "$7",
                bottom: "$0",
                height: "48px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                as="img"
                width="$11"
                height="$11"
                borderRadius="$full"
                attributes={{ src: props.toImgSrc }}
              />
            </Stack>
            <IconButton
              icon="checkFill"
              intent="tertiary"
              size="lg"
              attributes={{ minWidth: "$15" }}
              onClick={(event) => {
                handleConfirmAddress();
              }}
              className={styles.checkIcon}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AssetWithdrawTokens;
