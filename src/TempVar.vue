<script setup lang="ts" generic="T extends Record<any, any>">
defineProps<{ define: T }>()
</script>

<template>
	<slot v-bind="(define as T)" />
</template>
