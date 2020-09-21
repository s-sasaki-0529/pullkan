<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button class="delete" aria-label="close" @click="props.onClose" />
      </header>
      <section class="modal-card-body">
        <form>
          <label class="label">Repositories</label>
          <div class="select-repository select is-multiple">
            <select multiple size="8">
              <option
                v-for="repository in store.state.currentUser?.repositories"
                :key="repository.id"
                :value="repository"
              >
                {{ repository.fullName }}
              </option>
            </select>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">Save</button>
        <button class="button" @click="props.onClose">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { useStore } from '@/composition/store'

export default defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const save = () => {
      alert('セーブしました(嘘)')
      props.onClose()
    }
    return { store, props, save }
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
