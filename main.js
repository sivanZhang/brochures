import * as Pinia from 'pinia';
import App from './App.vue'
import * as filters from '@/utils/common'
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	const pinia = Pinia.createPinia()
	// 注入全局属性，可以在组件中用inject访问
	app.provide('globalData', 2) // inject('globalData')
	app.use(pinia)
	return {
		app,
		Pinia
	}
}