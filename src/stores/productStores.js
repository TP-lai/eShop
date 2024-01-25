import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const loadingStatus = statusStore() // 不用 reactive, 直接取出
export default defineStore('productStore', {
  state: () => {
    return {
      products: [] // 這邊加了之後就不用加到元件的return中
    }
  },
  getters: { // 比較價格高低來進行排序
    sortProducts: (state) => {
      state.products.sort((a, b) => a.price - b.price)
    }

  },
  actions: {
    getproducts () {
      // console.log('CHECK STATUS : success')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}products?pag=:page`
      //   console.log('user product', api)
      loadingStatus.isLoading = true
      axios.get(api) // this.$http.get(api) 要改為axios.get...
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.products)
            // if (res.data.products.category === '背包') {
            //   this.backpack = res.data.products
            //   console.log(this.backpack)
            // }
            this.products = res.data.products
            loadingStatus.isLoading = false
          }
        })
    }
  }

})
