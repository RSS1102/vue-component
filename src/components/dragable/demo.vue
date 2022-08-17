
<template>
    <div>
        <!-- <div class="place">{{ placeMent }}</div> -->
        <div ref="el" class="drag"></div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, ref, Ref } from "vue";
import { Direction, Target } from "./type";
import { useDragable } from "./useDragable";
// 传入参数
//const placeMent: Direction = 'left';
// const placeMent: Direction = 'right';
const placeMent: Direction = 'top';
// const placeMent: Direction = 'bottom';
const el = ref()
const triggerBoundary = 3;
const triggerFn = (target: Target) => {

    target.value.style.background = `red`
}
const triggeredFn = (target: Target) => {
    console.log("成功")
    target.value!.style.background = `green`
}

nextTick(() => useDragable(el, placeMent, triggerFn, triggeredFn, triggerBoundary))

</script>

<style scoped>
.drag {
    position: fixed;
    width: 200px;
    height: 200px;
    background-color: #97cdfd;
    margin: 300px;
}

.place {
    background-color: aqua;
}
</style>
