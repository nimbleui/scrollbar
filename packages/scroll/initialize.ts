import { GAP, type ElementType, type ScrollbarBarInfo, type ScrollOptions } from "@nimble-ui/common";
import { isFunctionOrValue } from "@nimble-ui/utils";
import { computeSize } from "./computeSize";
import { handleElement } from "./handleElement";

export function initialize(el: ElementType, options: ScrollOptions) {
  const data: ScrollbarBarInfo = { ratioY: 1, ratioX: 1, xShow: false, yShow: false };

  // 处理元素
  const { getBarEl, createBarEl } = handleElement(el, options)

  const setData = (val: Partial<ScrollbarBarInfo>) => {
    const { thumbH, thumbV } = getBarEl();
    Object.assign(data, val);
    if (data.xShow && thumbH) {
      thumbH.style.width = `${data.width}px`;
      thumbH.style.transform = `translateX(${data.moveX || 0}%)`;
    }
    if (data.yShow && thumbV) {
      thumbV.style.height = `${data.height}px`;
      thumbV.style.transform = `translateY(${data.moveY || 0}%)`;
    }
    const content = isFunctionOrValue(options.content)
    options.onScroll?.({scrollTop: content.scrollTop, scrollLeft: content.scrollLeft})
  };

  const observer = new MutationObserver(function () {
    const value = isFunctionOrValue(el);
    if (value) computeSize(options, setData);
  })

  function handleScroll(this: HTMLElement) {
    const offsetHeight = this.offsetHeight - GAP;
    const offsetWidth = this.offsetWidth - GAP;
    
    const y = ((this.scrollTop * 100) / offsetHeight) * data.ratioY;
    const x = ((this.scrollLeft * 100) / offsetWidth) * data.ratioX;
    setData({ moveX: x, moveY: y });
  }

  const init = (warp: Element) => {
    const content = isFunctionOrValue(options.content)
    createBarEl();
    computeSize(options, setData);
    content.addEventListener("scroll", handleScroll);
    observer.observe(warp, { childList: true, subtree: true });
  }

  const destroy = () => {
    observer.disconnect();
    const content = isFunctionOrValue(options.content);
    content.removeEventListener('scroll', handleScroll);
  }

  return { data, init, destroy, getBarEl };
}