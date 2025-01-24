import { move } from "@nimble-ui/move";
import { ScrollOptions, ElementType } from "@nimble-ui/common";
import { initialize } from "./createElement";

export function scrollbar(el: ElementType, options: ScrollOptions) {
  const { init, destroy } = initialize(el, options);

  move(el, {
    init,
    down(data, setValue) {
      
    },
    move(data, setValue) {
      console.log(data)
    },
  })

  return {
    destroy
  }
}