import { GAP, type ScrollbarBarInfo, type ScrollOptions } from "@nimble-ui/common";
import { isFunctionOrValue } from "@nimble-ui/utils";

export function computeSize(options: ScrollOptions, callback: (val: ScrollbarBarInfo) => void) {
  const { minSize = 20, content } = options;
  const el = isFunctionOrValue(content);
  if (!el) return

  const offsetWidth = (el as HTMLElement).offsetWidth - GAP;
  const offsetHeight = (el as HTMLElement).offsetHeight - GAP;
  const w = offsetWidth ** 2 / el.scrollWidth;
  const h = offsetHeight ** 2 / el.scrollHeight;
  const width = Math.max(w, minSize);
  const height = Math.max(h, minSize);
  const ratioX = w / (offsetWidth - w) / (width / (offsetWidth - width));
  const ratioY = h / (offsetHeight - h) / (height / (offsetHeight - height));

  const xShow = width + GAP < offsetWidth;
  const yShow = height + GAP < offsetHeight;

  callback({ ratioX, ratioY, xShow, yShow, width, height });
}
