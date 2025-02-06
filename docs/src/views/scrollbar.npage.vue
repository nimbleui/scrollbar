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
