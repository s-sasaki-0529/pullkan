<template>
  <div class="pr">
    <a :href="url" target="_blank">
      <h3>
        <img width="32" :src="avatarUrl" />
        {{ title }}
      </h3>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { PR } from "../lib/pr";

type Props = {
  pr: PR
}

export default defineComponent({
  props: {
    pr: {
      type: PR,
      required: true
    }
  },
  setup(props) {
    const url = computed(() => props.pr.url)
    const title = computed(() => props.pr.title)
    const avatarUrl = computed(() => props.pr.author.avatarUrl)

    return {
      url,
      title,
      avatarUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.pr {
  border: 1px solid;
}
</style>