<template>
  <div class="pr-card-wrapper" :key="pr.id" v-for="pr in pullRequests">
    <PRCard :pr="pr" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dispatch } from "../lib/dispatcher"
import PRCard from './PRCard.vue'

export default defineComponent({
  components: {
    PRCard
  },
  async setup() {
    const store = await dispatch()
    console.log(store)
    return {
      currentUser: store.currentUser,
      pullRequests: store.pullRequests
    }
  }
})
</script>