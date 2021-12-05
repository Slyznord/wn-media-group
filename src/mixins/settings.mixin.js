export default {
  mounted () {
    document.addEventListener('click', this.toggleSettings)
  },
  unmounted () {
    document.removeEventListener('click', this.toggleSettings)
  },
  methods: {
    toggleSettings (event) {
      const settingsIcon = this.$refs.settings
      const currentElement = event.target

      if (currentElement.closest('svg') !== settingsIcon) {
        this.isModalOpen = false
      } else if (currentElement.closest('svg') === settingsIcon) {
        this.isModalOpen = !this.isModalOpen
      }
    }
  }
}
