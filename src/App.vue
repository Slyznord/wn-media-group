<template>
  <Main />
</template>

<script>
import Main from '@/views/Main'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Main
  },
  beforeMount () {
    this.getStore()
  },
  methods: {
    ...mapActions([
      'getStore'
    ])
  }
}
</script>

<style lang="scss">
  @import '@/scss/main.scss';
</style>
