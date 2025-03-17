// Help "resolve" to the final type value of a type
export type Resolve<T> = {
  [Key in keyof T]: T[Key];
} & {};

// Utility type to convert string literal types to String constructor
export type StringifyLeaf<T> = T extends string ? String : T;

// Recursive type to walk through the object tree
export type DeepStringConstructor<T> = {
  [P in keyof T]: T[P] extends object
    ? DeepStringConstructor<T[P]>
    : StringifyLeaf<T[P]>;
};

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type LiteralUnion<
  LiteralType extends Primitive,
  BaseType extends Primitive,
> = LiteralType | (BaseType & { _?: never });

export type PartialDeep<T> = T extends object
  ? {
      [P in keyof T]?: PartialDeep<T[P]>;
    }
  : T;

export type UnknownRecord = Record<string, unknown>;

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};
