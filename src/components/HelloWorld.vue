<template>
  <div class="pr-card-wrapper" :key="pr.id" v-for="pr in pull_requests">
    <PRCard :pr="pr" />
  </div>
</template>

<script>
import { pullRequests } from "../lib/pullRequests"
import PRCard from './PRCard'

export default {
  components: {
    PRCard
  },
  computed: {
    pull_requests () {
      return pullRequests
    }
  }
}
</script>