<template>
  <div class="card-group g-full-height">
    <div class="title is-5">
      <div class="tag is-danger is-light is-rounded">
        {{ pullRequests.length }}
      </div>
      {{ title }}
    </div>
    <div class="pr-card-wrapper" :key="pr.id" v-for="pr in pullRequests">
      <PRCard :pr="pr" :currentUser="currentUser" />
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
  }
});
</script>

<style lang="scss" scoped>
@import "../../node_modules/bulma/bulma.sass";

.card-group {
  background-color: $light;
  border-radius: 2%;
  min-height: "100%";
  overflow: scroll;

  .title {
    padding: 10px;
    margin: 0;
  }

  .pr-card-wrapper {
    padding: 15px;
  }
}
</style>
