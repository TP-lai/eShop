import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from './statusStore'

const status = statusStore()

export default defineStore('cartStore', {
  state: () => {
    return {
      cartList: {}
    }
  },

  actions: {
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart/${item.id}`
      // console.log(url)
      status.cartLoadingItem = item.id
      // 將更新的購物車資訊儲存到物件
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
        final_total: item.final_total
      }
      axios.put(url, { data: cart }).then((res) => {
        console.log(res)
        status.cartLoadingItem = ''
        this.getCart()
      })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      // this.isLoading = true
      axios.get(url).then((Response) => {
        // console.log(res)
        // console.log('getCart', Response)
        this.cartList = Response.data.data
        // this.isLoading = false
      })
    },
    removeCartItem (id) {
      status.cartLoadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart/${id}`
      this.isLoading = true
      axios.delete(url)
        .then(() => {
          status.cartLoadingItem = ''
          this.getCart()
          this.isLoading = false
        })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      axios.post(url, { data: coupon })
        .then(() => {
          this.getCart()
          this.isLoading = false
          // this.getCoupon = true
        })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}order`
      const order = this.form
      // console.log(order)
      axios.post(url, { data: order })
        .then((res) => {
          console.log(res)
          if (res.data.success) { // move to thanks page
            this.$router.push('/confirm')
          }
        })
    }
  }

})
