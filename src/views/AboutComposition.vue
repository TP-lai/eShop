<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ user.name }}, {{ user.getUserName }}, {{ user.wallet }}
    <br>
    {{ name }}, {{ getUserName }}, {{ wallet }}
    <button type="button" @click.prevent="updateName">一秒變歐巴</button>
    <button type="button" @click.prevent="updateData">一秒變歐巴桑</button>
    <button type="button" @click.prevent="reset">回到變身前</button>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'pinia'

import { storeToRefs } from 'pinia'
import userStore from '@/stores/user'

export default {
//   computed: {
//     // mapState 帶入兩個參數 1. store name, 2.state 或 getters的值
//     ...mapState(userStore, ['name', 'getUserName', 'wallet'])
//   },
//   methods: {
//     ...mapActions(userStore, ['updateName'])
//   }

  setup () {
    const user = userStore()
    // 1. reactive 改參數 user.name = '歐巴桑一世'

    // 2. ref 改參數方法
    const { name, wallet, getUserName } = storeToRefs(user)
    name.value = '歐巴變身前'
    const { updateName } = user

    // 3. action 改參數
    function updateData () {
      user.$patch({
        name: '歐巴桑二世',
        wallet: 1000
      })
    }

    function reset () {
      user.$reset()
    }
    return {
      user,
      name,
      wallet,
      getUserName,
      updateName,
      updateData,
      reset
    }
  }

}

</script>
