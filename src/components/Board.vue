<template>
  <div class="columns g-full-height">
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Requested"
        :pullRequests="ownPullRequests"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Reviewed"
        :pullRequests="ownPullRequests"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Approved"
        :pullRequests="ownPullRequests"
        :currentUser="currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Own"
        :pullRequests="ownPullRequests"
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
      ownPullRequests: store.ownPullRequests.value,
      assignedPullRequests: store.assignedPullRequests.value,
    };
  },
});
</script>
