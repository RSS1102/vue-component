import { Ref } from "vue"

export interface Position {
    x: number
    y: number
}

export type Direction = 'right' | 'left' | 'top' | 'bottom'

export type Target = Ref<HTMLElement >