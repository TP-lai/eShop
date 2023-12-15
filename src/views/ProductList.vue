<template>
  <PageLoading :active="isLoading" />
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4" style="width: 80%; margin: auto;">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th>產品圖片</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td><img class="" style="width: 150px" :src="item.imageUrl" alt="" /></td>
        <td class="text-right">
          {{ $$filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $$filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <PagInation :pages="pagination" @emit-pages="getProducts"/>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"/>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"/>
</template>
<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import PagInation from '@/components/PagInation.vue'

export default {

  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    PagInation
  },
  inject: ['emitter'], // 外層Dashboard 設定emiter provide, 此處引用
  methods: {
    getProducts (page) {
      console.log('success')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/products/?page=${page}`
      console.log('my_api path: ' + api)
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            // console.log(res.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openModal (isNew, item) { // 如果不是新的 就把該產品資料帶出來
      // console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item } // 將資料帶出來
      }
      // this.isNew = isNew // 是新資料還是修改資料(點新增還是編輯), Modal視窗共用新增和編輯產品
      const productComponent = this.$refs.productModal
      // // $refs.productModal.showModal() 原本是設定為按鈕
      productComponent.showModal()
    },
    updateProduct (item) {
      // console.table(item)
      // console.dir(item)
      this.tempProduct = item
      // 未進行編輯資料時, api是用post, 且api的網址不接產品id
      // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/product`
      let httpMethod = 'post'

      if (!this.isNew) { // 如果是編輯狀態, 取用新的api以及將取用方法改為put
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      // this.$http.post(api, { data: this.tempProduct }).then((response) => {
      // 取用方法參數用 [] 且前面不加點
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        // this.$http 是function, 所以可以使用this.$http.get()或是this.$http['get']等用法
        // Axios 是一個用於發送 HTTP 請求的 JavaScript 庫
        // console.log(response)
        productComponent.hideModal() // 關閉編輯視窗
        // this.getProducts() // 重新讀取產品列表

        // 以下增加toast回饋編輯成功訊息
        if (response.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          })
        }
      })
    },

    // 開啟刪除 Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((response) => {
        console.log(response.data)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getProducts()
      })
    }
  },

  created () {
    this.getProducts()
  }
}
</script>
