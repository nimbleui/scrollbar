<template>
  <div ref="warpRef" class="warp">
    <div class="content" data-scrollbar-content>
      <div
        v-for="item in list"
        :key="item.id"
        :data-drag-id="item.id"
        class="move"
      >
      {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
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
const getEl = () => warpRef.value;
scrollbar(getEl, {
  
})

</script>

<style lang="scss">
.warp {
  width: 500px;
  position: relative;
  background-color: rgb(117, 107, 255);
  overflow: auto;
  height: 400px;

  .move {
    width: 150px;
    height: 50px;
  }

  .content {
    position: absolute;
    left: 50px;
    top: 25px;
    width: 50%;
    height: 50%;
  }
}
</style>
