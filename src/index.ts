import type { Plugin } from 'vue'
import _TempVar from './TempVar.vue'

// @ts-expect-error
const TempVar: typeof _TempVar & Plugin = _TempVar
TempVar.install = (app) => {
  // @ts-expect-error
  app.component('temp-var', _TempVar)
  // @ts-expect-error
  app.component('TempVar', _TempVar)
}

export default TempVar
