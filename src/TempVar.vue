<script setup lang="ts" generic="T extends { [idx: string]: { [idx: string]: object | U; } | U; }, U extends string | number | bigint | boolean | symbol | null | undefined">
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
