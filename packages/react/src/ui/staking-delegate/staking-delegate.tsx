import * as React from "react";
import Box from "../box";
import Stack from "../stack";
import Avatar from "../avatar";
import Text from "../text";
import StakingDelegateInput from "./staking-delegate-input";
import StakingDelegateCard from "./staking-delegate-card";
import type { StakingDelegateProps } from "./staking-delegate.types";
import NumberField from "../number-field";

function StakingDelegate(props: StakingDelegateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$12"
      {...props.attributes}
      className={props.className}
    >
      <Stack
        direction="horizontal"
        space="$8"
        attributes={{
          alignItems: "center",
        }}
      >
        <Avatar
          size="lg"
          name={props.header?.title ?? "Staking validator avatar"}
          src={props.header?.avatarUrl ?? ""}
        />
        <Stack direction="vertical" space="$2">
          {!!props.header?.title ? (
            <Text fontSize="$lg" fontWeight="$semibold" color="$text">
              {props.header?.title}
            </Text>
          ) : null}
          {!!props.header?.subtitle ? (
            <Text fontSize="$md" fontWeight="$normal" color="$textSecondary">
              {props.header?.subtitle}
            </Text>
          ) : null}
        </Stack>
      </Stack>
      {props.headerExtra ? <>{props.headerExtra}</> : null}
      {props.delegationItems && props.delegationItems.length > 0 ? (
        <Box display="flex" alignItems="center" gap="$10" flexWrap="wrap">
          {props.delegationItems?.map((item) => (
            <StakingDelegateCard
              key={item.label}
              label={item.label}
              tokenAmount={item.tokenAmount}
              tokenName={item.tokenName}
              isLoading={item.isLoading}
            />
          ))}
        </Box>
      ) : null}
      {!!props.inputProps ? (
        <StakingDelegateInput {...props.inputProps} />
      ) : null}
      {!!props.footer ? <>{props.footer}</> : null}
    </Box>
  );
}

export default StakingDelegate;
