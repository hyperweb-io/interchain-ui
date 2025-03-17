import * as React from "react";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftProfileCardList from "../nft-profile-card-list";
import type { NftProfileProps } from "./nft-profile.types";

function NftProfile(props: NftProfileProps) {
  return (
    <Stack
      direction="vertical"
      attributes={{
        px: "$10",
        maxWidth: "792px",
        ...props.attributes,
      }}
      className={props.className}
    >
      <Text fontSize="$lg" fontWeight="$semibold">
        {props.title}
      </Text>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        marginTop={{
          mobile: "$6",
          tablet: "$12",
          desktop: "$12",
        }}
        marginBottom={{
          mobile: "$4",
          tablet: "$8",
          desktop: "$8",
        }}
      >
        <Stack
          attributes={{
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Text
            fontSize="$4xl"
            fontWeight="$semibold"
            attributes={{
              marginRight: "4",
            }}
          >
            {props.name}
          </Text>
          {props.isVerified ? (
            <Box paddingTop="$3" paddingLeft="$3">
              <Icon name="jaggedCheck" color="$text" size="$xl" />
            </Box>
          ) : null}
        </Stack>
        <Box
          display={{
            mobile: "block",
            tablet: "none",
            desktop: "none",
          }}
        >
          <Button size="xs" intent="text" onClick={(event) => props.onView?.()}>
            {props.headerButtonLabel}
          </Button>
        </Box>
        <Box
          display={{
            mobile: "none",
            tablet: "block",
            desktop: "block",
          }}
        >
          <Button size="sm" intent="text" onClick={(event) => props.onView?.()}>
            {props.headerButtonLabel}
          </Button>
        </Box>
      </Box>
      <Box
        flexWrap="wrap"
        rowGap="$2"
        columnGap="$10"
        display={{
          mobile: "grid",
          tablet: "flex",
          desktop: "flex",
        }}
        gridTemplateColumns={{
          mobile: "repeat(auto-fit, minmax(min(100px, 100%), 1fr))",
          tablet: "unset",
          desktop: "unset",
        }}
        marginBottom={{
          mobile: "$6",
          tablet: "$12",
          desktop: "$12",
        }}
      >
        {props.meta?.map((item) => (
          <Stack
            space="$4"
            attributes={{
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Text
              fontSize="$xs"
              color="$textSecondary"
              attributes={{
                flexShrink: "0",
              }}
            >
              {item.label}
            </Text>
            <Text
              fontWeight="$semibold"
              attributes={{
                whiteSpace: "pre",
              }}
            >
              {item.value}
            </Text>
          </Stack>
        ))}
      </Box>
      {props.children == null && Array.isArray(props.list) ? (
        <NftProfileCardList
          list={props.list}
          thumbnailBehavior={props.thumbnailBehavior}
        />
      ) : null}
      {props.children != null ? <>{props.children}</> : null}
    </Stack>
  );
}

export default NftProfile;
