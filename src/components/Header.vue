<template>
  <header class="header">
    <template v-if="currentUser.name">
      <img class="current-user-icon" :src="currentUser.avatarUrl" />
      <a :href="`https://github.com/${currentUser.name}`" class="current-user-name">{{ currentUser.name }}</a>
    </template>
    <span class="icon" :class="{ loading: store.state.onLoading }" @click="reload">
      <i class="fas fa-sync"></i>
    </span>
    <span class="icon" @click="showConfigModal">
      <i class="fas fa-cog"></i>
    </span>
  </header>

  <SettingModal v-if="isShowSettingModal" :onClose="() => (isShowSettingModal = false)" />
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
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
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
  height: 50px;
  .current-user-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .current-user-name {
    font-size: 1.5em;
  }
  .icon {
    margin-left: 5px;
    cursor: pointer;

    &.loading {
      animation: spin 1s linear infinite;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
