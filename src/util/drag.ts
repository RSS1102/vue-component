/**
  * @param {number} target 鼠标初始按下位置
  * @param {'right' | 'left' | 'top' | 'bottom'} placement 盒子初始位置
  */
type dargDisappearType = (target: HTMLElement, placement: 'right' | 'left' | 'top' | 'bottom') => void
const dargDisappear: dargDisappearType = (target, placement) => {
    /**
     * @param {number} dragPlaceX 鼠标 X 初始按下位置
     */
    let dragPlaceX = 0;
    /**
     * @param {number} dragPlaceY 鼠标 Y 初始按下位置
     */
    let dragPlaceY = 0;
    /**
     * @param {boolean} isPress 是否按下鼠标
     */
    let isPress = false;
    /**
     * @param {number} dragOffset 盒子 X 初始位置
     */
    let dragOffsetX = 0;
    /**
     * @param {number} dragOffset 盒子 Y 初始位置
     */
    let dragOffsetY = 0;
    /**
     * @param {boolean} isSuccess 是否成功拖拽
     */
    let isSuccess = false;


    /**
     * @event dragMouseDown 按下鼠标
     */
    const dragMouseDown = (e: MouseEvent) => {
        dragPlaceX = e.clientX;
        dragPlaceY = e.clientY;
        isPress = true;
        dragOffsetX = target.offsetLeft;
        dragOffsetY = target.offsetTop;
    }
    /**
   * @event dragMouseMove 开始拖拽
   */
    const dragMouseMove = (e: MouseEvent) => {
        if (isPress) {
            switch (placement) {
                case 'right':
                    target.style.left = e.clientX - dragPlaceX + 'px';
                    if (e.clientX - dragPlaceX >= target.clientWidth) {
                        // 限制边界right
                        target.style.left = target.clientWidth + 'px';
                    } else if (target.clientWidth / 2 < e.clientX - dragPlaceX
                        && e.clientX - dragPlaceX < target.clientWidth) {
                        target.style.backgroundColor = '#ce1010';
                        isSuccess = true
                    } else if (e.clientX - dragPlaceX < 0) {
                        target.style.left = null as unknown as string;
                    }
                    else {
                        isSuccess = false
                        target.style.backgroundColor = '#97cdfd';
                    }
                    break;
                case 'left':
                    target.style.left = e.clientX - dragPlaceX + 'px';
                    if (e.clientX - dragPlaceX <= - target.clientWidth) {
                        // 限制边界left
                        target.style.left = -target.clientWidth + 'px';
                    } else if (-target.clientWidth < e.clientX - dragPlaceX
                        && e.clientX - dragPlaceX < - target.clientWidth / 2) {
                        target.style.backgroundColor = '#ce1010';
                        isSuccess = true
                    } else if (e.clientX - dragPlaceX > 0) {
                        target.style.left = null as unknown as string;
                    }
                    else {
                        isSuccess = false
                        target.style.backgroundColor = '#97cdfd';
                    }

                    break;
                case 'top':
                    target.style.top = e.clientY - dragPlaceY + 'px';
                    if (e.clientY - dragPlaceY <= -  target.clientHeight) {
                        // 限制边界top
                        target.style.top = -target.clientHeight + 'px';
                    } else if (-target.clientHeight < e.clientY - dragPlaceY
                        && e.clientY - dragPlaceY < - target.clientHeight / 2) {
                        target.style.backgroundColor = '#ce1010';
                        isSuccess = true
                    } else if (e.clientY - dragPlaceY > 0) {
                        target.style.top = null as unknown as string;
                    }
                    else {
                        isSuccess = false
                        target.style.backgroundColor = '#97cdfd';
                    }
                    break;
                case 'bottom':
                    target.style.top = e.clientY - dragPlaceY + 'px';
                    if (target.clientHeight <= e.clientY - dragPlaceY) {
                        // 限制边界bottom
                        target.style.top = target.clientHeight + 'px';
                    } else if (e.clientY - dragPlaceY < target.clientHeight
                        && target.clientHeight / 2 < e.clientY - dragPlaceY) {
                        target.style.backgroundColor = '#ce1010';
                        isSuccess = true
                    } else if (e.clientY - dragPlaceY < 0) {
                        target.style.top = null as unknown as string;
                    }
                    else {
                        isSuccess = false
                        target.style.backgroundColor = '#97cdfd';
                    }
                    break;
            }

        }

    }
    /**
  * @event dragMouseUp 抬起鼠标
  */
    const dragMouseUp = (e: MouseEvent) => {
        isPress = false;
        /**
         * 成功事件处理
         */
        if (isSuccess) {
            // target.style.display='none'
            alert(`${placement}`)
            // 初始化（待定需求)4
            isSuccess = false
            target.style.left = null as unknown as string;
            target.style.top = null as unknown as string;
            target.style.backgroundColor = '#97cdfd';
        } else {
            target.style.left = null as unknown as string;
            target.style.top = null as unknown as string;
        }
    }
    /**
     * @event dragMouseOut 离开拖拽元素
     * 离开元素解除拖拽
     */
    const dragMouseOut = (e: MouseEvent) => {
        isPress = false;
        /**
         * 成功事件处理
         */
        if (isSuccess) {
            // target.style.display='none'
            alert(`${placement}`)
            // 初始化（待定需求)4
            isSuccess = false
            target.style.left = null as unknown as string;
            target.style.top = null as unknown as string;
            target.style.backgroundColor = '#97cdfd';
        } else {
            target.style.left = null as unknown as string;
            target.style.top = null as unknown as string;
        }

    }
    target.addEventListener("mousedown", dragMouseDown);
    target.addEventListener("mousemove", dragMouseMove);
    target.addEventListener("mouseup", dragMouseUp);
    target.addEventListener("mouseout", dragMouseOut);
}

export default dargDisappear