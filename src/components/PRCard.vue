<template>
  <div class="pr">
    <a :href="pr.url" target="_blank">
      <h3>
        <img width="32" :src="pr.author.avatarUrl" />
        {{ pr.title }}
      </h3>
    </a>
  </div>
</template>

<script>
import { PR } from "../lib/pull_requests.ts";
export default {
  props: {
    pr: {
      type: PR,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pr {
  border: 1px solid;
}
</style>