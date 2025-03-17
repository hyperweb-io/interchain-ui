import * as React from "react";
import Box from "../box";
import Icon from "../icon";
import Stack from "../stack";
import MeshButton from "./mesh-button";
import type { MeshValidatorSquadEmptyProps } from "./mesh-staking.types";

function MeshValidatorSquadEmpty(props: MeshValidatorSquadEmptyProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="136px"
      paddingBottom="104px"
      gap="$10"
      {...props.attributes}
    >
      {Array.isArray(props.thumbnailSrcs) && props.thumbnailSrcs.length > 0 ? (
        <Box display="flex" position="relative">
          {props.thumbnailSrcs?.map((thumbnailSrc, index) => (
            <Box
              as="span"
              display="inline-block"
              overflow="hidden"
              width="52px"
              borderRadius="$full"
              backgroundColor="$white"
              key={thumbnailSrc + index}
              marginLeft={index === 0 ? undefined : "-16px"}
            >
              <Box
                as="img"
                width="52px"
                height="52px"
                borderRadius="$full"
                attributes={{
                  src: `${thumbnailSrc}`,
                  alt: `squad-thumbnail-${index}`,
                }}
              />
            </Box>
          ))}
        </Box>
      ) : null}
      <Stack direction="horizontal" space="$4">
        <Stack direction="horizontal" space="$1">
          <MeshButton
            width="$11"
            height="34px"
            px="$0"
            py="$0"
            borderTopRightRadius="none"
            borderBottomRightRadius="none"
            colorScheme="secondary"
            onClick={(event) => props.onDecrease?.()}
          >
            <Icon name="subtract" size="$xs" color="inherit" />
          </MeshButton>
          <MeshButton
            width="$11"
            height="34px"
            borderRadius="none"
            px="$0"
            py="$0"
            colorScheme="secondary"
          >
            {props.count}
          </MeshButton>
          <MeshButton
            width="$11"
            height="34px"
            px="$0"
            py="$0"
            borderTopLeftRadius="none"
            borderBottomLeftRadius="none"
            colorScheme="secondary"
            onClick={(event) => props.onDecrease?.()}
          >
            <Icon name="add" size="$xs" color="inherit" />
          </MeshButton>
        </Stack>
        <MeshButton
          width="34px"
          height="34px"
          px="$0"
          py="$0"
          colorScheme="secondary"
          onClick={(event) => props.onRandomize?.()}
        >
          <Icon name="restart" size="$sm" color="inherit" />
        </MeshButton>
      </Stack>
    </Box>
  );
}

export default MeshValidatorSquadEmpty;
