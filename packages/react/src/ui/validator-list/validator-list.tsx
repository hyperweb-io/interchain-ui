import * as React from "react";
import Box from "../box";
import Text from "../text";
import type { ValidatorListProps } from "./validator-list.types";

function ValidatorList(props: ValidatorListProps) {
  const {
    variant = "solid",
    gridLayout = "auto",
    columns = [],
    data = [],
  } = props;
  return (
    <Box
      overflowX={{ mobile: "scroll", tablet: "auto", desktop: "auto" }}
      className={props.className}
    >
      <Box
        as="table"
        borderRadius="$lg"
        padding={variant === "solid" ? "$10" : "$0"}
        backgroundColor={variant === "solid" ? "$cardBg" : "$transparent"}
        tableLayout={gridLayout === "auto" ? "auto" : "fixed"}
        {...props.tableProps}
      >
        <Box as="thead">
          <Box as="tr">
            {columns?.map((column) => (
              <Box
                as="th"
                paddingX="$2"
                paddingY="$5"
                key={column.id}
                width={column.width}
                textAlign={column.align}
              >
                <Text
                  fontWeight="$normal"
                  fontSize="$sm"
                  color={column.color ?? "$textSecondary"}
                  textTransform={column.textTransform}
                >
                  {column.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {data?.map((item) => (
            <Box as="tr">
              {columns?.map((column, index) => (
                <Box
                  paddingX="$2"
                  paddingY="$5"
                  as={index === 0 ? "th" : "td"}
                  key={column.id}
                  textAlign={column.align}
                >
                  {!!column.render ? (
                    <>{column.render(item, column)}</>
                  ) : (
                    <Text
                      fontWeight="$semibold"
                      fontSize="$xs"
                      color={column.color}
                    >
                      {item[column.id]}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ValidatorList;
