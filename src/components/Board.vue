<template>
  <div class="board g-full-height">
    <header class="header">
      <h1 class="repository">
        <a href="https://github.com/Sa2Knight" target="_blank">Sa2Knight</a>
        /
        <a href="https://github.com/Sa2Knight/PullKan" target="_blank">
          PullKan
        </a>
      </h1>
      <span class="icon" :class="{ loading: state.onLoading }" @click="update">
        <i class="fas fa-sync"></i>
      </span>
      <span class="icon" @click="showConfigModal">
        <i class="fas fa-cog"></i>
      </span>
    </header>
    <div class="content">
      <div class="columns g-full-height">
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="Requested"
            :pullRequests="state.pullRequests.requested"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="In review"
            :pullRequests="state.pullRequests.inReview"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup
            title="Approved"
            :pullRequests="state.pullRequests.approved"
          />
        </div>
        <div class="column is-3 g-full-height">
          <PRCardGroup title="Own" :pullRequests="state.pullRequests.own" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from "vue";
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
      onLoading: false,
      currentUser: null as User | null,
      pullRequests: {
        own: [] as PR[],
        requested: [] as PR[],
        inReview: [] as PR[],
        approved: [] as PR[],
      },
    });

    function update() {
      if (state.onLoading) return;
      state.onLoading = true;

      dispatch()
        .then((store) => {
          state.currentUser = store.currentUser;
          state.pullRequests = store.pullRequests;
        })
        .finally(() => {
          state.onLoading = false;
        });
    }

    function showConfigModal() {
      alert("未実装");
    }

    onMounted(() => {
      update();
      setInterval(() => update(), 5 * 60 * 1000);
    });

    return {
      state,
      update,
      showConfigModal,
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

    &.loading {
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
