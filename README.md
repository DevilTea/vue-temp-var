# vue-temp-var

A Vue component for defining temporary variables in the template with type inference.

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
function getRandomNumber() {
  return Math.random()
}
</script>

<template>
  <div v-for="i in 10" :key="`random-${i}`">
    <TempVar :define="{ randomNum: getRandomNumber() }">
      <template #defined="{ randomNum }">
        <span>"{{ randomNum }}"</span>
        <span v-if="randomNum > 0.5"> is larger than 0.5</span>
        <span v-else> is smaller than 0.5</span>
      </template>
    </TempVar>
  </div>
</template>
```

## License

[MIT](./LICENSE)