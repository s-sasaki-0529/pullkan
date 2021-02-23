<template>
  <div class="app" v-if="state.authState === 'success'">
    <Header />
    <Board />
  </div>
  <div class="on-error" v-else-if="state.authState === 'error'">
    <button @click="signIn" class="button is-rounded">
      <span class="icon">
        <i class="fab fa-github"></i>
      </span>
      <span>Sign in with GitHub</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { tryAuth, signInWithGitHub } from '@/lib/authentication'
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

    const state = reactive<{ authState: 'success' | 'error' | 'doing' }>({ authState: 'doing' })
    const store = useStore()
    const setting = useSetting()

    watch(
      () => state.authState,
      newStatus => {
        if (newStatus === 'success') {
          setting.load()
          store.reload(setting.state)
        }
      }
    )

    tryAuth()
      .then(() => (state.authState = 'success'))
      .catch(() => (state.authState = 'error'))

    const signIn = () => {
      signInWithGitHub().then(() => {
        location.href = '/'
      })
    }

    return { state, signIn }
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
