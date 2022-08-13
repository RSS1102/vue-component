
<template>
    <div>
        <!-- <div class="place">{{ placeMent }}</div> -->
        <div ref="el" class="drag"></div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";
import { direction } from "./type";
import { useDragable } from "./useDragable";
// 传入参数
const placeMent: direction['place'] = 'right';
const el = ref<HTMLElement | null>(null)
nextTick(() => useDragable(el, placeMent))
</script>

<style scoped>
.drag {
    position: fixed;
    width: 200px;
    height: 200px;
    background-color: #97cdfd;
    margin: 100px 100px;
}

.place {
    background-color: aqua;
}
</style>
