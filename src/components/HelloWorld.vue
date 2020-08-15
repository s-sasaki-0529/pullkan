<template>
  <div>
    {{ pull_requests }}
  </div>
</template>

<script>
import pull_requests from "../lib/pull_requests"

export default {
  setup() {
    return {
      pull_requests
    }
  }
}
</script>