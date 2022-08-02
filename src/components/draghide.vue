
<template>
    <div>
        <div id="drag">
            {{ placeMentRef }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";
import dargDisappear from "../util/drag"
// 传入参数
const placeMent = 'left';
const placeMentRef = ref(placeMent)

nextTick(() => {
    const drag = document.querySelector('#drag') as HTMLElement
    dargDisappear(drag, placeMent)
})


</script>

<style scoped>
#drag {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: #97cdfd;
    margin: 100px 300px;
}
</style>
