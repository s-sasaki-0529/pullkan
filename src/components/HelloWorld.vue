<template>
  <div>
    {{ state.msg }}
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      msg: 'Hello, Vue3!!'
    })

    return {
      state
    }
  }
}
</script>