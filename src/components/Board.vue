<template>
  <div class="columns g-full-height">
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Requested"
        :pullRequests="requestedPRs"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="In review"
        :pullRequests="inReviewPRs"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Approved"
        :pullRequests="approvedPRs"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Own"
        :pullRequests="ownPRs"
        :currentUser="currentUser"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dispatch } from "../lib/dispatcher";
import PRCardGroup from "./PRCardGroup.vue";

export default defineComponent({
  components: {
    PRCardGroup,
  },
  async setup() {
    const store = await dispatch();
    return {
      currentUser: store.currentUser,
      ownPRs: store.ownPRs.value,
      requestedPRs: store.requestedPRs.value,
      inReviewPRs: store.inReviewPRs.value,
      approvedPRs: store.approvedPRs.value
    };
  },
});
</script>
