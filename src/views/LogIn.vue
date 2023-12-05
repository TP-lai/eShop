<template>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="signin">
            <div class="col-md-6">
                <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required
                        autofocus v-model="user.username" />
                </div>
                <div class="mb-2">
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password" />
                </div>

                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      // console.log('login')
      // api 路徑串接, 有兩段,第一段是環境變數站點位置 第二段是實際的api
      const api = `${process.env.VUE_APP_API}admin/signin`
      // console.log(api)
      this.$http.post(api, this.user)
        .then((res) => { // 成功之後就轉到dashboard
          if (res.data.success) {
          // 將登入資料記錄至 cookie
            const { token, expired } = res.data // 將token以及expired值取出
            // console.log(token, expired)
            // document.cookie 是設定儲存cookie的語法
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            // console.log(res) // 確認登錄成功, 以及驗證token, expired
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
