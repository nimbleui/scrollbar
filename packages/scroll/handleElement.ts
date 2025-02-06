import { ElementType, SCROLL_BAR, SCROLL_THUMB, ScrollOptions } from "@nimble-ui/common";
import { setCss } from "./css";
import { isFunctionOrValue } from "@nimble-ui/utils";

export const handleElement = (el: ElementType, options: ScrollOptions) => {
  function createBarEl() {
    const warp = isFunctionOrValue(el);
    const content = isFunctionOrValue(options.content);
    if (!warp) return

    const scrollbarV = document.createElement('div');
    const scrollbarThumbV = document.createElement('div');
    const scrollbarH = document.createElement('div');
    const scrollbarThumbH = document.createElement('div');

    scrollbarV.classList.add('scrollbar-bar');
    scrollbarV.classList.add('is-vertical');
    scrollbarH.classList.add('scrollbar-bar');
    scrollbarH.classList.add('is-horizontal');
    scrollbarThumbV.classList.add('scrollbar-thumb');
    scrollbarThumbH.classList.add('scrollbar-thumb');

    warp.classList.add('scrollbar-warp');
    content.classList.add('scrollbar-warp__content');

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
    setCss();
    warp.appendChild(fragment);
  }

  function getBarEl() {
    const warp = isFunctionOrValue(el);
    const barV = warp?.querySelector(`[${SCROLL_BAR}='vertical']`);
    const barH = warp?.querySelector(`[${SCROLL_BAR}='horizontal']`);
    const thumbV = warp?.querySelector(`[${SCROLL_THUMB}='vertical']`);
    const thumbH = warp?.querySelector(`[${SCROLL_THUMB}='horizontal']`);
    
    return { barH, barV, thumbH, thumbV };
  }

  return { createBarEl, getBarEl }
}
