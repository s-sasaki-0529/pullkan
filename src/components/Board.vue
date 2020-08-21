<template>
  <button @click="update">Update</button>
  <div class="columns g-full-height">
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Requested"
        :pullRequests="state.pullRequests.requested"
        :currentUser="state.currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="In review"
        :pullRequests="state.pullRequests.inReview"
        :currentUser="state.currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Approved"
        :pullRequests="state.pullRequests.approved"
        :currentUser="state.currentUser"
      />
    </div>
    <div class="column is-3 g-full-height">
      <PRCardGroup
        title="Own"
        :pullRequests="state.pullRequests.own"
        :currentUser="state.currentUser"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { dispatch } from "../lib/dispatcher";
import PRCardGroup from "./PRCardGroup.vue";
import { User } from "@/lib/user";
import { PR } from "@/lib/pr";

export default defineComponent({
  components: {
    PRCardGroup,
  },
  setup() {
    const state = reactive({
      now: 0,
      currentUser: null as User | null,
      pullRequests: {
        own: [] as PR[],
        requested: [] as PR[],
        inReview: [] as PR[],
        approved: [] as PR[],
      },
    });

    const update = () => {
      dispatch().then((store) => {
        state.now = state.now + 10;
        state.currentUser = store.currentUser;
        state.pullRequests = store.pullRequests;
      });
    };

    update();

    return {
      state,
      update,
    };
  },
});
</script>
