const DATA = 'data-scrollbar-';
export const SCROLL_BAR = `${DATA}bar`;
export const SCROLL_THUMB = `${DATA}thumb`;
export const SCROLL_CONTENT = `${DATA}content`;

export const GAP = 4;

export const MAP = {
  y: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    size: 'scrollHeight',
    direction: 'top',
    client: 'clientY',
  },
  x: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    size: 'scrollWidth',
    direction: 'left',
    client: 'clientX',
  }
} as const
