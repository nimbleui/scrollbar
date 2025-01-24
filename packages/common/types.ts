export type TypesFun<T> = T | (() => T | null | undefined);

export type ElementType = TypesFun<Element>;

export interface ScrollOptions {
  always?: boolean;
}
