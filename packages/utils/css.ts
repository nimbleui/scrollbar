export function css() {
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.sheet?.insertRule(`
    .scrollbar-bar {
      position: absolute;
      right: 2px;
      bottom: 2px;
      z-index: 1;
      border-radius: 4px;
      background-color: red;
    }
    `, 0)
  style.sheet?.insertRule(`
    .scrollbar-bar.is-vertical {
      width: 6px;
      top: 2px;
    }`, 1)
  style.sheet?.insertRule(`
  .scrollbar-bar.is-horizontal {
    height: 6px;
    left: 2px;
  }`, 2)
}