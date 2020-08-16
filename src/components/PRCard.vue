<template>
  <div class="pr">
    <a :href="url" target="_blank">
      <h3>
        <img width="32" :src="avatarUrl" />
        {{ title }}
      </h3>
    </a>
    <p>{{ lastCommitDate }}</p>
    <p>
      {{ reviews.map(r => r.createdAt) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { PR } from "../lib/pr";
import { User } from "../lib/user";

type Props = {
  pr: PR,
  currentUser: User // TODO グローバルにする
}

export default defineComponent({
  props: {
    pr: {
      type: PR,
      required: true
    },
    currentUser: {
      type: User,
      required: true
    }
  },
  setup(props) {
    return {
      url: props.pr.url,
      title: props.pr.title,
      lastCommitDate: props.pr.lastCommitDate,
      avatarUrl: props.pr.author.avatarUrl,
      reviews: props.pr.reviewList.reviews
    }
  }
})
</script>

<style lang="scss" scoped>
.pr {
  border: 1px solid;
}
</style>