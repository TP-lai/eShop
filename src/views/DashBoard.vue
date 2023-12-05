<template>
    <Navbar></Navbar>
    <div class="container-fluid">
    <router-view />
   </div>
</template>

<script>
import Navbar from '../components/NavBar.vue'
export default {
  components: { Navbar },

  created () {
    // 取出cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)

    // 將token 寫入axios標題
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    // console.log(api)
    this.$http.post(api, this.user)
      .then((res) => {
        // 將登入資料記錄至 cookie
        // const { token, expired } = res.data // 將token以及expired值取出
        // console.log(token, expired)
        // document.cookie 是設定儲存cookie的語法
        // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        // console.log(res) // 確認登錄成功, 以及驗證token, expired
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  }
}
</script>
