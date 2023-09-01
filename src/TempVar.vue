<script setup lang="ts" generic="T extends ToInfer<P>, P extends Primitive">
export type Primitive = string | number | bigint | boolean | symbol | null | undefined
export interface ToInfer<P extends Primitive> {
  [idx: string]: P | ToInfer<P>
}

defineProps<{
  define: T
}>()

defineSlots<{
  defined(_: T): any
}>()
</script>

<template>
  <slot name="defined" v-bind="define" />
</template>
