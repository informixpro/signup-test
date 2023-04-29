import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import {plugin, defaultConfig} from '@formkit/vue'
import config from './formkit.config'
import '@formkit/themes/genesis'

const app = createApp(App)

app
	.use(router)
	.use(plugin, defaultConfig(config))
	.mount('#app')
