<template>
  <div class="card-group g-full-height">
    <div class="card-group-header title is-5">
      <div class="tag is-danger is-light is-rounded">
        {{ pullRequests.length }}
      </div>
      {{ title }}
    </div>
    <div class="card-group-body">
      <div :key="pr.id" v-for="pr in pullRequests">
        <div v-if="isShowablePR(pr)" class="pr-card-wrapper">
          <PRCard :pr="pr" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PR } from '../models/pr'
import PRCard from './PRCard.vue'

export default defineComponent({
  props: {
    title: String,
    showWIP: Boolean,
    showDraft: Boolean,
    pullRequests: {
      type: Array as PropType<PR[]>,
      required: true
    }
  },
  components: {
    PRCard
  },
  methods: {
    isShowablePR(pr: PR): boolean {
      if (this.showDraft && pr.isDraft) return true
      if (this.showWIP && pr.isWIP) return true
      return pr.isReady()
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../node_modules/bulma/bulma.sass';

.card-group {
  background-color: $light;
  border-radius: 2%;
  min-height: '100%';

  .card-group-header {
    &.title {
      padding: 10px;
      margin: 0;
    }
  }

  .card-group-body {
    height: calc(100% - 45px);
    overflow: auto;

    .pr-card-wrapper {
      padding: 15px;
    }
  }
}
</style>
