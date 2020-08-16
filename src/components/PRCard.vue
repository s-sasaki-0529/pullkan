<template>
  <div class="card">
    <header class="card-header">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="is-rounded" :src="avatarUrl" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6">{{ pr.author.name }}</p>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <p class="title is-5">{{ title }}</p>
        <p>approved: {{ approvedCount }}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a :href="url" target="_blank" class="card-footer-item">Open</a>
      <a href="#" class="card-footer-item">Mute</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PR } from "../lib/pr";
import { User } from "../lib/user";

type Props = {
  pr: PR;
  currentUser: User; // TODO グローバルにする
};

export default defineComponent({
  props: {
    pr: {
      type: PR,
      required: true,
    },
    currentUser: {
      type: User,
      required: true,
    },
  },
  setup(props) {
    return {
      url: props.pr.url,
      title: props.pr.title,
      avatarUrl: props.pr.author.avatarUrl,
      approvedCount: props.pr.calcApprovedCount(),
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
    }
  }
  .card-content {
    .title {
      height: 65px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>
