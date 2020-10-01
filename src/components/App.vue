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
import { authenticate } from '@/lib/authentication'
import { provideStore, useStore } from '@/composition/store'
import { provideSetting, useSetting } from '@/composition/setting'
import Header from './Header.vue'
import Board from './Board.vue'

export default defineComponent({
  components: {
    Header,
    Board
  },

  setup() {
    provideStore()
    provideSetting()

    const state = reactive({ ready: false })
    const store = useStore()
    const setting = useSetting()

    authenticate().then(() => {
      state.ready = true
      setting.load()
      store.reload(setting.state)
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
