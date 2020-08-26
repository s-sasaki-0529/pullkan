<template>
  <div class="app">
    <Board />
  </div>
</template>

<script lang="ts">
import Board from "./Board.vue";

export default {
  name: "App",
  components: {
    Board,
  },
};
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
