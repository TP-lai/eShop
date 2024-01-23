<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ name }}, {{ getUserName }}, {{ wallet }}
    <button type="button" @click.prevent="updateName">變歐巴</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'

export default {
  computed: {
    // mapState 帶入兩個參數 1. store name, 2.state 或 getters的值
    ...mapState(userStore, ['name', 'getUserName', 'wallet'])
  },
  methods: {
    ...mapActions(userStore, ['updateName'])
  }

}

</script>
