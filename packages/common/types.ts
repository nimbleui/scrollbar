export type TypesFun<T> = T | (() => T | null | undefined);

export type ElementType = TypesFun<Element>;

export interface ScrollOptions {
  always?: boolean;
  minSize?: number;
  content: Element | (() => Element);
}

export interface ScrollbarBarInfo {
  ratioX: number;
  ratioY: number;
  width?: number;
  height?: number;
  xShow: boolean;
  yShow: boolean;
  moveX?: number;
  moveY?: number;
}
