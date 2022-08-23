
import { Ref, ref, watch } from "vue";
import { Direction, Position, Target } from "./type"
/**
  * @description 拖拽组件
  * @param {HTMLElement} target 鼠标初始按下位置
  * @param {'right' | 'left' | 'top' | 'bottom'}  direction 拖拽方向
  * @param {number} triggerBoundary 拖拽边界(默认为2,作为盒子的百分比分母)
  * @param {() => void} triggerFn 拖拽触发成功回调
  * @param {() => void} triggeredFn 拖拽触发成功完成后的回调
  */

export const useDragable = (
    target: Target,
    direction: Direction,
    triggerFn: (target: Target) => void,
    triggeredFn: (target: Target) => void,
    triggerBoundary: number) => {
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
    /**
     * @description 记录目标的style
     */
    const elStyle = window.getComputedStyle(target.value).backgroundColor


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
                    //大于盒子宽度禁止拖拽
                    pressedDelta.value!.x > tagrgetDesc.value!.x ?
                        target.value!.style.left = `${tagrgetDesc.value!.x}px` : ""
                    //小于边界禁止拖拽
                    pressedDelta.value!.x < 0 ? target.value!.style.left = `0px` : ""
                    //成功拖拽
                    pressedDelta.value!.x > tagrgetDesc.value!.x / triggerBoundary ?
                        isSuccess.value = true : isSuccess.value = false

                    break
                case 'left':
                    target.value!.style.left = `${pressedDelta.value!.x}px`
                    pressedDelta.value!.x < -tagrgetDesc.value!.x ?
                        target.value!.style.left = `-${tagrgetDesc.value!.x}` : ""
                    pressedDelta.value!.x > 0 ? target.value!.style.left = `0px` : ""
                    pressedDelta.value!.x < - tagrgetDesc.value!.x / triggerBoundary ?
                        isSuccess.value = true : isSuccess.value = false
                    break
                case 'top':
                    console.log(pressedDelta.value!.y, -tagrgetDesc.value!.y)
                    target.value!.style.top = `${pressedDelta.value!.y}px`
                    pressedDelta.value!.y < -tagrgetDesc.value!.y ?
                        target.value!.style.top = `-${tagrgetDesc.value!.y}px` : ""
                    pressedDelta.value!.y > 0 ? target.value!.style.top = `0px` : ""
                    pressedDelta.value!.y < -tagrgetDesc.value!.y / triggerBoundary ?
                        isSuccess.value = true : isSuccess.value = false
                    break
                case 'bottom':

                    target.value!.style.top = `${pressedDelta.value!.y}px`
                    pressedDelta.value!.y > tagrgetDesc.value!.y ?
                        target.value!.style.top = `${tagrgetDesc.value!.y}px` : ""
                    pressedDelta.value!.y < 0 ? target.value!.style.top = `0px` : ""
                    pressedDelta.value!.y > tagrgetDesc.value!.y / triggerBoundary ?
                        isSuccess.value = true : isSuccess.value = false
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
            triggeredFn(target)
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
    target.value?.addEventListener("mousedown", start);
    target.value?.addEventListener("mousemove", move);
    target.value?.addEventListener("mouseup", up);
    target.value?.addEventListener("mouseout", out);
    watch(isSuccess, (val) => {
        console.log(val)
        console.log(elStyle)
        val ? triggerFn(target) : target.value.style.backgroundColor = elStyle

    })
}
