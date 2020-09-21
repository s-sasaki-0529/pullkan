<template>
  <div v-if="state.ready" class="app">
    <Header />
    <Board />
  </div>
  <div v-else>
    authenticating...
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { authByGitHub } from '@/lib/authentication'
import { provideStore, useStore } from '@/composition/store'
import Header from './Header.vue'
import Board from './Board.vue'

export default defineComponent({
  components: {
    Header,
    Board
  },

  setup() {
    const state = reactive({ ready: false })

    provideStore()
    const store = useStore()

    authByGitHub().then(token => {
      sessionStorage.setItem('token', token)
      state.ready = true
      store.reload()
    })

    return { state }
  }
})
</script>

<style lang="scss">
@import '../../node_modules/bulma/bulma.sass';

.app {
  height: 100vh;
  .g-full-height {
    height: 100%;
  }
}
</style>
