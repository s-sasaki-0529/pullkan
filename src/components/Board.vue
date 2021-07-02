<template>
  <div class="board">
    <div class="content">
      <div class="columns g-full-height">
        <div class="column is-3 g-full-height">
          <PRCardGroup title="Requested" :pullRequests="store.state.pullRequests.requested" />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup title="In review" :pullRequests="store.state.pullRequests.inReview" />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup title="Approved" :pullRequests="store.state.pullRequests.approved" />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup title="Own" :pullRequests="store.state.pullRequests.own" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue'
import { useStore } from '@/composition/store'
import PRCardGroup from '@/components/PRCardGroup.vue'
import { PR } from '@/models/pr'
import { useSetting } from '@/composition/setting'

export default defineComponent({
  components: {
    PRCardGroup
  },
  setup() {
    const store = useStore()
    const setting = useSetting()

    onMounted(() => {
      setInterval(() => store.reload(setting.state), 5 * 60 * 1000)
    })

    watch(
      () => store.state.pullRequests.requested,
      (newPRs, oldPRs) => {
        const firstNewPR = PR.getNewRequestedPR(oldPRs, newPRs)
        if (firstNewPR) {
          new Notification('レビュー依頼が届きました', {
            body: firstNewPR.title,
            icon: firstNewPR.author.avatarUrl
          })
        }
      }
    )

    return { store }
  }
})
</script>

<style lang="scss" scoped>
.board {
  // NOTE: 55pxはヘッダーだろうけどマジックナンバーよくない
  height: calc(100% - 55px);
  .content {
    height: 100%;
  }
}
</style>
