<template>
  <div class="columns g-full-height">
    <div class="column is-3 g-full-height">
      <CardGroup title="Requested" badgeNumber="1" />
    </div>
    <div class="column is-3 g-full-height">
      <CardGroup title="Reviewed" badgeNumber="1" />
    </div>
    <div class="column is-3 g-full-height">
      <CardGroup title="Muted" badgeNumber="1" />
    </div>
    <div class="column is-3 g-full-height">
      <CardGroup title="Own" badgeNumber="1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dispatch } from "../lib/dispatcher";
import CardGroup from "./CardGroup.vue";

export default defineComponent({
  components: {
    CardGroup,
  },
  async setup() {
    const store = await dispatch();
    return {
      currentUser: store.currentUser,
      ownPullRequests: store.ownPullRequests.value,
      assignedPullRequests: store.assignedPullRequests.value,
    };
  },
});
</script>
