<template>
  <div class="bg-background">
    <div class="BackPack" container>
      <div class="row" style="width: 100%;">
        <div class="" style="width: 370px; padding: 50px 0 0 180px;">
          Products
        </div>
        <div class="col" style="width: 80%;">
          <ul v-for="item in products" :key="item.id">
            <li class="p-photo"><img style="width:150px" :src="item.imageUrl" @click="getMyproduct(item.id)"></li>
            <li class="p-name">{{ item.title }}</li>
            <li class="p-price">
              <del class="price-old">{{ item.origin_price }}</del> /
              <span class="price-new">${{ item.price }}</span>
            </li>
            <li>
              <button type="button" class="btn btn-more" @click="getMyproduct(item.id)"> 查看更多 </button>
              <button type="button" class="btn btn-outline-danger btn-cart" :disabled="this.status.add2cart === item.id"
                @click="addCart(item.id)">
                <div v-if="this.status.add2cart === item.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>加入購物車
              </button>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      products: [],
      backpack: [],
      accessary: [],
      tempProducts: {},
      isLoading: false,
      myproduct: {},
      status: {
        add2cart: '' // add card status
      }

    }
  },
  methods: {
    getproducts () {
      // console.log('CHECK STATUS : success')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}products?pag=:page`
      console.log('user product', api)
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.products)
            // if (res.data.products.category === '背包') {
            //   this.backpack = res.data.products
            //   console.log(this.backpack)
            // }
            this.products = res.data.products
          }
        })
    },
    getMyproduct (id) {
      this.$router.push(`/products/backpack/${id}`)
    },
    addCart (id) {
      // console.log(id)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      // this.status.add2cart = id
      console.log(this.status.add2cart)
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.add2cart = ''
          console.log(res)
        })
    },
    getCart () {
      const cart = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      this.$http.get(cart)
        .then((res) => {
          console.log(res)
          console.log(res.data.data.carts.length)
        })
    }

  },
  created () {
    this.getproducts()
    this.getCart()
  }
}

</script>
<style>
.BackPack ul {
  float: left;
  list-style-type: none;
  width: 154px;
  height: 300px;
  background-color: gainsboro;
  margin: 10px;
  text-align: center;
  padding: 0;
  border: 1px solid burlywood;
}

.p-name {
  background-color: burlywood;
  height: 70px;
  line-height: 20px;
  padding: 10px 5px;
}

.p-price {
  padding: 5px 0 0 0;
}

.price-old {
  text-decoration: line-through;
}

.price-new {
  font-weight: bold;
  color: chocolate;
}

.BackPack li {
  width: 150px;
  margin: 0 auto;
}

.bg-background {
  background: no-repeat left/80% url("../images/backpack_bg.png");
  background-size: auto;
  background-position: -150px 0;
}</style>
