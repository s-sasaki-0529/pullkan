<template>
  <div class="app">
    <Header />
    <Board />
  </div>
</template>

<script lang="ts">
import Header from "./Header.vue";
import Board from "./Board.vue";

export default {
  name: "App",
  components: {
    Header,
    Board
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
