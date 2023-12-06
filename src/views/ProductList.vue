<template>
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
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
        <td class="text-right">
          {{ item.origin_price }}
        </td>
        <td class="text-right">
          {{ item.price }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
export default {

  data () {
    return {
      products: [
        // {
        //   category: '測試分類',
        //   content: '測試的說明',
        //   description: '測試的描述',
        //   id: '-Nksndf6xSKZkn-_zbQf',
        //   imageUrl: 'https://sky-blue.91app.io/photo/201103/12121771/-01.jpg',
        //   imagesUrl: [
        //     'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5244140/0/638354692782270000?v=1',
        //     'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5244140/1/638354692782270000?v=1',
        //     'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5244140/2/638354692782270000?v=1',
        //     'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5244140/3/638354692782270000?v=1',
        //     'https://sky-blue.91app.io/photo/201103/12121771/-03.jpg'
        //   ],
        //   is_enabled: 1,
        //   origin_price: 1000,
        //   price: 500,
        //   title: '測試的產品',
        //   unit: '單位',
        //   num: 4
        // }
      ],
      pagination: {},
      tempProduct: {}
    }
  },
  components: {
    ProductModal
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/products`
      console.log(api)
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            console.log(res.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openModal () {
      this.tempProduct = {}
      const productComponent = this.$refs.productModal
      // $refs.productModal.showModal() 原本是設定為按鈕
      productComponent.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      const productComponent = this.$refs.productModal
      this.$http.post(api, { data: this.tempProduct }).then((response) => {
        console.log(response)
        productComponent.hideModal()
        this.getProducts()
      })
    }
  },

  created () {
    this.getProducts()
  }
}
</script>
