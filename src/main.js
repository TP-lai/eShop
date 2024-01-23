import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
// 需加上 * as ....
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// import Pina
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { currency, date } from './methods/filters'
// createApp(App).use(router).mount('#app')

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

// Pinia
const pinia = createPinia()
const app = createApp(App)
// currency- vue3之全局變量; $$filters是自訂義方法
app.config.globalProperties.$$filters = {
  currency, date
}
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)
app.component('PageLoading', Loading) // 全域宣告

// 啟用vee-validate
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
