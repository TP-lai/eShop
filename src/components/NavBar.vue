<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <h2 class="navbar-brand" href="#">eShop 管理系統</h2>
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
                        <router-link to="/dashboard/products" class="nav-link">產品資料</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/orders" class="nav-link">訂購單</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/coupon" class="nav-link">優惠券</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logout">登出</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Navbar text with an inline element
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      // console.log(api)
      this.$http.post(api, this.user)
        .then((res) => { // 成功之後就轉到dashboard
          if (res.data.success) {
            // console.log(res)
            this.$router.push('/login')
          }
        })
    }
  }
}

</script>
