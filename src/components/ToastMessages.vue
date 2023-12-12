<template>
    <!-- Position it: -->
  <!-- - `.toast-container` for spacing between toasts -->
  <!-- - `.position-absolute`, `top-0` & `end-0` to position the toasts in the upper right corner -->
  <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->
  <div class="toast-container position-absolute top-0 end-0 p-3">
    <ToastGet v-for="(msg, key) in messages" :key="key" :msg="msg"></ToastGet>

  </div>
</template>

<script>
import ToastGet from '@/components/ToastGet.vue'

export default {
  components: { ToastGet }, // ?為什麼需要加 {}
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],

  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}

</script>
