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
