<template>
  <header class="header">
    <h1 class="repository">
      <a href="https://github.com/Sa2Knight" target="_blank">Sa2Knight</a>
      /
      <a href="https://github.com/Sa2Knight/PullKan" target="_blank">
        PullKan
      </a>
    </h1>
    <span class="icon" :class="{ loading: true}" @click="update">
      <i class="fas fa-sync"></i>
    </span>
    <span class="icon" @click="showConfigModal">
      <i class="fas fa-cog"></i>
    </span>
  </header>
</template>

<script lang="ts">
export default {

}
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
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>