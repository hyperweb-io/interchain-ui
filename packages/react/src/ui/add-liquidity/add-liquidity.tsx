import * as React from "react";
import { useState, useRef, useEffect } from "react";
import BigNumber from "bignumber.js";
import { isEqual, cloneDeep } from "lodash";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import {
  AddItem,
  AddLiquidityProps,
  onAddLiquidityItem,
} from "./add-liquidity.types";

function AddLiquidity(props: AddLiquidityProps) {
  const amountChangeTypeRef = useRef<"1" | "2">("1");
  const lastValuesRef = useRef<AddItem[]>([]);
  const [progress1, setProgress1] = useState(() => 50);

  const [progress2, setProgress2] = useState(() => 50);

  const [amount1, setAmount1] = useState(() => 0);

  const [amount2, setAmount2] = useState(() => 0);

  const [btnText, setBtnText] = useState(() => "Add liquidity");

  const [disabled, setDisabled] = useState(() => true);

  function onChangeHandler(values) {
    if (isEqual(values, lastValuesRef.current)) return;
    props?.onChange(values);
    lastValuesRef.current = cloneDeep(values);
  }

  function addLiquidityItem1() {
    return Object.assign(props?.poolAssets[0], {
      addAmount: progress2 === 100 ? "0" : amount1,
    });
  }

  function addLiquidityItem2() {
    return Object.assign(props?.poolAssets[1], {
      addAmount: progress1 === 100 ? "0" : amount2,
    });
  }

  function isInsufficient() {
    const amount1Invalid = new BigNumber(amount1 || 0).gt(
      props?.poolAssets[0]?.available
    );
    const amount2Invalid = new BigNumber(amount2 || 0).gt(
      props?.poolAssets[1]?.available
    );
    if (progress1 === 100) {
      return amount1Invalid;
    }
    if (progress2 === 100) {
      return amount2Invalid;
    }
    return amount1Invalid || amount2Invalid;
  }

  function isUnAvailable() {
    const amount1Disabled = new BigNumber(amount1 || 0).eq(0);
    const amount2isabled = new BigNumber(amount2 || 0).eq(0);
    if (progress1 === 100) {
      return amount1Disabled;
    }
    if (progress2 === 100) {
      return amount2isabled;
    }
    return amount1Disabled || amount2isabled;
  }

  function handleProgress1Change(progress) {
    setProgress1(progress);
    setProgress2(100 - progress);
    onChangeHandler([
      {
        progress: progress,
        value: amount1,
      },
      {
        progress: 100 - progress,
        value: amount2,
      },
    ]);
  }

  function handleProgress2Change(progress) {
    setProgress2(progress);
    setProgress1(100 - progress);
    onChangeHandler([
      {
        progress: 100 - progress,
        value: amount1,
      },
      {
        progress: progress,
        value: amount2,
      },
    ]);
  }

  function handleAmount1Change(value) {
    if (amountChangeTypeRef.current !== "1") return;
    let value1 = value;
    let value2 = amount2;
    if (progress1 === 50) {
      value2 = new BigNumber(`${value || 0}`)
        .multipliedBy(props?.poolAssets[0]?.priceDisplayAmount || 0)
        .dividedBy(props?.poolAssets[1]?.priceDisplayAmount)
        .toNumber();
    }
    onChangeHandler([
      {
        progress: progress1,
        value: value1,
      },
      {
        progress: progress2,
        value: value2,
      },
    ]);
    setAmount1(value1);
    setAmount2(value2);
  }

  function handleAmount2Change(value) {
    if (amountChangeTypeRef.current !== "2") return;
    let value2 = value;
    let value1 = amount1;
    if (progress2 === 50) {
      value1 = new BigNumber(`${value || 0}`)
        .multipliedBy(props?.poolAssets[1]?.priceDisplayAmount || 0)
        .dividedBy(props?.poolAssets[0]?.priceDisplayAmount)
        .toNumber();
    }
    onChangeHandler([
      {
        progress: progress1,
        value: value1,
      },
      {
        progress: progress2,
        value: value2,
      },
    ]);
    setAmount1(value1);
    setAmount2(value2);
  }

  useEffect(() => {
    if (isInsufficient()) {
      setBtnText("Insufficient Balance");
      setDisabled(true);
    } else if (isUnAvailable()) {
      setBtnText("Add liquidity");
      setDisabled(true);
    } else {
      setBtnText("Add liquidity");
      setDisabled(false);
    }
  }, [amount1, amount2, progress1, progress2]);

  return (
    <Box>
      <Stack
        direction="vertical"
        attributes={{
          paddingBottom: "$10",
        }}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">{props?.poolAssets[0]?.symbol}</Text>
          <Text
            color="$textSecondary"
            attributes={{
              px: "$3",
            }}
          >
            /
          </Text>
          <Text color="$textSecondary">{props?.poolAssets[1]?.symbol}</Text>
        </Stack>
      </Stack>
      <Box paddingBottom="$14">
        <TokenInput
          amount={amount1}
          progress={progress1}
          symbol={props?.poolAssets[0]?.symbol}
          name={props?.poolAssets[0]?.name}
          available={props?.poolAssets[0]?.available}
          tokenIcon={props?.poolAssets[0]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[0]?.priceDisplayAmount}
          onProgressChange={(v) => handleProgress1Change(v)}
          onAmountChange={(value) => handleAmount1Change(value)}
          onFocus={(event) => {
            amountChangeTypeRef.current = "1";
          }}
        />
      </Box>
      <Box paddingBottom="$14">
        <TokenInput
          amount={amount2}
          progress={progress2}
          symbol={props?.poolAssets[1]?.symbol}
          name={props?.poolAssets[1]?.name}
          available={props?.poolAssets[1]?.available}
          tokenIcon={props?.poolAssets[1]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[1]?.priceDisplayAmount}
          onProgressChange={(v) => handleProgress2Change(v)}
          onAmountChange={(value) => handleAmount2Change(value)}
          onFocus={(event) => {
            amountChangeTypeRef.current = "2";
          }}
        />
      </Box>
      <Button
        size="lg"
        intent="tertiary"
        fluidWidth
        disabled={disabled}
        onClick={(event) => props.onAddLiquidity()}
        isLoading={props.isLoading}
      >
        {btnText}
      </Button>
    </Box>
  );
}

export default AddLiquidity;
