<template>
  <div class="card-group g-full-height">
    <div class="title is-5">
      <div class="tag is-danger is-light is-rounded">
        {{ props.badgeNumber }}
      </div>
      {{ props.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  badgeNumber: Number;
  title: String;
};

export default defineComponent({
  props: {
    badgeNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  setup(props: Props) {
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
}
</style>
