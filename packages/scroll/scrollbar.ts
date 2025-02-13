import { move } from "@nimble-ui/move";
import { isFunctionOrValue, isObject, isNumber } from "@nimble-ui/utils";
import { type ScrollOptions, type ElementType, MAP } from "@nimble-ui/common";
import { initialize } from "./initialize";

export function scrollbar(el: ElementType, options: ScrollOptions) {
  const { init, destroy, getBarEl } = initialize(el, options);

  function setBarStyle(value: boolean) {
    if (options.always) return;
    const { barH, barV } = getBarEl();
    barH && (barH.style.display = value ? 'block' : 'none');
    barV && (barV.style.display = value ? 'block' : 'none');
  }

  let cursorDown = false;
  let cursorLeave = false;
  function barShowOrHide(e: Event) {
    if (e.type == "mouseenter") {
      cursorLeave = false;
      setBarStyle(true);
    } if (e.type == "mouseleave") {
      cursorLeave = true;
      setBarStyle(cursorDown);
    }
  }

  move(el, {
    prevent: true,
    init: (el) => {
      init(el);
      el.addEventListener('mouseenter', barShowOrHide);
      el.addEventListener('mouseleave', barShowOrHide);
    },
    agencyTarget(el) {
      const { barV, thumbV, barH, thumbH } = getBarEl();
      if (el == barV || el == thumbV || el == barH || el == thumbH ) {
        return el
      }
      return false
    },
    down({ target }, setValue) {
      const { barV, thumbV, barH, thumbH } = getBarEl();
      const content = isFunctionOrValue(options.content);
      if (target == thumbV) {
        cursorDown = true;
        setValue({ thumb: thumbV, bar: barV, direction: 'y', scroll: content.scrollTop, content });
      } else if (target == thumbH) {
        cursorDown = true;
        setValue({ thumb: thumbH, bar: barH, direction: 'x', scroll: content.scrollLeft, content });
      }
    },
    move({ value, disX, disY }) {
      if (!value.down) return
      const { thumb, bar, direction, content, scroll } = value.down;
      const info = MAP[direction as 'x' | 'y'];
      const diff = content[info.size] - content[info.offset];
      const barDiff = bar[info.offset] - thumb[info.offset];

      const dis = direction == 'x' ? disX : disY
      content[info.scroll] = ((dis * diff) / barDiff) + scroll;
    },
    up() {
      cursorDown = false;
      setBarStyle(!cursorLeave);
    }
  })

  function scrollTo(xCord: number, yCord?: number): void
  function scrollTo(options: ScrollToOptions): void
  function scrollTo(arg1: unknown, arg2?: number) {
    const content = isFunctionOrValue(options.content);
    if (isObject(arg1)) {
      content!.scrollTo(arg1)
    } else if (isNumber(arg1) && isNumber(arg2)) {
      content!.scrollTo(arg1, arg2)
    }
  }

  function setScrollSite(value: number, type: 'x' | 'y' = 'y') {
    const content = isFunctionOrValue(options.content);
    if (!isNumber(value)) {
      return console.warn("请传入数字类型");
    }
    content[type == 'y' ? 'scrollTop' : 'scrollLeft'] = value
  }

  return {
    scrollTo,
    setScrollSite,
    thumbColor: (color: string) => {
      const { thumbH, thumbV } = getBarEl();
      thumbH && (thumbH.style.backgroundColor = color);
      thumbV && (thumbV.style.backgroundColor = color);
    },
    destroy: () => {
      destroy();
      const warp = isFunctionOrValue(el);
      warp?.removeEventListener('mouseenter', barShowOrHide);
      warp?.removeEventListener('mouseleave', barShowOrHide);
    },
  }
}
