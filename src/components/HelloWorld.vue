<template>
  <div class="columns">
    <div class="column is-3" :key="pr.id" v-for="pr in assignedPullRequests">
      <PRCard :pr="pr" :currentUser="currentUser" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dispatch } from "../lib/dispatcher";
import PRCard from "./PRCard.vue";

export default defineComponent({
  components: {
    PRCard,
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
