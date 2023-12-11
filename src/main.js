import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.component('PageLoading', Loading) // 全域宣告
app.mount('#app')
