<template>
  <PageLoading :active="isLoading" />
  <div class="container">
    <!-- 購物車 -->
    <div class="sticky-top">
      <h3 class="fw-bold" style="padding: 25px 0 0 0;">購物車清單</h3>
      <span style="display: flex; justify-content: flex-end; margin-bottom: 15px">
        <router-link to="../products/backpack">回商店繼續逛逛</router-link></span>
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
                <button type="button" class="btn btn-outline-secondary btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x-lg"></i>
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
                  <input type="number" class="form-control" min="1" :disabled="item.id === status.loadingItem"
                    @change="updateCart(item)" v-model.number="item.qty">
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-center">
                <span v-if="item.product.origin_price === item.product.price">{{ item.product.origin_price }} 元</span>
                <span v-else> <span class="text-danger">(特價)</span> {{ item.product.price }} 元<br>
                  <!-- <small class="text-danger" style="text-decoration: line-through;">原價： {{ item.product.origin_price }}</small> -->
                </span>
              </td>
              <td class="text-end">
                ${{ item.total }} 元 <br>
                <small v-if="cartList.final_total !== cartList.total" class="text-success">折扣價： {{ item.final_total
                }}</small>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr class="table-secondary">
            <td colspan="3">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control"
                  style=" border: 1px dashed #d97e00; border-right: none; background-color: #ffe5c6;"
                  v-model="coupon_code" placeholder="請輸入活動優惠碼 (查看您信箱內的活動優惠通知)">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                    套用優惠碼
                  </button>
                </div>
              </div>
            </td>
            <td colspan="2" class="text-end fw-bolder">
              <span class="text-success" v-if="cartList.final_total !== cartList.total">
                (已套用 {{ cartList.final_total / cartList.total * 10 }}折 限時活動優惠券)
              </span>總計金額
            </td>
            <td class="text-end fw-bolder">
              <span class="text-danger">$ {{ cartList.final_total }} 元</span>
              <br v-if="cartList.final_total !== cartList.total">
              <span v-if="cartList.final_total !== cartList.total">折扣前 ( ${{ cartList.total }} 元)</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <div>
        <h3 class="fw-bold" style="padding: 25px 0 0 0;">填寫訂購單</h3>
        <div class="my-5 row justify-content-center">
          <Form class="col-md-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email" rules="email|required" v-model="form.email">qweqe</Field>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field id="name" name="姓名" type="text" class="form-control" placeholder="請輸入姓名" rules="required"></Field>
              <!-- <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage> -->
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <Field id="tel" name="電話" type="tel" class="form-control" placeholder="請輸入電話" rules="required"></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field id="address" name="地址" type="text" class="form-control" placeholder="請輸入地址" rules="required"></Field>
              <!-- <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage> -->
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea name="" id="message" class="form-control" cols="30" rows="10"></textarea>
            </div>
            <div class="text-end">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // products: [],
      // product: {},
      isLoading: false,
      status: {
        loadingItem: '' // 對應品項 id
      },
      cartList: {},
      coupon_code: '',
      getCoupon: false,

      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
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
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart/${id}`
      this.isLoading = true
      this.$http.delete(url)
        .then((res) => {
          this.status.loadingItem = ''
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
      this.$http.post(url, { data: coupon })
        .then((res) => {
          this.getCart()
          this.isLoading = false
          // this.getCoupon = true
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
