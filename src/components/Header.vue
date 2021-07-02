<template>
  <header class="header" v-if="currentUser.name">
    <div class="current-user">
      <img class="icon" :src="currentUser.avatarUrl" />
      <a :href="`https://github.com/${currentUser.name}`" class="name">{{ currentUser.name }}</a>
    </div>
    <div class="controls">
      <div class="filter-buttons">
        <button
          class="button is-light"
          :class="{ 'is-primary': setting.state.showDraft }"
          @click="toggleShowDraft"
          v-text="'Draft'"
        />
        <button
          class="button is-light"
          :class="{ 'is-danger': setting.state.showWIP }"
          @click="toggleShowWIP"
          v-text="'WIP'"
        />
      </div>
      <div class="space" />
      <div class="setting-buttons">
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
    </div>
  </header>

  <SettingModal v-if="isShowSettingModal" :onClose="() => (isShowSettingModal = false)" />
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
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

    const currentUser = computed(() => store.state.currentUser)

    const reload = () => store.reload(setting.state)
    const showConfigModal = () => (isShowSettingModal.value = true)
    const toggleShowDraft = () => {
      setting.state.showDraft = !setting.state.showDraft
      setting.save()
    }
    const toggleShowWIP = () => {
      setting.state.showWIP = !setting.state.showWIP
      setting.save()
    }

    // リポジトリ設定が一つもない場合は自動で設定モーダルを開いて誘導する
    onMounted(() => {
      if (setting.state.repositories.length === 0) {
        showConfigModal()
      }
    })

    return {
      store,
      setting,
      currentUser,
      isShowSettingModal,
      showConfigModal,
      toggleShowDraft,
      toggleShowWIP,
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
    display: flex;

    .filter-buttons {
    }

    .space {
      padding-left: 5px;
      padding-right: 5px;
    }

    .setting-buttons {
    }
  }
}
</style>
