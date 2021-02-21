<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button class="delete" aria-label="close" @click="props.onClose" />
      </header>
      <section class="modal-card-body">
        <div class="columns hide-wip-setting">
          <div class="column is-3">
            <label class="label">Ignore WIP PRs</label>
          </div>
          <div class="column">
            <div class="control">
              <label class="radio">
                <input type="radio" v-model="state.ignoreWipPRs" :value="true" /> Yes
              </label>
              <label class="radio">
                <input type="radio" v-model="state.ignoreWipPRs" :value="false" /> No
              </label>
            </div>
          </div>
        </div>
        <div class="columns repositories-setting">
          <div class="column is-3">
            <label class="label">Repositories</label>
          </div>
          <div class="column">
            <p class="repository-selection-message">{{ repositorySelectionMessage }}</p>
            <div class="select-repository select is-multiple">
              <select v-model="state.repositories" multiple size="5">
                <option
                  v-for="repository in store.state.currentUser?.repositories"
                  :key="repository.id"
                  :value="repository"
                >
                  {{ repository.fullName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">Save</button>
        <button class="button" @click="props.onClose">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive, computed } from 'vue'
import { useStore } from '@/composition/store'
import { Setting, useSetting } from '@/composition/setting'

export default defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const setting = useSetting()
    const state = reactive({
      ignoreWipPRs: setting.state.ignoreWipPRs,
      repositories: setting.state.repositories
    } as Setting)

    const save = () => {
      setting.save(state)
      store.reload(state)
      props.onClose()
    }

    const repositorySelectionMessage = computed(() => {
      switch (state.repositories.length) {
        case 0:
          return 'No repository is selected.'
        case 1:
          return '1 repository selected'
        default:
          return `${state.repositories.length} repositories is selected.`
      }
    })
    return { store, state, props, save, repositorySelectionMessage }
  }
})
</script>

<style lang="scss" scoped>
.repository-selection-message {
  margin-bottom: 10px;
}
.select-repository {
  width: 100%;
  select {
    width: 100%;
  }
}
</style>
