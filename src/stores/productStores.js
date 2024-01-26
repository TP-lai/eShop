import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore() // 不用reactive 可使用宣告直接取出
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
      status.isLoading = true
      axios.get(api) // this.$http.get(api) 要改為axios.get...
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.products)
            // if (res.data.products.category === '背包') {
            //   this.backpack = res.data.products
            //   console.log(this.backpack)
            // }
            this.products = res.data.products
            status.isLoading = false
          }
        })
    },

    getMyproduct (id) {
      this.$router.push(`/products/backpack/${id}`)
    },

    getCart () {
      const cart = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      axios.get(cart)
        .then((res) => {
          console.log(res)
          console.log(res.data.data.carts.length)
        })
    },

    addCart (id) {
      // console.log(id)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      // this.add2status.add2cart = id
      // console.log(this.add2status.add2cart)
      const cart = {
        product_id: id,
        qty: 1
      }
      axios.post(url, { data: cart })
        .then((res) => {
          this.add2status.add2cart = ''
          console.log(res)
        })
    }

  }
})
