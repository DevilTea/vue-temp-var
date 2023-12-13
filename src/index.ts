import type { Plugin } from 'vue'
import _TempVar from './TempVar.vue'

const TempVar = _TempVar as typeof _TempVar & Plugin
TempVar.install = (app) => {
	app.component('TempVar', _TempVar as any)
	app.component('TempVar', _TempVar as any)
}

export default TempVar
