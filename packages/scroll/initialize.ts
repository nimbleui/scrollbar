import { GAP, ElementType, SCROLL_BAR, SCROLL_THUMB, type ScrollbarBarInfo, type ScrollOptions } from "@nimble-ui/common";
import { isFunctionOrValue, css } from "@nimble-ui/utils";

function createBarEl(warp: Element) {
  const scrollbarV = document.createElement('div');
  const scrollbarThumbV = document.createElement('div');
  const scrollbarH = document.createElement('div');
  const scrollbarThumbH = document.createElement('div');

  scrollbarV.classList.add('scrollbar-bar');
  scrollbarV.classList.add('is-vertical');
  scrollbarH.classList.add('scrollbar-bar');
  scrollbarH.classList.add('is-horizontal');

  // 设置标识
  scrollbarV.setAttribute(SCROLL_BAR, 'vertical');
  scrollbarH.setAttribute(SCROLL_BAR, 'horizontal');
  scrollbarThumbV.setAttribute(SCROLL_THUMB, 'vertical');
  scrollbarThumbH.setAttribute(SCROLL_THUMB, 'horizontal');

  scrollbarV.appendChild(scrollbarThumbV);
  scrollbarH.appendChild(scrollbarThumbH);

  // 文档碎片
  const fragment = document.createDocumentFragment();
  fragment.appendChild(scrollbarV);
  fragment.appendChild(scrollbarH);
  warp.appendChild(fragment);
  css()
}

export function getBarEl(warp: Element) {
  const barV = warp.querySelector(`[${SCROLL_BAR}='vertical']`);
  const barH = warp.querySelector(`[${SCROLL_BAR}='horizontal']`);
  const thumbV = warp.querySelector(`[${SCROLL_THUMB}='vertical']`);
  const thumbH = warp.querySelector(`[${SCROLL_THUMB}='horizontal']`);
  
  return { barH, barV, thumbH, thumbV };
}

function showOrHideBar(warp: HTMLElement, options: ScrollOptions, callback: (val: ScrollbarBarInfo) => void) {
  const { minSize = 20 } = options;
  const offsetWidth = warp.offsetWidth - GAP;
  const offsetHeight = warp.offsetHeight - GAP;

  const w = offsetWidth ** 2 / warp.scrollWidth;
  const h = offsetHeight ** 2 / warp.scrollHeight;
  const width = Math.max(w, minSize);
  const height = Math.max(h, minSize);
  const ratioX = w / (offsetWidth - w) / (width / (offsetWidth / width));
  const ratioY = h / (offsetHeight - h) / (height / (offsetHeight / height));

  const xShow = width + GAP < offsetWidth;
  const yShow = height + GAP < offsetHeight;

  callback({ ratioX, ratioY, xShow, yShow, width, height });
}

export function initialize(el: ElementType, options: ScrollOptions) {
  const data: ScrollbarBarInfo = { ratioY: 1, ratioX: 1, xShow: false, yShow: false };

  const setData = (val: ScrollbarBarInfo) => {
    Object.assign(data, val);
  };

  const observer = new MutationObserver(function () {
    const value = isFunctionOrValue(el);
    if (value) showOrHideBar(value as HTMLElement, options, setData);
  })

  const handleScroll = () => {
    const warp = isFunctionOrValue(el);
    if (!warp) return

    warp.scrollTop

  }

  const init = (warp: Element) => {
    createBarEl(warp);
    showOrHideBar(warp as HTMLElement, options, setData);
    warp.addEventListener("scroll", handleScroll);
    observer.observe(warp, { childList: true, subtree: true });
  }

  const destroy = () => {
    observer.disconnect();
    const warp = isFunctionOrValue(el);
    warp?.removeEventListener('scroll', handleScroll);
  }

  return { data, init, destroy };
}