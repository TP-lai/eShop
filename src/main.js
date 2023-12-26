import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import router from './router'
import { currency, date } from './methods/filters'
// createApp(App).use(router).mount('#app')
const app = createApp(App)
// currency- vue3之全局變量; $$filyrts是自訂義方法
app.config.globalProperties.$$filters = {
  currency, date
}
app.use(VueAxios, axios)
app.use(router)
app.component('PageLoading', Loading) // 全域宣告
app.mount('#app')
