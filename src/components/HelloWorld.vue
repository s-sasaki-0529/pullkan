<template>
  <div class="pr-card-wrapper" :key="pr.id" v-for="pr in pullRequests">
    <PRCard :pr="pr" />
  </div>
</template>

<script>
import { dispatch } from "../lib/dispatcher"
import PRCard from './PRCard'

export default {
  components: {
    PRCard
  },
  async setup() {
    const { currentUser, pullRequests } = await dispatch()
    return {
      currentUser, pullRequests
    }
  }
}
</script>