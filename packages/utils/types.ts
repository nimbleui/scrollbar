const _toString = Object.prototype.toString;

export function isFunction(el: unknown): el is Function {
  return typeof el === 'function';
}

export function isNumber(el: unknown): el is Number {
  return typeof el === 'number';
}

export function isTouchEvent(val: unknown): val is TouchEvent {
  return _toString.call(val) === '[object TouchEvent]';
}
