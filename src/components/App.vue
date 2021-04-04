<template>
  <Pullkan />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideStore } from '@/composition/store'
import { provideSetting } from '@/composition/setting'
import Pullkan from './Pullkan.vue'

export default defineComponent({
  components: {
    Pullkan
  },
  setup() {
    provideStore()
    provideSetting()
    return {}
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
