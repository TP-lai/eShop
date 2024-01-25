import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const loadingStatus = statusStore() // 不用 reactive, 直接取出
export default defineStore('cartStore', {
  state: () => {
    return {
      products: [] // 這邊加了之後就不用加到元件的return中
    }
  },

  actions: {

  }

})
