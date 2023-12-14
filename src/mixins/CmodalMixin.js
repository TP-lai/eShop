import Modal from 'bootstrap/js/dist/modal'

export default {
  methods: {
    showCmodal () {
      this.Cmodal.show()
    },
    hideCmodal () {
      this.Cmodal.hide()
    }
  },
  mounted () {
    this.Cmodal = new Modal(this.$refs.Cmodal)
  }
}
