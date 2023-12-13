<script setup lang="ts" generic="T">
import { onMounted, ref } from 'vue'

defineProps<{
	define: T
}>()

defineSlots<{
	default(_: T): any
}>()

const isMounted = ref(false)
onMounted(() => {
	isMounted.value = true
})
</script>

<template>
	<slot
		v-if="isMounted"
		v-bind="
			define as T
		"
	/>
</template>
