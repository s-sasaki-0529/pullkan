<template>
  <div class="board g-full-height">
    <div class="content">
      <div class="columns g-full-height">
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="Requested"
            :pullRequests="store.state.pullRequests.requested"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="In review"
            :pullRequests="store.state.pullRequests.inReview"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="Approved"
            :pullRequests="store.state.pullRequests.approved"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="Own"
            :pullRequests="store.state.pullRequests.own"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { useStore } from "@/composition/store";
import PRCardGroup from "@/components/PRCardGroup.vue";

export default defineComponent({
  components: {
    PRCardGroup,
  },
  setup() {
    const store = useStore();

    function update() {
      store.update();
    }

    function showConfigModal() {
      alert("未実装");
    }

    onMounted(() => {
      update();
      setInterval(() => update(), 5 * 60 * 1000);
    });

    watch(
      () => store.state.pullRequests.requested,
      (newPRs, oldPRs) => {
        const oldPrIds = oldPRs.map((pr) => pr.id);
        newPRs.forEach((newPR) => {
          if (oldPrIds.indexOf(newPR.id) === -1) {
            // TODO: 通知の仕組みは切り出すか
            new Notification("レビュー依頼が届きました", {
              body: newPR.title,
              icon: newPR.author.avatarUrl,
            });
          }
        });
      }
    );

    return {
      store,
      update,
      showConfigModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 80px);
}
</style>
