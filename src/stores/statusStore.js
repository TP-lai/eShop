import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => {
    return {
      isLoading: false // 讀取效果
    }
  }

})
