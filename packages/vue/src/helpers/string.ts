export function truncateTextMiddle(addr: string, maxLength: number) {
  const midChar = "…";
  if (!addr) addr = "";

  if (addr.length <= maxLength) return addr;

  // length of beginning part
  const left = Math.ceil(maxLength / 2);

  // start index of ending part
  const right = addr.length - Math.floor(maxLength / 2) + 1;

  return addr.substring(0, left) + midChar + addr.substring(right);
}
