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
## scrollbar 参数
| 属性名  | 说明     | 类型                     | 默认 |
| ------- | -------- | ----------------------- | ---- |
| el      | 元素     | element \| () => element | -   |
| options | 参数     | ScrollOptions            | -   |

### ScrollOptions属性
```ts
interface ScrollOptions {
  // 总是显示
  always?: boolean;
  // 最小尺寸
  minSize?: number;
  // 内容元素 必填
  content: Element | (() => Element);
  // 当触发滚动事件时，返回滚动的距离
  onScroll?: (data: { scrollLeft: number; scrollTop: number }) => void;
}
```

## scrollbar 暴露方法
| 属性名         |        说明      | 类型                                                         |
| ------------- | ---------------- | ------------------------------------------------------------ |
| scrollTo      | 滚动到一组特定坐标 | (options: ScrollToOptions | number, yCoord?: number) => void |
| setScrollSite | 设置滚动条的距离   | (scrollLeft: number, axis: 'x' | 'y') => void                |
| thumbColor    | 设置滚动条的颜色   | (color: string) => void                                      |
| destroy       | 销毁绑定事件等     | () => void                                                   |
