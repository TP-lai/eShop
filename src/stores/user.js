import { defineStore } from 'pinia'

// export 兩各參數, 1) store 名稱, 2.屬性參數
// 屬性參數帶的物件有3各. state, getters, actions, 前兩個是箭頭函式, 後一個是傳統函式
export default defineStore('userStore', {
  state: () => {
    return {
      name: 'Johnny',
      wallet: 300

    }
  }, // 如同Data

  getters: {
    getUserName: (state) => `我的名字叫做 ${state.name}`
  }, // 如同 Computed

  // 類似Methods, 因可以使用this, 所以可以用傳統函式
  actions: {
    updateName () {
      this.name = '歐巴'
    }
  }
})
