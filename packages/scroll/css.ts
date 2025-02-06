export function setCss() {
  const el = document.querySelector('style[css-scrollbar]');
  if (el) return

  const style = document.createElement("style");
  style.setAttribute("css-scrollbar", "");

  style.appendChild(document.createTextNode(
  `.scrollbar-warp { overflow: hidden; position: relative; }
  .scrollbar-warp__content{ scrollbar-width: none; overflow: auto; height: 100%; }
  .scrollbar-warp__content::-webkit-scrollbar { display: none; }
  .scrollbar-bar.is-vertical { width: 6px; top: 2px; }
  .is-vertical > div { width: 100%; }
  .scrollbar-bar.is-horizontal { height: 6px; left: 2px; }
  .is-horizontal > div { height: 100%; }
  .scrollbar-thumb:hover { opacity: 0.6; }
  .scrollbar-bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
  }
  .scrollbar-thumb {
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: #A3A6AD;
    transition: .3s background-color;
    opacity: 0.4;
  }
  `))

  document.head.appendChild(style);
};
