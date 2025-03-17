import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Box from "../box";
import Text from "../text";
import { store } from "../../models/store";
import {
  standardTransitionProperties,
  scrollBar,
  visuallyHidden,
} from "../shared/shared.css";
import * as styles from "./tabs.css";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type { ThemeVariant } from "../../models/system.model";
import type { TabProps, TabsProps } from "./tabs.types";

function Tabs(props: TabsProps) {
  const tabListRef = useRef<HTMLUListElement | null>(null);
  const cleanupRef = useRef<() => void>(null);
  const [isMounted, setIsMounted] = useState(() => false);

  const [theme, setTheme] = useState(() => "light");

  const [active, setActive] = useState(() => 0);

  const [width, setWidth] = useState(() => 0);

  const [transform, setTransform] = useState(() => "translateX(0)");

  function isControlled() {
    return typeof props.activeTab !== "undefined";
  }

  function getActiveTabId() {
    return isControlled() ? props.activeTab : active;
  }

  function findActiveTabContent() {
    const finalActiveTab = getActiveTabId();
    const panel: TabProps | null = props?.tabs
      ? props?.tabs.find((_, index) => index === finalActiveTab) ?? null
      : null;
    return panel?.content ?? null;
  }

  function getTabContentFor(id: number) {
    const panel: TabProps | null = props?.tabs
      ? props?.tabs.find((_, index) => index === id) ?? null
      : null;
    return panel?.content ?? null;
  }

  function getBgColor() {
    return theme === "light" ? "$gray200" : "$gray800";
  }

  function getTextColor(tabIndex: number) {
    const finalActiveTab = getActiveTabId();
    if (tabIndex !== finalActiveTab) {
      return "$textSecondary";
    }
    return theme === "light" ? "$white" : "$gray900";
  }

  function setActiveStyles(activeTab: number) {
    if (!tabListRef.current) return;
    const nextTab = tabListRef.current.querySelector(
      `[role="tab"][data-tab-key="tab-${activeTab}"]`
    ) as HTMLElement;
    setWidth(nextTab?.offsetWidth ?? 0);
    setTransform(`translateX(${nextTab?.offsetLeft}px)`);
  }

  useEffect(() => {
    setTheme(store.getState().theme);
    setIsMounted(true);
    setTimeout(() => {
      const finalActiveTab = getActiveTabId();
      setActiveStyles(props.defaultActiveTab ?? finalActiveTab);
    }, 100);
    const handleResize = () => {
      const finalActiveTab = getActiveTabId();
      setActiveStyles(finalActiveTab);
    };
    window.addEventListener("resize", handleResize, true);
    cleanupRef.current = store.subscribe((newState) => {
      setTheme(newState.theme);
      window.removeEventListener("resize", handleResize);
    });
  }, []);

  useEffect(() => {
    // Only apply this effect for controlled component
    if (!isControlled()) return;
    setActiveStyles(props.activeTab);
  }, [props.activeTab]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <Box {...props.attributes} className={props.className}>
      <Box
        as="ul"
        position="relative"
        m="$0"
        p="$0"
        backgroundColor="$progressBg"
        bg={getBgColor()}
        zIndex={0}
        minWidth={{
          mobile: "350px",
          tablet: "465px",
          desktop: "465px",
        }}
        maxWidth={{
          mobile: "350px",
          tablet: "unset",
          desktop: "unset",
        }}
        boxRef={tabListRef}
        attributes={{
          role: "tablist",
        }}
        className={clsx(styles.tabsHorizontal, scrollBar[theme])}
      >
        <Box
          backgroundColor={theme === "light" ? "$accentText" : "#F5F7FB"}
          width={`${width}px`}
          transform={transform}
          attributes={{
            "data-part-id": "tab-selection",
          }}
          className={styles.tabSelection}
        />
        {props?.tabs?.map((tab, index) => (
          <Box
            as="li"
            className="tab-item"
            flex={1}
            attributes={{
              role: "tab",
              "data-tab-key": `tab-${index}`,
              "aria-selected": getActiveTabId() === index,
              "aria-controls": `tabpanel-${index}`,
            }}
            key={tab.label}
          >
            <Box
              as="button"
              attributes={{
                onClick: () => {
                  if (!isControlled()) {
                    setActive(index);
                  }
                  setActiveStyles(index);
                  props.onActiveTabChange?.(index);
                },
              }}
              className={styles.tabButton}
            >
              <Text
                fontWeight="$semibold"
                fontSize={{
                  mobile: "$xs",
                  tablet: "$sm",
                  desktop: "$sm",
                }}
                color={getTextColor(index)}
                attributes={{
                  px: {
                    mobile: "$6",
                    tablet: "$14",
                    desktop: "$14",
                  },
                  py: {
                    mobile: "$4",
                    tablet: "$7",
                    desktop: "$7",
                  },
                  borderRadius: "50px",
                  zIndex: getActiveTabId() === index ? -1 : undefined,
                }}
                className={clsx(standardTransitionProperties)}
              >
                {tab.label}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="tab-content">
        <Box
          attributes={{
            role: "tabpanel",
            "aria-labelledby": `btn-${getActiveTabId()}`,
            "data-tab-panel-key": `tabpanel-${getActiveTabId()}`,
          }}
        >
          {props.isLazy ? <>{findActiveTabContent()}</> : null}
          {!props.isLazy ? (
            <>
              {props.tabs?.map((_tabItem, index) => (
                <Box
                  key={index}
                  opacity={getActiveTabId() === index ? 1 : 0}
                  transition={standardTransitionProperties}
                  className={getActiveTabId() === index ? "" : visuallyHidden}
                >
                  {getTabContentFor(index)}
                </Box>
              ))}
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default Tabs;
