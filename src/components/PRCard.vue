<template>
  <div class="card">
    <header class="card-header">
      <div class="media">
        <div class="media-left">
          <figure class="image is-32x32">
            <img class="is-rounded" :src="pr.author.avatarUrl" />
          </figure>
        </div>
        <div class="media-content">
          <div class="title is-6">
            <div>{{ pr.author.name }}</div>
            <a class="repository-link" :href="repository.url">{{ repository.name }}</a>
          </div>
        </div>
      </div>
    </header>
    <div class="card-content">
      <a :href="pr.url" target="_blanl" rel="noreferrer" class="content">
        <div class="title is-6">
          <span>{{ pr.title }}</span>
        </div>
        <div v-if="approvers.size" class="approvers">
          <span class="check">approved by </span>
          <img
            class="user-icon"
            width="16"
            height="16"
            :src="approver.avatarUrl"
            :key="approver.id"
            v-for="approver in approvers"
          />
        </div>
        <div v-if="pr.labels" class="tags">
          <span
            :key="label.name"
            class="tag"
            :style="{ backgroundColor: `#${label.color}` }"
            v-for="label in pr.labels"
          >
            {{ label.name }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { PR } from '../models/pr'

export default defineComponent({
  props: {
    pr: {
      type: Object as PropType<PR>,
      required: true
    }
  },
  setup(props) {
    return {
      repository: computed(() => props.pr.repository),
      approvers: computed(() => props.pr.approvers())
    }
  }
})
</script>

<style lang="scss">
.card {
  .card-header {
    padding: 15px;
    .media {
      align-items: center;
      .image {
        margin: 0;
      }
    }
  }
  .card-content {
    .title {
      margin: 0;
    }
    .approvers {
      color: green;
      display: inline;
      vertical-align: middle;
      margin-bottom: 10px;
      .user-icon {
        vertical-align: middle;
        border-radius: 50%;
      }
    }
    .tags {
      padding-top: 15px;
      margin: 0;
      .tag {
        padding: 5px;
      }
    }
  }
}
</style>
