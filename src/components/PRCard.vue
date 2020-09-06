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
          <span class="title is-6">{{ pr.author.name }}</span>
        </div>
      </div>
    </header>
    <div class="card-content">
      <a :href="pr.url" target="_blanl" class="content">
        <div class="title is-6">
          <span>{{ pr.title }}</span>
          <div class="checks">
            <span class="check" :key="i" v-for="i in approvedCount">✔</span>
          </div>
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
import { defineComponent, computed, PropType } from "vue";
import { PR } from "../models/pr";

export default defineComponent({
  props: {
    pr: {
      type: Object as PropType<PR>,
      required: true,
    }
  },
  setup(props) {
    return {
      approvedCount: computed(() => props.pr.calcApprovedCount()),
    };
  },
});
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
      overflow: scroll;
    }
    .checks {
      display: inline;
      padding-left: 10px;
      .check {
        color: green;
      }
    }
    .tags {
      padding-top: 15px;
    }
  }
}
</style>
