<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">eShop 文創</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li> -->
                    <li class="nav-item">
                      <router-link to="/dashboard/products" class="nav-link fw-bolder">品牌/手工包</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="" class="nav-link fw-bolder">飾品</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="" class="nav-link fw-bolder">布料批發</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bolder" href="#" @click.prevent="logout">登出</a>
                    </li>
                </ul>
                <p class="navbar-text fw-bolder" style="padding: 0; margin: 0 20px;">
                  <span><router-link to="/products/cart" >購物車</router-link>內有 </span>
                  <span class="text-danger fw-bolder fs-3"> {{ cartNum }}</span> 項商品
                </p>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      cartNum: 0
    }
  },

  methods: {
    getCart () {
      const cart = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}cart`
      this.$http.get(cart)
        .then((res) => {
        // console.log(res)
        // console.log(res.data.data.carts.length)
          this.cartNum = res.data.data.carts.length
        })
    }
  },

  created () {
    this.getCart()
    // console.log(this.cartNum)
  }

}

</script>
<style>
.navbar { background-color: burlywood !important;}</style>
