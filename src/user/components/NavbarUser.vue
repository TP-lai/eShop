<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar w/ text</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard/products">Products</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard/order">Order</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard/coupon">Coupon</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logout">登出</a>
                    </li>
                </ul>
                <p class="navbar-text" style="padding: 0; margin: 0;">
                    購物車[ <span class="text-danger" style="font-size: 20px; font-weight: bold;">{{ cartNum }}</span> ]樣商品 |
                    <span style="font-weight: bold; text-decoration: underline;">前往結帳</span>
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
