<template>
  <div class="app">
    <Header />
    <Board />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import Board from "./Board.vue";

export default defineComponent({
  components: {
    Header,
    Board,
  },

  setup() {},
});
</script>

<style lang="scss">
@import "../../node_modules/bulma/bulma.sass";

.app {
  height: 100vh;
  .g-full-height {
    height: 100%;
  }
}
</style>
