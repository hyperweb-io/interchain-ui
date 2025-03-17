import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { store } from "../../models/store";
import type { OverviewTransferProps } from "./overview-transfer.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

function OverviewTransfer(props: OverviewTransferProps) {
  const {
    transferLabel = "Transfer",
    cancelLabel = "Cancel",
    inputLabel = "Select amount",
  } = props;
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "light");
  const [selectedItem, setSelectedItem] = useState(() => null);
  const [amount, setAmount] = useState(() => 0);
  function handleTransferChange(item: AvailableItem, value: number) {
    setSelectedItem(item);
    setAmount(value);
    props.onChange?.(item, value);
  }
  useEffect(() => {
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
    <Stack
      direction="vertical"
      attributes={{ width: { mobile: "100%", mdMobile: "620px" } }}
    >
      <TransferItem
        hasAvailable
        title={inputLabel}
        defaultSelectedItem={props.defaultSelected}
        dropdownList={props.dropdownList}
        selectedItem={props.selectedItem}
        amount={amount}
        onChange={(item, value) => handleTransferChange(item, value)}
        onItemSelected={(selectedItem) => {
          setSelectedItem(selectedItem);
          props.onChange?.(selectedItem, amount);
        }}
      />
      <Stack
        attributes={{
          marginTop: "$11",
          marginBottom: "$13",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          as="img"
          width="$15"
          height="$15"
          attributes={{ alt: "from chain", src: props.fromChainLogoUrl }}
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
          attributes={{ alt: "to asset", src: props.toChainLogoUrl }}
        />
      </Stack>
      <Button
        intent="tertiary"
        size="lg"
        disabled={props.isSubmitDisabled}
        onClick={(event) => props.onTransfer()}
      >
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            fontSize="$lg"
            fontWeight="$semibold"
            className={styles.btnText[theme]}
          >
            {transferLabel}
          </Text>
          <Icon
            name="timeLine"
            size="$xs"
            attributes={{ marginLeft: "$8", marginRight: "$4" }}
          />
          {!!props.timeEstimateLabel ? (
            <Text fontSize="$xs" className={styles.btnText[theme]}>
              {props.timeEstimateLabel}
            </Text>
          ) : null}
        </Stack>
      </Button>
      <Button variant="unstyled" onClick={(event) => props.onCancel()}>
        {cancelLabel}
      </Button>
    </Stack>
  );
}

export default OverviewTransfer;
