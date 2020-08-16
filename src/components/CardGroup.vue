<template>
  <div class="card-group g-full-height">
    <div class="title is-5">
      <div class="tag is-danger is-light is-rounded">
        {{ props.badgeNumber }}
      </div>
      {{ props.title }}
    </div>
    <div class="pr-card-wrapper" :key="pr.id" v-for="pr in props.pullRequests">
      <PRCard :pr="pr" :currentUser="props.currentUser" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PR } from "../lib/pr";
import { User } from "../lib/user";
import PRCard from "./PRCard.vue";

export default defineComponent({
  props: {
    badgeNumber: Number,
    title: String,
    pullRequests: {
      type: Array as PropType<PR[]>,
    },
    currentUser: {
      type: Object as PropType<User>,
    },
  },
  components: {
    PRCard,
  },
  setup(props) {
    return { props };
  },
});
</script>

<style lang="scss" scoped>
@import "../../node_modules/bulma/bulma.sass";

.card-group {
  background-color: $light;
  border-radius: 2%;
  min-height: "100%";

  .title {
    padding: 10px;
  }

  .pr-card-wrapper {
    padding: 15px;
  }
}
</style>
