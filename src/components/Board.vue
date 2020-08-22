<template>
  <div class="board g-full-height">
    <header class="header">
      <h1 class="repository">
        <a href="https://github.com/Sa2Knight" target="_blank">Sa2Knight</a>
        /
        <a href="https://github.com/Sa2Knight/PullKan" target="_blank"
          >PullKan</a
        >
      </h1>
      <span class="icon update-icon">
        <i class="fas fa-sync"></i>
      </span>
      <span class="icon config-icon">
        <i class="fas fa-cog"></i>
      </span>
    </header>
    <div class="content">
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

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin: 15px;
  height: 50px;
  .repository {
    font-size: 1.75em;
  }
  .icon {
    margin-left: 5px;
    cursor: pointer;

    &.load {
      animation: spin 1s linear infinite;
    }
  }
}
.content {
  height: calc(100% - 80px);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
