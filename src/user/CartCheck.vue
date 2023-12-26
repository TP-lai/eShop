<template>
  <div class="container">

    <!-- 購物車列表 -->

    <div class="sticky-top">
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>品名</th>
            <th class="text-center" style="width: 110px">數量</th>
            <th class="text-center">單價</th>
            <th class="text-end">細項金額</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartList.carts">
            <tr v-for="item in cartList.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                <img style="width:55px" :src="item.product.imageUrl">
              </td>
              <td>
                {{ item.product.title }}
                <!-- <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control" min="1"
                  :disabled="item.id === status.loadingItem"
                  @change="updateCart(item)" v-model.number="item.qty">
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-center">
                <span v-if="item.product.origin_price ===  item.product.price ">{{ item.product.origin_price }}</span>
                <span v-else>
                  (限時特價) {{ item.product.price }} 元<br>
                  <!-- <small class="text-danger" style="text-decoration: line-through;">原價： {{ item.product.origin_price }}</small> -->
                </span>
              </td>
              <td class="text-end">
                ${{ item.total }} 元 <br>
                <small v-if="cartList.final_total !== cartList.total" class="text-danger">折扣價： {{ item.final_total
                }}</small>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr class="table-secondary">
            <td colspan="3">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                    套用優惠碼
                  </button>
                </div>
              </div>
            </td>
            <td colspan="2" class="text-end fw-bolder">總計金額 </td>
            <td class="text-end fw-bolder">$ {{ cartList.final_total }} 元</td>
          </tr>
          <tr v-if="cartList.final_total !== cartList.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success"></td>
          </tr>
        </tfoot>
      </table>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // products: [],
      // product: {},
      status: {
        loadingItem: '' // 對應品項 id
      },
      cartList: {},
      coupon_code: ''
    }
  },
  methods: {
    // getProducts () {
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}products/all`
    //   // this.isLoading = true
    //   this.$http.get(url).then((response) => {
    //     this.products = response.data.products
    //     console.log('products:', response)
    //     // this.isLoading = false
    //   })
    // },
    // getProduct (id) {
    //   this.$router.push(`/user/product/${id}`)
    // },
    // addCart (id) {
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
    //   this.status.loadingItem = id
    //   const cart = {
    //     product_id: id,
    //     qty: 1
    //   }
    //   this.$http.post(url, { data: cart })
    //     .then((res) => {
    //       this.status.loadingItem = ''
    //       console.log(res)
    //     })
    // },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart/${item.id}`
      // console.log(url)
      this.status.loadingItem = item.id
      // 將更新的購物車資訊儲存到物件
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
        final_total: item.final_total
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
      // eslint-disable-next-line no-undef
      // console.log('updateCart', response)
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      // this.isLoading = true
      this.$http.get(url).then((Response) => {
        // console.log(res)
        console.log('getCart', Response)
        this.cartList = Response.data.data
        // this.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style>
tbody tr:hover td {
  background-color: bisque;
}
</style>
