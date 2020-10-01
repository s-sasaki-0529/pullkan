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
            <div class="select-repository select is-multiple">
              <select multiple size="5">
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
import { PropType, defineComponent, reactive } from 'vue'
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
      ignoreWipPRs: setting.state.ignoreWipPRs
    } as Setting)

    const save = () => {
      setting.save(state)
      store.reload(state)
      props.onClose()
    }
    return { store, state, props, save }
  }
})
</script>

<style lang="scss" scoped>
.select-repository {
  width: 100%;
  select {
    width: 100%;
  }
}
</style>
