
import { Ref, ref } from "vue";
import { Position } from "./type"
/**
  * @description 拖拽组件
  * @param {HTMLElement} target 鼠标初始按下位置
  * @param {'right' | 'left' | 'top' | 'bottom'}  direction 拖拽方向
  */

export const useDragable = (target: Ref<HTMLElement | null>, direction: 'right' | 'left' | 'top' | 'bottom') => {

    /**
     * @description 鼠标初始按下位置[常量]
     */

    const initPosition = ref<Position>()
    /**
     * @description 鼠标移动点击的位置
     */
    const movePosition = ref<Position>()
    /**
     * @description target盒子的宽、高[常量]
     */
    const tagrgetDesc = ref<Position>()
    /**
     * @description 移动的距离
     */
    const pressedDelta = ref<Position>()
    /**
    * @description 是否被拖拽
    */
    const isDrag = ref<boolean>(false)
    /**
     * @description 是否成功拖拽
     */
    const isSuccess = ref<boolean>(false)
    const start = (e: MouseEvent) => {
        isDrag.value = true
        initPosition.value = {
            x: e.clientX,
            y: e.clientY
        };
        tagrgetDesc.value = {
            x: target.value!.clientWidth,
            y: target.value!.clientHeight
        }
    }
    const move = (e: MouseEvent) => {
        if (isDrag.value) {
            movePosition.value = {
                x: e.clientX,
                y: e.clientY,
            }
            pressedDelta.value = {
                x: movePosition.value!.x - initPosition.value!.x,
                y: movePosition.value!.y - initPosition.value!.y,
            }

            /**
             * @description 根据拖拽方向设置盒子的位置
             */
            switch (direction) {
                case 'right':
                    target.value!.style.left = `${pressedDelta.value!.x}px`
                    // target.value!.style.left = `${pressedDelta.value!.x}px`
                    if (pressedDelta.value!.x > 150) {
                        target.value!.style.left = `150px`
                    }
                    if (pressedDelta.value!.x < 0) {
                        target.value!.style.left = `0px`
                    }
                    if (pressedDelta.value!.x > tagrgetDesc.value!.x / 2) {
                        target.value!.style.background = `red`
                        isSuccess.value = true
                    } else {
                        target.value!.style.background = `#97cdfd`
                        isSuccess.value = false
                    }
                    break
                case 'left':
                    target.value!.style.left = `${pressedDelta.value!.x}px`
                    if (pressedDelta.value!.x < -150) {
                        target.value!.style.left = `-150px`
                    }
                    if (pressedDelta.value!.x > 0) {
                        target.value!.style.left = `0px`
                    }
                    if (-pressedDelta.value!.x > tagrgetDesc.value!.x / 2) {
                        target.value!.style.background = `red`
                        isSuccess.value = true
                    } else {
                        target.value!.style.background = `#97cdfd`
                        isSuccess.value = false
                    }
                    break
                case 'top':
                    target.value!.style.top = `${pressedDelta.value!.y}px`
                    if (pressedDelta.value!.y < -150) {
                        target.value!.style.top = `-150px`
                    }
                    if (pressedDelta.value!.y > 0) {
                        target.value!.style.top = `0px`
                    }
                    if (-pressedDelta.value!.y > tagrgetDesc.value!.y / 2) {
                        target.value!.style.background = `red`
                        isSuccess.value = true
                    } else {
                        target.value!.style.background = `#97cdfd`
                        isSuccess.value = false
                    }
                    break
                case 'bottom':
                    target.value!.style.top = `${pressedDelta.value!.y}px`
                    if (pressedDelta.value!.y > 150) {
                        target.value!.style.top = `150px`
                    }
                    if (pressedDelta.value!.y < 0) {
                        target.value!.style.top = `0px`
                    }
                    if (pressedDelta.value!.y > tagrgetDesc.value!.y / 2) {
                        target.value!.style.background = `red`
                        isSuccess.value = true
                    } else {
                        target.value!.style.background = `#97cdfd`
                        isSuccess.value = false
                    }
                    break
            };
        }
    }
    /**
     * @description 事件
     */
    const end = () => {
        isDrag.value = false
        if (isSuccess.value) {
            alert('拖拽成功')
            isSuccess.value = false
            target.value!.style.left = `0px`;
            target.value!.style.top = `0px`;
            target.value!.style.backgroundColor = '#97cdfd';
        } else {
            target.value!.style.left = `0px`;
            target.value!.style.top = `0px`;
        }
    }
    
    const up = (e: MouseEvent) => {
        end()
    }

    const out = (e: MouseEvent) => {
        end()
    }
    target.value!.addEventListener("mousedown", start);
    target.value!.addEventListener("mousemove", move);
    target.value!.addEventListener("mouseup", up);
    target.value!.addEventListener("mouseout", out);

}
