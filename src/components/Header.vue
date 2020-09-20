<template>
  <header class="header">
    <h1 class="repository">
      <a href="https://github.com/StudistCorporation" target="_blank">
        StudistCorporation
      </a>
      /
      <a
        href="https://github.com/StudistCorporation/teachme_web_duvel"
        target="_blank"
      >
        teachme_web_duvel
      </a>
    </h1>
    <span
      class="icon"
      :class="{ loading: store.state.onLoading }"
      @click="store.update"
    >
      <i class="fas fa-sync"></i>
    </span>
    <span class="icon" @click="showConfigModal">
      <i class="fas fa-cog"></i>
    </span>
  </header>

  <SettingModal
    v-if="isShowSettingModal"
    :onClose="() => (isShowSettingModal = false)"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useStore } from "@/composition/store";
import SettingModal from "@/components/SettingModal.vue";

export default defineComponent({
  components: {
    SettingModal,
  },
  setup() {
    const store = useStore();
    const isShowSettingModal = ref(false);

    const showConfigModal = () => (isShowSettingModal.value = true);

    return {
      store,
      isShowSettingModal,
      showConfigModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin: 15px;
  height: 50px;
  .repository {
    font-size: 1.75em;
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
