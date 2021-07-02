<template>
  <div class="pullkan" v-if="store.state.currentUser.name">
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
  <div class="on-auth" v-else-if="state.authState === 'doing'">
    ...authenticating
  </div>
  <div class="on-loading" v-else>
    ...loading
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { tryAuth, signInWithGitHub } from '@/lib/authentication'
import { useStore } from '@/composition/store'
import { useSetting } from '@/composition/setting'
import Header from './Header.vue'
import Board from './Board.vue'

export default defineComponent({
  components: {
    Header,
    Board
  },

  setup() {
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

    return { state, store, signIn }
  }
})
</script>

<style lang="scss">
@import '../../node_modules/bulma/bulma.sass';

.pullkan {
  height: 100vh;
  .g-full-height {
    height: 100%;
  }
}

.button {
  // bluma が設定しているボタンのデフォルトスタイルを上書きするためのimportant
  outline: none !important;
  box-shadow: none !important;
  border-color: gray !important;
}
</style>
