<template>
  <div class="pr-card-wrapper" :key="pr.id" v-for="pr in pull_requests">
    <PRCard :pr="pr" />
  </div>
</template>

<script>
import { pull_requests } from "../lib/pull_requests"
import PRCard from './PRCard'

export default {
  components: {
    PRCard
  },
  computed: {
    pull_requests () {
      return pull_requests
    }
  }
}
</script>