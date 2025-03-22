import * as React from "react";
import { useState, useRef, useEffect } from "react";
import clx from "clsx";
import Box from "../box";
import Divider from "../divider";
import Text from "../text";
import Table from "../table/table";
import TableHead from "../table/table-head";
import TableBody from "../table/table-body";
import TableRow from "../table/table-row";
import TableCell from "../table/table-cell";
import TableColumnHeaderCell from "../table/table-column-header-cell";
import TableRowHeaderCell from "../table/table-row-header-cell";
import { standardTransitionProperties } from "../shared/shared.css";
import * as styles from "./mesh-staking.css";
import { store } from "../../models/store";
import anime from "animejs";
import type { MeshTableProps } from "./mesh-staking.types";

function MeshTable(props: MeshTableProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pinnedTableMeasureRef = useRef<HTMLDivElement>(null);
  const pinnedTableShadowRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(null);
  const [theme, setTheme] = useState(() => "dark");

  const [displayBottomShadow, setDisplayBottomShadow] = useState(() => false);

  const [displayPinnedTableBottomShadow, setDisplayPinnedTableBottomShadow] =
    useState(() => false);

  const [pinnedRows, setPinnedRows] = useState(() => []);

  const [unpinnedRows, setUnpinnedRows] = useState(() => props.data ?? []);

  function shouldSplitPinnedTable() {
    const DEFAULT_SPLIT_THRESHOLD = 4;
    const threshold = props.maxPinnedRows ?? DEFAULT_SPLIT_THRESHOLD;
    return pinnedRows.length > 0 && pinnedRows.length > threshold;
  }

  function shouldPinHeader() {
    if (
      props.pinnedIds == null ||
      (Array.isArray(props.pinnedIds) && (props.pinnedIds ?? []).length === 0)
    ) {
      return false;
    }
    return props.pinnedIds.length > 0 && pinnedRows.length > 0;
  }

  useEffect(() => {
    setTheme(store.getState().theme);
    let cleanupStore = store.subscribe((newState) => {
      setTheme(newState.theme);
    });
    let cleanupRef1 = () => {};
    let cleanupRef2 = () => {};
    if (measureRef.current) {
      const scrollHandler1 = () => {
        const isScrollable1 =
          measureRef.current.scrollHeight > measureRef.current.clientHeight;
        if (!isScrollable1) {
          return setDisplayBottomShadow(false);
        }
        if (measureRef.current.scrollTop === 0) {
          setDisplayBottomShadow(false);
        } else {
          setDisplayBottomShadow(true);
        }
      };
      scrollHandler1();
      measureRef.current.addEventListener("scroll", scrollHandler1);
      cleanupRef1 = () => {
        if (measureRef.current) {
          measureRef.current.removeEventListener("scroll", scrollHandler1);
        }
      };
    }
    if (pinnedTableMeasureRef.current) {
      const scrollHandler2 = () => {
        const isScrollable2 =
          pinnedTableMeasureRef.current.scrollHeight >
          pinnedTableMeasureRef.current.clientHeight;
        if (!isScrollable2) {
          return setDisplayPinnedTableBottomShadow(false);
        }
        if (pinnedTableMeasureRef.current.scrollTop === 0) {
          setDisplayPinnedTableBottomShadow(false);
        } else {
          setDisplayPinnedTableBottomShadow(true);
        }
      };
      scrollHandler2();
      pinnedTableMeasureRef.current.addEventListener("scroll", scrollHandler2);
      cleanupRef2 = () => {
        if (pinnedTableMeasureRef.current) {
          pinnedTableMeasureRef.current.removeEventListener(
            "scroll",
            scrollHandler2
          );
        }
      };
    }
    cleanupRef.current = () => {
      if (cleanupStore) {
        cleanupStore();
      }
      cleanupRef1();
      cleanupRef2();
    };
  }, []);

  useEffect(() => {
    if (!props.pinnedIds) return;
    let newPinnedRows = [];
    let newUnpinnedRows = [];
    if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
      setPinnedRows([]);
    } else {
      newPinnedRows = props.data.filter((row) =>
        props.pinnedIds.includes(row.id)
      );
    }
    if (!props.pinnedIds || (props.pinnedIds ?? []).length === 0) {
      setUnpinnedRows(props.data);
    } else {
      newUnpinnedRows = props.data.filter(
        (row) => !props.pinnedIds.includes(row.id)
      );
    }
    setPinnedRows(newPinnedRows);
    setUnpinnedRows(newUnpinnedRows);
  }, [props.data, props.pinnedIds]);
  useEffect(() => {
    if (!shadowRef.current) return;
    const playAnimation = (isShown: boolean, elementRef: any) => {
      const opacity = isShown ? [0, 1] : [1, 0];
      const height = isShown ? [0, 45] : [45, 0];
      anime({
        targets: elementRef,
        opacity: opacity,
        height: height,
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    };
    playAnimation(displayBottomShadow, shadowRef.current);
    if (!pinnedTableShadowRef.current) return;
    playAnimation(displayPinnedTableBottomShadow, pinnedTableShadowRef.current);
  }, [
    displayBottomShadow,
    shadowRef.current,
    displayPinnedTableBottomShadow,
    pinnedTableShadowRef.current,
  ]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <Box
      width="100%"
      position="relative"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      px={props.borderless ? "$0" : "$11"}
      pt={props.borderless ? "$0" : "$9"}
      pb={props.borderless ? "$0" : "$12"}
      borderColor={props.borderless ? undefined : "$divider"}
      borderWidth={props.borderless ? undefined : "1px"}
      borderStyle={props.borderless ? undefined : "$solid"}
      {...props.containerProps}
      className={clx(props.className, styles.scrollBar)}
    >
      <Box
        position="relative"
        overflowY="auto"
        display={shouldSplitPinnedTable() ? "block" : "none"}
        maxHeight={shouldSplitPinnedTable() ? "214px" : undefined}
        boxRef={pinnedTableMeasureRef}
        className={clx(styles.scrollBar)}
      >
        <Table position="relative" {...props.tableProps}>
          <TableHead position="relative">
            <TableRow backgroundColor="$cardBg">
              {props.columns?.map((column, colIndex) => (
                <TableColumnHeaderCell
                  position="sticky"
                  top="$0"
                  backgroundColor="$cardBg"
                  zIndex="$100"
                  key={column.id}
                  width={column.width}
                  textAlign={column.align}
                  paddingX={colIndex === 0 ? "$6" : "$2"}
                >
                  <Text
                    fontSize="$sm"
                    fontWeight="$normal"
                    color="$textSecondary"
                  >
                    {column.label}
                  </Text>
                </TableColumnHeaderCell>
              ))}
            </TableRow>
            {pinnedRows?.map((pinnedRow, pinnedRowIndex) => (
              <TableRow
                zIndex="$100"
                key={pinnedRow.id}
                className={clx(standardTransitionProperties, styles.tableRow)}
              >
                {props.columns?.map((column) => (
                  <TableColumnHeaderCell
                    backgroundColor="$cardBg"
                    paddingY="$0"
                    key={column.id}
                    width={column.width}
                    textAlign={column.align}
                    height={props.rowHeight}
                    className={clx({
                      [styles.firstRowCell]: pinnedRowIndex === 0,
                      [styles.lastRowCell]:
                        pinnedRowIndex === pinnedRows.length - 1,
                    })}
                  >
                    {!!column.render ? (
                      <>{column.render(pinnedRow, column, true)}</>
                    ) : (
                      <Text
                        fontWeight="$normal"
                        fontSize="$xs"
                        color={column.color ?? "$textPlaceholder"}
                      >
                        {pinnedRow[column.id]}
                      </Text>
                    )}
                  </TableColumnHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
        </Table>
        <Box
          position="absolute"
          width="$full"
          bottom="$0"
          boxRef={pinnedTableShadowRef}
          className={standardTransitionProperties}
        >
          <div
            data-is-visible={displayPinnedTableBottomShadow}
            className={styles.bottomShadow}
          />
        </Box>
      </Box>
      {shouldSplitPinnedTable() ? (
        <Box paddingX="$6">
          <Divider />
        </Box>
      ) : null}
      <Box
        position="relative"
        overflowY="auto"
        display="block"
        boxRef={measureRef}
        maxHeight={shouldPinHeader() ? "312px" : undefined}
        className={clx(styles.scrollBar)}
      >
        <Table position="relative" {...props.tableProps}>
          <TableHead
            position={shouldPinHeader() ? "sticky" : "relative"}
            top={shouldPinHeader() ? "0px" : undefined}
            zIndex={shouldPinHeader() ? "$100" : undefined}
          >
            {!shouldSplitPinnedTable() ? (
              <TableRow backgroundColor="$cardBg">
                {props.columns?.map((column, colIndex) => (
                  <TableColumnHeaderCell
                    key={column.id}
                    width={column.width}
                    textAlign={column.align}
                    paddingX={colIndex === 0 ? "$6" : "$2"}
                  >
                    <Text
                      fontSize="$sm"
                      fontWeight="$normal"
                      color="$textSecondary"
                    >
                      {column.label}
                    </Text>
                  </TableColumnHeaderCell>
                ))}
              </TableRow>
            ) : null}
            {shouldPinHeader() && !shouldSplitPinnedTable() ? (
              <>
                {pinnedRows?.map((pinnedRow, pinnedRowIndex) => (
                  <TableRow
                    zIndex="$100"
                    key={pinnedRow.id}
                    className={clx(
                      standardTransitionProperties,
                      styles.tableRow
                    )}
                  >
                    {props.columns?.map((column) => (
                      <TableColumnHeaderCell
                        backgroundColor="$cardBg"
                        paddingY="$0"
                        key={column.id}
                        width={column.width}
                        textAlign={column.align}
                        height={props.rowHeight}
                        className={clx({
                          [styles.firstRowCell]: pinnedRowIndex === 0,
                          [styles.lastRowCell]:
                            pinnedRowIndex === pinnedRows.length - 1,
                          [styles.borderedTableCell]:
                            shouldPinHeader() &&
                            pinnedRowIndex === pinnedRows.length - 1,
                        })}
                      >
                        {!!column.render ? (
                          <>{column.render(pinnedRow, column, true)}</>
                        ) : (
                          <Text
                            fontWeight="$normal"
                            fontSize="$xs"
                            color={column.color ?? "$textPlaceholder"}
                          >
                            {pinnedRow[column.id]}
                          </Text>
                        )}
                      </TableColumnHeaderCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : null}
          </TableHead>
          <TableBody
            position="relative"
            overflowY={shouldPinHeader() ? "auto" : undefined}
            zIndex={shouldPinHeader() ? "$10" : undefined}
            className={styles.tableBody}
          >
            {unpinnedRows?.map((row) => (
              <TableRow
                key={row.id}
                className={clx(standardTransitionProperties, styles.tableRow)}
              >
                {props.columns?.map((column, index) => (
                  <>
                    {index === 0 ? (
                      <TableRowHeaderCell
                        paddingY="$0"
                        key={`${row.id + column.id}`}
                        width={column.width}
                        height={props.rowHeight}
                        textAlign={column.align}
                        className={styles.tableCell}
                      >
                        {!!column.render ? (
                          <>{column.render(row, column)}</>
                        ) : (
                          <Text
                            fontWeight="$normal"
                            fontSize="$xs"
                            color={column.color ?? "$textPlaceholder"}
                          >
                            {row[column.id]}
                          </Text>
                        )}
                      </TableRowHeaderCell>
                    ) : null}
                    {index > 0 ? (
                      <TableCell
                        paddingY="$0"
                        key={`${row.id + column.id}`}
                        width={column.width}
                        textAlign={column.align}
                        height={props.rowHeight}
                        className={styles.tableCell}
                      >
                        {!!column.render ? (
                          <>{column.render(row, column)}</>
                        ) : (
                          <Text
                            fontWeight="$normal"
                            fontSize="$xs"
                            color={column.color ?? "$textPlaceholder"}
                          >
                            {row[column.id]}
                          </Text>
                        )}
                      </TableCell>
                    ) : null}
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          position="absolute"
          width="$full"
          bottom="$0"
          boxRef={shadowRef}
          display={
            !props.pinnedIds || props.pinnedIds.length === 0 ? "none" : "block"
          }
          className={standardTransitionProperties}
        >
          <div
            data-is-visible={displayBottomShadow}
            className={styles.bottomShadow}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MeshTable;
