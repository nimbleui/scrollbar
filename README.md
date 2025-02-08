# nimble-ui scrollbar 封装滚动插件

## 📢 介绍
nimble-ui scrollbar 封装滚动插件 

## ⚡ 使用说明

### 安装依赖

```sh
npm i @nimble-ui/scrollbar
# or
yarn add @nimble-ui/scrollbar
# or
pnpm i @nimble-ui/scrollbar
```

### 使用
```html
<template>
  <div ref="warpRef" class="warp">
    <div ref="contentRef" class="content">
      <div
        v-for="item in list"
        :key="item.id"
        :data-drag-id="item.id"
        class="move css"
      >
      {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue';
import { scrollbar } from "@nimble-ui/scrollbar"

defineOptions({ name: 'move' });
const list = reactive([
  { id: 1, title: '测试1' },
  { id: 2, title: '测试2' },
  { id: 3, title: '测试3' },
  { id: 4, title: '测试4' },
  { id: 5, title: '测试5' },
  { id: 6, title: '测试6' },
  { id: 7, title: '测试7' },
  { id: 8, title: '测试8' },
  { id: 9, title: '测试9' },
  { id: 10, title: '测试10' },
]);

setTimeout(() => {
  list.push({id: 11, title: "测试11"})
}, 3000)

const warpRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const getEl = () => warpRef.value;
const { destroy } = scrollbar(getEl, {
  content: () => contentRef.value!,
})
onBeforeUnmount(destroy)
</script>

<style lang="scss">
.warp {
  width: 500px;
  height: 400px;

  .move {
    width: 150px;
    height: 50px;
  }
}
</style>
```
## move 参数
| 属性名  | 说明     | 类型                     | 默认 |
| ------- | -------- | ------------------------ | ---- |
| el      | 画布元素 | element \| () => element | -    |
| options | 参数     | MoveBaseOptions                   | -    |

### MoveBaseOptions属性
```ts
type MoveElType = Element | (() => Element | undefined | null);

interface MoveBaseOptions {
  boundary?: MoveElType | Window; // 拖拽的边界元素
  prevent?: boolean; // 阻止默认事件
  stop?: boolean; // 阻止事件冒泡
  scale?: number | (() => number | undefined); // 缩放比例
  expand?: number; // 边界元素扩大
}

interface MoveDataTypes {
  startX: number; // 按下鼠标x轴位置
  startY: number; // 按下鼠标y轴位置
  moveX: number; // 移动鼠标x轴位置
  moveY: number; // 移动鼠标y轴位置
  disX: number; // 鼠标移动x轴的距离
  disY: number; // 鼠标移动y轴的距离
  endX: number; // 鼠标抬起x轴的距离
  endY: number; // 鼠标抬起Y轴的距离
  isMove: boolean; // 是否移动
  target?: Element; // 当前移动的元素
  binElement?: Element; // 绑定的元素
}

type MoveMouseTouchEvent = MouseEvent | TouchEvent;
type MoveCallbackReturnValue = { down?: any; move?: any; up?: any };
type MoveEventCallbackParam = MoveDataTypes & { e: MoveMouseTouchEvent, value: MoveCallbackReturnValue }

interface MoveOptionsType extends MoveBaseOptions {
  down?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
  move?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
  up?: (data: MoveEventCallbackParam, setValue: (data: any) => void) => void;
  agencyTarget?: (el: Element) => Element | undefined | false | void; // 判断是否要代理
  changeTarget?: (el: Element) => Element; // 改变目标元素
  init?: (el: Element) => void; // 绑定按下事件时执行
}
```
