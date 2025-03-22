import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import { store } from "../../models/store";
import { formatNumeric } from "../../helpers/number";
import Text from "../text";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import IconButton from "../icon-button";
import Stack from "../stack";
import Divider from "../divider";
import Bignumber from "bignumber.js";
import { toNumber } from "../../helpers/number";
import * as styles from "./liquid-staking.css";
import { scrollBar } from "../shared/shared.css";
import type { ThemeVariant } from "../../models/system.model";
import type {
  LiquidStakingProps,
  LiquidStakingToken,
} from "./liquid-staking.types";
import NumberField from "../number-field";

function LiquidStaking(props: LiquidStakingProps) {
  const {
    decimals = 6,
    rewardLabel = "What you'll get",
    accordionLabel = "Learn more",
    submitButtonLabel = "Liquid Stake",
    stakeLabel = "Select amount",
    footerLabel = "Powered by Cosmology",
    halfButtonLabel = "Half",
    maxButtonLabel = "Max",
    availableLabel = "Available",
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [theme, setTheme] = useState(() => "light");
  const [isMounted, setIsMounted] = useState(() => false);
  const [isDirty, setIsDirty] = useState(() => false);
  const [scrollOffset, setScrollOffset] = useState(() => 0);
  const [expanded, setExpanded] = useState(() => false);
  const [stakeToken, setStakeToken] = useState(() => null);
  const [stakeAmount, setStakeAmount] = useState(() => 0);
  const [rewardAmount, setRewardAmount] = useState(() => 0);
  const [width, setWidth] = useState(() => 0);
  function handleToggleExpand() {
    if (!isDirty) {
      setIsDirty(true);
    }
    if (expanded) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }
  function handleStakeAmountChange(amount: number) {
    setStakeAmount(amount);
    props?.onChange?.(amount);
  }
  function handleStakeHalf() {
    if (typeof props.onHalf === "function") {
      return props.onHalf();
    }
    const result = new Bignumber(props.stakeToken.available ?? 0)
      .dividedBy(2)
      .toNumber();
    props.onChange?.(result);
  }
  function handleStakeMax() {
    if (typeof props.onMax === "function") {
      return props.onMax();
    }
    const result = new Bignumber(props.stakeToken.available ?? 0).toNumber();
    props.onChange?.(result);
  }
  function isAccordionVisible() {
    return (
      Array.isArray(props.descriptionList) && props.descriptionList?.length > 0
    );
  }
  function isSmallSize() {
    return width < 326;
  }
  useEffect(() => {
    setTheme(store.getState().theme);
    setIsMounted(true);
    function handleScroll(_event: Event) {
      setScrollOffset(scrollRef.current.scrollTop);
    }
    scrollRef.current.addEventListener("scroll", handleScroll);
    resizeObserver.current = new ResizeObserver((entries) => {
      const rootWidth = entries[0]?.borderBoxSize[0]?.inlineSize ?? 0;
      setWidth(rootWidth);
    });
    resizeObserver.current.observe(rootRef.current, { box: "border-box" });
    const cleanupStore = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
    cleanupRef.current = () => {
      cleanupStore();
      if (rootRef.current instanceof Element) {
        resizeObserver.current.unobserve(rootRef.current);
      }
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    }; // Controlled prop
    if (props.stakeToken) {
      setStakeToken(props.stakeToken);
    }
  }, []);
  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);
  return (
    <Box
      minHeight="444px"
      borderRadius="$md"
      position="relative"
      p={isMounted ? (width < 350 ? "$4" : "$10") : "$10"}
      backgroundColor={theme === "light" ? "$inputBg" : "$blackPrimary"}
      boxRef={rootRef}
      {...props.attributes}
      {...props.domAttributes}
      className={clx(props.className, styles.root)}
    >
      <Box bg="$cardBg" borderRadius="$md">
        <Stack
          direction="vertical"
          space="$6"
          attributes={
            isSmallSize()
              ? { pl: "$4", pr: "$4", py: "$6" }
              : { pl: "18px", pr: "$8", py: "$8" }
          }
        >
          <Stack
            direction="horizontal"
            space={isSmallSize() ? "$2" : "$4"}
            attributes={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              fontWeight="$normal"
              color="$textSecondary"
              fontSize={isSmallSize() ? "$2xs" : "$sm"}
              attributes={{ flexShrink: "0", flexGrow: "0" }}
            >
              {stakeLabel}
            </Text>
            <Stack
              direction="horizontal"
              space={isSmallSize() ? "$4" : "$8"}
              attributes={{
                flexShrink: "0",
                flexGrow: "1",
                justifyContent: width < 396 ? "space-between" : "flex-end",
                alignItems: "center",
              }}
            >
              <Stack direction="horizontal" space="$4">
                <Text
                  fontWeight="$semibold"
                  color="$textSecondary"
                  fontSize={isSmallSize() ? "$2xs" : "$sm"}
                >
                  {availableLabel}
                </Text>
                <Text
                  fontWeight="$semibold"
                  color="$text"
                  fontSize={isSmallSize() ? "$2xs" : "$sm"}
                >
                  {formatNumeric(
                    props.stakeToken.available ?? 0,
                    props.precision
                  )}
                </Text>
              </Stack>
              <Stack
                direction="horizontal"
                space="$4"
                align="center"
                attributes={{
                  justifyContent: "flex-end",
                  flexGrow: "0",
                  flexShrink: "1",
                }}
              >
                <Box
                  as="button"
                  attributes={{ onClick: () => handleStakeHalf() }}
                  className={styles.headerButton[theme]}
                >
                  <Box as="span" fontSize={isSmallSize() ? "$2xs" : "$sm"}>
                    {halfButtonLabel}
                  </Box>
                </Box>
                <Box
                  as="button"
                  attributes={{ onClick: () => handleStakeMax() }}
                  className={styles.headerButton[theme]}
                >
                  <Box as="span" fontSize={isSmallSize() ? "$2xs" : "$sm"}>
                    {maxButtonLabel}
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="horizontal"
            space="$8"
            domAttributes={{ "data-part-id": "stake" }}
          >
            <Box display="block" flexShrink="0">
              <Box
                as="img"
                attributes={{
                  src: props.stakeToken.imgSrc,
                  alt: props.stakeToken.symbol,
                }}
                width={isSmallSize() ? "28px" : "50px"}
                height={isSmallSize() ? "28px" : "50px"}
              />
            </Box>
            <Stack
              direction="horizontal"
              space="$0"
              attributes={{ width: "100%", justifyContent: "space-between" }}
            >
              <Stack
                direction="vertical"
                space="$1"
                attributes={{
                  justifyContent: "space-between",
                  flexShrink: "0",
                }}
                domAttributes={{ "data-part-id": "stake-symbol" }}
              >
                <Text
                  fontWeight="$semibold"
                  lineHeight="$shorter"
                  fontSize={
                    isSmallSize() ? "$lg" : { mobile: "$lg", mdMobile: "$3xl" }
                  }
                >
                  {props.stakeToken.symbol}
                </Text>
                <Text
                  color="$textSecondary"
                  fontSize="$sm"
                  fontWeight="$normal"
                >
                  {props.stakeToken.name}
                </Text>
              </Stack>
              <Stack
                direction="vertical"
                space="$1"
                attributes={{
                  width: { mobile: "120px", mdMobile: "228px" },
                  alignItems: "flex-end",
                }}
                domAttributes={{ "data-part-id": "stake-amt" }}
              >
                <NumberField
                  size="sm"
                  borderless
                  value={props.stakeAmount}
                  minValue={0}
                  maxValue={toNumber(props.stakeToken.available)}
                  onChange={(value) => handleStakeAmountChange(value)}
                  onBlur={(event) => {
                    const target = event.target as HTMLInputElement;
                    props.onBlur?.(Number(target.value));
                  }}
                  formatOptions={{
                    minimumFractionDigits: 0,
                    maximumFractionDigits: props.precision,
                  }}
                  inputClassName={clx(
                    styles.resetNumberInputBg,
                    isSmallSize() ? styles.numberInputSm : styles.numberInputMd
                  )}
                />
                <Text
                  color="$textSecondary"
                  fontSize="$xs"
                  fontWeight="$normal"
                >
                  $
                  {formatNumeric(
                    props.stakeToken.priceDisplayAmount,
                    props.precision
                  )}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Stack
        direction="vertical"
        space="$6"
        attributes={
          isSmallSize()
            ? { pl: "$4", pr: "$4", py: "$6" }
            : { pl: "18px", pr: "$8", py: "$8" }
        }
      >
        <Text
          fontWeight="$normal"
          color="$textSecondary"
          fontSize={isSmallSize() ? "$2xs" : "$sm"}
        >
          {rewardLabel}
        </Text>
        <Stack
          direction="horizontal"
          space="$8"
          domAttributes={{ "data-part-id": "reward" }}
        >
          <Box display="block" flexShrink="0">
            <Box
              as="img"
              attributes={{
                src: props.reward.imgSrc,
                alt: props.reward.symbol,
              }}
              width={isSmallSize() ? "28px" : "50px"}
              height={isSmallSize() ? "28px" : "50px"}
            />
          </Box>
          <Stack
            direction="horizontal"
            space="$0"
            attributes={{ width: "100%", justifyContent: "space-between" }}
          >
            <Stack
              direction="vertical"
              space="$1"
              domAttributes={{ "data-part-id": "reward-symbol" }}
            >
              <Text
                fontWeight="$semibold"
                lineHeight="$shorter"
                fontSize={
                  isSmallSize() ? "$lg" : { mobile: "$lg", mdMobile: "$3xl" }
                }
              >
                {props.reward.symbol}
              </Text>
              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                {props.reward.name}
              </Text>
            </Stack>
            <Stack
              direction="vertical"
              space="$1"
              attributes={{ alignItems: "flex-end" }}
              domAttributes={{ "data-part-id": "reward-amt" }}
            >
              <Text
                fontWeight="$semibold"
                lineHeight="$shorter"
                fontSize={
                  isSmallSize() ? "$lg" : { mobile: "$lg", mdMobile: "$xl" }
                }
              >
                {formatNumeric(props.reward.rewardAmount, props.precision)}
              </Text>
              <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
                $
                {formatNumeric(
                  props.reward.priceDisplayAmount,
                  props.precision
                )}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Box
        py="$8"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="1px"
      >
        <Divider orientation="horizontal" />
      </Box>
      <Box
        position="relative"
        maxWidth="100%"
        minHeight="$16"
        attributes={{ "data-part-id": "accordion" }}
      >
        <Box
          width="100%"
          position="absolute"
          right={0}
          top={0}
          attributes={{ "data-part-id": "accordion-button-container" }}
        >
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              py: "$4",
              position: "relative",
              justifyContent: "flex-end",
              zIndex: 1,
              overflowX: "clip",
              backgroundColor: theme === "light" ? "$inputBg" : "$blackPrimary",
              width: scrollOffset > 0 ? "100%" : "$fit",
              marginLeft: "auto",
            }}
            domAttributes={{ "data-part-id": "accordion-button" }}
          >
            {!isSmallSize() ? (
              <Text
                as="p"
                fontWeight="$semibold"
                color="$textSecondary"
                fontSize={isSmallSize() ? "$2xs" : "$sm"}
                attributes={{ py: "$2" }}
              >
                {accordionLabel}
              </Text>
            ) : null}
            {typeof props.renderAccordionButton === "function" ? (
              <>
                {props.renderAccordionButton({
                  expanded: expanded,
                  onClick: () => {
                    handleToggleExpand();
                  },
                })}
              </>
            ) : null}
            {typeof props.renderAccordionButton !== "function" ? (
              <IconButton
                size="sm"
                intent={expanded ? "tertiary" : "secondary"}
                icon={expanded ? "arrowUpS" : "arrowDownS"}
                iconSize={isSmallSize() ? "$4xl" : "$3xl"}
                onClick={(event) => handleToggleExpand()}
              />
            ) : null}
            <Box
              p="$4"
              position="absolute"
              transition="all 0.2s"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1}
              backgroundColor={
                scrollOffset > 0
                  ? theme === "light"
                    ? "$inputBg"
                    : "$blackPrimary"
                  : "transparent"
              }
              boxShadow={
                scrollOffset > 0
                  ? `
                  0px 3.8px 4.6px -5px rgba(0, 0, 0, 0.016),
                  0px 10px 11.6px -5px rgba(0, 0, 0, 0.022),
                  0px 21.4px 23.6px -5px rgba(0, 0, 0, 0.028),
                  0px 47.8px 48.5px -5px rgba(0, 0, 0, 0.034),
                  0px 200px 133px -5px rgba(0, 0, 0, 0.05)
              `
                  : "none"
              }
            />
          </Stack>
        </Box>
        <div
          data-part-id="scroll-container"
          ref={scrollRef}
          className={clx(
            {
              [styles.accordionPanel.expanded]: expanded && isDirty,
              [styles.accordionPanel.contracted]: !expanded && isDirty,
              [styles.accordionPanel.init]: !isDirty,
            },
            scrollBar[theme]
          )}
        >
          <Stack
            direction="vertical"
            space="$8"
            attributes={{
              paddingTop: "$2",
              paddingBottom: expanded ? "150px" : "$0",
            }}
            domAttributes={{ "data-part-id": "description-list" }}
          >
            {props.descriptionList?.map((listItem) => (
              <Stack direction="vertical" space="$4" key={listItem.title}>
                <Stack
                  direction="horizontal"
                  space="$4"
                  attributes={{ py: "$4", height: "$12" }}
                >
                  <Text
                    as="p"
                    fontSize="$sm"
                    fontWeight="$semibold"
                    color="$textSecondary"
                  >
                    {listItem.title}
                  </Text>
                  <Text as="p" fontSize="$sm" fontWeight="$semibold">
                    {listItem.subtitle}
                  </Text>
                </Stack>
                <Text
                  as="p"
                  fontSize="$xs"
                  fontWeight="normal"
                  lineHeight="$base"
                >
                  {listItem.desc}
                </Text>
              </Stack>
            ))}
            {props.bottomLink ? (
              <Box textAlign="center">
                <Box
                  as="a"
                  px="$4"
                  py="$2"
                  textDecoration="none"
                  borderRadius="$md"
                  display="inline-block"
                  backgroundColor="$background"
                  attributes={{
                    href: props.bottomLink.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }}
                >
                  <Stack
                    as="span"
                    space="$2"
                    direction="horizontal"
                    attributes={{ alignItems: "center" }}
                  >
                    <Text as="span" color="$textSecondary" fontSize="$sm">
                      {props.bottomLink.label}
                    </Text>
                    <Icon
                      name="externalLinkLine"
                      color="$textSecondary"
                      size="$2xl"
                    />
                  </Stack>
                </Box>
              </Box>
            ) : null}
          </Stack>
        </div>
      </Box>
      <Box
        width="$full"
        py="$4"
        zIndex="$0"
        position={expanded ? "absolute" : "relative"}
        bottom={expanded ? 0 : "unset"}
        left={expanded ? "0" : "unset"}
        right={expanded ? "0" : "unset"}
        px={expanded ? "$10" : "$0"}
        backgroundColor={theme === "light" ? "$inputBg" : "$blackPrimary"}
        attributes={{ "data-part-id": "footer" }}
      >
        <Stack direction="vertical" space={isSmallSize() ? "$6" : "$10"}>
          {typeof props.renderSubmitButton === "function" ? (
            <>{props.renderSubmitButton()}</>
          ) : null}
          {typeof props.renderSubmitButton !== "function" ? (
            <Button
              intent="tertiary"
              {...props.submitButtonProps}
              fluidWidth
              onClick={(event) => props.onSubmit?.(event)}
              disabled={props.isSubmitDisabled}
              size={isSmallSize() ? "sm" : "lg"}
            >
              <Box
                as="span"
                mr={isSmallSize() ? "$4" : "$8"}
                fontSize={isSmallSize() ? "$xs" : "inherit"}
              >
                {submitButtonLabel}
              </Box>
              <Icon
                name="timeLine"
                color="inherit"
                attributes={{ mr: isSmallSize() ? "$2" : "$4" }}
              />
              <Text
                fontSize="$sm"
                fontWeight="$normal"
                as="span"
                color="inherit"
              >
                ≈   {props.timeEstimateLabel}
              </Text>
            </Button>
          ) : null}
          <Text
            fontSize="$sm"
            fontWeight="$normal"
            color="$textSecondary"
            textAlign="center"
            domAttributes={{ "data-part-id": "footer-label" }}
          >
            {footerLabel}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
export default LiquidStaking;
