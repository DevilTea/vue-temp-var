# vue-temp-var

A Vue component for defining temporary variables in the template with type inference.

> Checkout the discussion of https://github.com/vuejs/rfcs/discussions/505

> Vue 3.3.0+ is required.

## Install

```bash
npm install vue-temp-var
```

## Usage

### Register Globally

```ts
// src/main.ts
import { createApp } from 'vue'
import TempVar from 'vue-temp-var'

const app = createApp(App)
app.use(TempVar)

// src/components.d.ts
declare module 'vue' {
	export interface GlobalComponents {
		TempVar: typeof import('vue-temp-var').default
	}
}

export {}
```

### Register Locally

```vue
<script setup lang="ts">
import TempVar from 'vue-temp-var'

// ...
</script>
```

### Use

```vue
<script setup lang="ts">
import TempVar from 'vue-temp-var'

function getRandomNumber() {
	return Math.random()
}
</script>

<template>
	<div
		v-for="i in 10"
		:key="`random-${i}`"
	>
		<!-- cause the return value would be random, we should store it somewhere. -->
		<!-- bind a prop 'define' to 'TempVar'. Because it is a prop, it would still be reactive. -->
		<!-- destruct from slot: defined, the type would be kept -->
		<TempVar
			v-slot="{ randomNum }"
			:define="{ randomNum: getRandomNumber() }"
		>
			<span>"{{ randomNum }}"</span>
			<span v-if="randomNum > 0.5"> is larger than 0.5</span>
			<span v-else> is smaller than 0.5</span>
		</TempVar>
	</div>
</template>
```

## License

[MIT](./LICENSE)
