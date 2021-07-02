<template>
  <header class="header">
    <div class="current-user">
      <template v-if="currentUser.name">
        <img class="icon" :src="currentUser.avatarUrl" />
        <a :href="`https://github.com/${currentUser.name}`" class="name">{{ currentUser.name }}</a>
      </template>
    </div>
    <div class="controls">
      <button class="button" :class="{ 'is-loading': store.state.onLoading }" @click="reload">
        <span class="icon">
          <i class="fas fa-sync"></i>
        </span>
      </button>
      <button class="button" @click="showConfigModal">
        <span class="icon">
          <i class="fas fa-cog"></i>
        </span>
      </button>
    </div>
  </header>

  <SettingModal v-if="isShowSettingModal" :onClose="() => (isShowSettingModal = false)" />
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch } from 'vue'
import { useStore } from '@/composition/store'
import { useSetting } from '@/composition/setting'
import SettingModal from '@/components/SettingModal.vue'

export default defineComponent({
  components: {
    SettingModal
  },
  setup() {
    const store = useStore()
    const setting = useSetting()
    const isShowSettingModal = ref(false)

    const reload = () => store.reload(setting.state)
    const showConfigModal = () => (isShowSettingModal.value = true)
    const currentUser = computed(() => store.state.currentUser)

    // リポジトリ設定が一つもない場合は自動で設定モーダルを開いて誘導する
    watch(
      () => store.state.currentUser,
      v => {
        if (v && setting.state.repositories.length === 0) {
          showConfigModal()
        }
      }
    )

    return {
      store,
      currentUser,
      isShowSettingModal,
      showConfigModal,
      reload
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px 30px 20px;
  height: 50px;

  .current-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      font-size: 1.5em;
    }
  }
  .controls {
    .icon {
      margin-left: 5px;
      cursor: pointer;

      &.loading {
        animation: spin 1s linear infinite;
      }
    }
  }
}
</style>
