export * from "./debug";
export * from "./platform";
export * from "./style";
export * from "./number";

export type Args<T extends Function> = T extends (...args: infer R) => any
  ? R
  : never;

export type AnyFunction<T = any> = (...args: T[]) => any;

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: Args<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}
