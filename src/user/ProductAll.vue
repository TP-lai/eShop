<template>
  <Navbar></Navbar>
    <div>
      <router-view />
    </div>
</template>

<script>
import Navbar from '../user/components/NavbarUser.vue'

export default {
  components: {
    Navbar
  }

}
</script>

<style></style>
