import { ElementType, SCROLL_BAR, SCROLL_THUMB, type ScrollOptions } from "@nimble-ui/common";
import { isFunctionOrValue } from "@nimble-ui/utils";

function createBarEl(warp: Element) {
  const scrollbarV = document.createElement('div');
  const scrollbarThumbV = document.createElement('div');
  const scrollbarH = document.createElement('div');
  const scrollbarThumbH = document.createElement('div');
  
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
}

export function getBarEl(warp: Element) {
  const barV = warp.querySelector(`[${SCROLL_BAR}='vertical']`);
  const barH = warp.querySelector(`[${SCROLL_BAR}='horizontal']`);
  const thumbV = warp.querySelector(`[${SCROLL_THUMB}='vertical']`);
  const thumbH = warp.querySelector(`[${SCROLL_THUMB}='horizontal']`);
  
  return { barH, barV, thumbH, thumbV };
}

function showOrHideBar(warp: Element) {
  const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } = warp as HTMLElement;
  const { barH, barV, thumbH, thumbV } = getBarEl(warp);

}

export function initialize(el: ElementType, options: ScrollOptions) {
  const observer = new MutationObserver(function () {
    const value = isFunctionOrValue(el);
    if (value) showOrHideBar(value);
  })

  const init = (warp: Element) => {
    createBarEl(warp);
    showOrHideBar(warp);
    observer.observe(warp, { childList: true, subtree: true });
  }

  const destroy = () => {
    observer.disconnect();
  }

  return { init, destroy }
}